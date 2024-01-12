import { Injectable } from '@angular/core';
import {
  IGenerateQuiz,
  ITask,
} from '../common/interface/generate-quiz.interface';
import { BehaviorSubject, ReplaySubject, map, take, tap } from 'rxjs';
import { gifs, wordGifs, words } from '../data/data';
import { IGif, IWord } from '../../common/interfaces/test.interface';
import { floorRandom } from '../../common/functions/floor-random.function';

@Injectable({
  providedIn: 'root',
})
export class QuizService<T> {
  public tasks$ = new ReplaySubject<ITask[]>();
  public lives$ = new BehaviorSubject<number>(5);
  public taskStore = new Map<number, T>();

  constructor() {}

  public generateQuiz(config: IGenerateQuiz[]) {
    const tasks = config
      .flatMap((c) => new Array(c.count).fill(c.route))
      .map((r, i) => {
        return { id: i, route: r };
      });

    const rearangedTasks = this.rearangeQuiz(tasks);

    this.tasks$.next(rearangedTasks);
  }

  public retry(config: IGenerateQuiz[]) {
    this.clearStore();
    this.generateQuiz(config);
    this.lives$.next(5);
  }

  public getRandomGif = () => gifs[floorRandom(4)];
  public getRandomWord = () => words[floorRandom(4)];
  public getFourGif = () => gifs;
  public getFourWord = () => words;
  public isRight(word: IWord, gif: IGif) {
    const foundWord = wordGifs.find((wg) => wg.wordId == word.id);

    if (foundWord) {
      return foundWord.gifId == gif.id ? true : false;
    }
    return false;
  }

  public getWordByValue = (word: string) => words.find((w) => w.value === word);
  public getGifByValue = (path: string) => gifs.find((w) => w.value === path);

  public setInStore = (taskId: number, v: any) => this.taskStore.set(taskId, v);
  public getFromStore = (taskId: number): T => this.taskStore.get(taskId) as T;
  public existsInStore = (taskId: number) => this.taskStore.has(taskId);
  public clearStore = () => this.taskStore.clear();

  public decrementLives = () =>
    this.lives$
      .pipe(
        take(1),
        tap((v) => this.lives$.next(--v))
      )
      .subscribe();

  private rearangeQuiz(tasks: ITask[]): ITask[] {
    const tasksClone = [...tasks];
    for (let currIdx = 0; currIdx < tasksClone.length; currIdx++) {
      const nextIdx = currIdx + 1;
      const currentTask = tasksClone[currIdx];
      const nextTask = tasksClone[nextIdx];
      if (currentTask.route == nextTask?.route) {
        const differentIdx = tasksClone.findIndex(
          (task, i) => task.route != nextTask.route && i > nextIdx
        );
        if (differentIdx > 0) {
          [tasksClone[nextIdx], tasksClone[differentIdx]] = [
            tasksClone[differentIdx],
            tasksClone[nextIdx],
          ];
          return this.rearangeQuiz(tasksClone);
        }
      }
    }

    return tasksClone;
  }
}
