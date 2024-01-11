import { Routes } from '@angular/router';
import { Task } from './common/enum/task.enum';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '1',
    pathMatch: 'full',
  },
  {
    path: `${Task.Recognize}/:id`,
    loadComponent: () =>
      import('./tasks/recognize/recognize.component').then(
        (c) => c.RecognizeComponent
      ),
  },
  {
    path: `${Task.EnterAnswer}/:id`,
    loadComponent: () =>
      import('./tasks/enter-answer/enter-answer.component').then(
        (c) => c.EnterAnswerComponent
      ),
  },
  {
    path: `${Task.ChooseWord}/:id`,
    loadComponent: () =>
      import('./tasks/choose-word/choose-word.component').then(
        (c) => c.ChooseWordComponent
      ),
  },
  {
    path: `${Task.ChooseGesture}/:id`,
    loadComponent: () =>
      import('./tasks/choose-gesture/choose-gesture.component').then(
        (c) => c.ChooseGestureComponent
      ),
  },
  {
    path: `${Task.Repeat}/:id`,
    loadComponent: () =>
      import('./tasks/repeat/repeat.component').then((c) => c.RepeatComponent),
  },
  {
    path: `${Task.Connect}/:id`,
    loadComponent: () =>
      import('./tasks/connect/connect.component').then(
        (c) => c.ConnectComponent
      ),
  },
];
