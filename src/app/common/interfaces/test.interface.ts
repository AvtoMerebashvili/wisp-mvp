export interface IBasetest {
  id: number;
  value: string;
}

export interface iQuestion extends IBasetest {}
export interface iAnswer extends IBasetest {}

export interface IQuestionAnswers {
  questionId: number;
  answerId: number;
}
