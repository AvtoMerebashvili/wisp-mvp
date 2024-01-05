import { Injectable } from '@angular/core';
import {
  IGenerateQuiz,
  ITask,
} from '../common/interface/generate-quiz.interface';
import { ReplaySubject } from 'rxjs';

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
