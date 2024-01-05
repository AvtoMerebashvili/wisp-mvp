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

    this.tasks$.next(tasks);
  }
}
