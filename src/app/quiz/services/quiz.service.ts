import { Injectable } from '@angular/core';
import {
  IGenerateQuiz,
  ITask,
} from '../common/interface/generate-quiz.interface';
import { ReplaySubject } from 'rxjs';
import { gifs, wordGifs, words } from '../data/data';
import { IGif, IWord } from '../../common/interfaces/test.interface';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  tasks$ = new ReplaySubject<ITask[]>();

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

  public getRandomGif = () => gifs[Math.floor(Math.random() * 4)];
  public getRandomWord = () => words[Math.floor(Math.random() * 4)];
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

  private rearangeQuiz(tasks: ITask[]): ITask[] {
    const tasksClone = [...tasks];
    for (let currIdx = 0; currIdx < tasks.length; currIdx++) {
      const nextIdx = currIdx + 1;
      const currentTask = tasks[currIdx];
      const nextTask = tasks[nextIdx];
      if (currentTask.route == nextTask?.route) {
        const differentIdx = tasksClone.findIndex(
          (task, i) => task.route != nextTask.route && i > nextIdx
        );
        if (differentIdx) {
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
