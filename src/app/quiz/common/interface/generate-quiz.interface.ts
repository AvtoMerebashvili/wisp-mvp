import { Task } from '../../../common/enum/task.enum';

export interface IGenerateQuiz {
  count: number;
  route: Task;
}

export interface ITask {
  id: number;
  route: Task;
}
