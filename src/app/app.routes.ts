import { Routes } from '@angular/router';
import { Task } from './common/enum/task.enum';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '1',
    pathMatch: 'full',
  },
  {
    path: Task.Recognize,
    loadComponent: () =>
      import('./tasks/recognize/recognize.component').then(
        (c) => c.RecognizeComponent
      ),
  },
  {
    path: Task.EnterAnswer,
    loadComponent: () =>
      import('./tasks/enter-answer/enter-answer.component').then(
        (c) => c.EnterAnswerComponent
      ),
  },
  {
    path: Task.ChooseWord,
    loadComponent: () =>
      import('./tasks/choose-word/choose-word.component').then(
        (c) => c.ChooseWordComponent
      ),
  },
  {
    path: Task.ChooseGesture,
    loadComponent: () =>
      import('./tasks/choose-gesture/choose-gesture.component').then(
        (c) => c.ChooseGestureComponent
      ),
  },
  {
    path: Task.Repeat,
    loadComponent: () =>
      import('./tasks/repeat/repeat.component').then((c) => c.RepeatComponent),
  },
];
