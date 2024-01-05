import { Task } from '../../common/enum/task.enum';
import { IQuizConfig } from '../../common/interfaces/quiz.interface';
import { IGenerateQuiz } from '../common/interface/generate-quiz.interface';

export const quizContent: IGenerateQuiz[] = [
  {
    count: 1,
    route: Task.Recognize,
  },

  {
    count: 2,
    route: Task.EnterAnswer,
  },
  {
    count: 2,
    route: Task.ChooseWord,
  },
  {
    count: 2,
    route: Task.ChooseGesture,
  },
  {
    count: 2,
    route: Task.Repeat,
  },
];
