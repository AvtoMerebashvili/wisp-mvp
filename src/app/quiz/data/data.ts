import {
  IQuestionAnswers,
  iAnswer,
  iQuestion,
} from '../../common/interfaces/test.interface';

export const questions: iQuestion[] = [
  {
    id: 1,
    value: 'ზღარბი',
  },
  {
    id: 2,
    value: 'ავოკადო',
  },
  {
    id: 3,
    value: 'დედამიწა',
  },
  {
    id: 4,
    value: 'ზღაპარი',
  },
];

export const answers: iAnswer[] = [
  {
    id: 1,
    value: 'assets/avocado.gif',
  },
  {
    id: 2,
    value: 'assets/fairy tail.gif',
  },
  {
    id: 3,
    value: 'assets/hedgehog.gif',
  },
  {
    id: 4,
    value: 'assets/motherland.gif',
  },
];

export const questionAnswers: IQuestionAnswers[] = [
  {
    questionId: 1,
    answerId: 3,
  },
  {
    questionId: 2,
    answerId: 1,
  },
  {
    questionId: 3,
    answerId: 4,
  },
  {
    questionId: 4,
    answerId: 2,
  },
];
