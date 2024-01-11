import { TOptionResult } from '../../common/interfaces/option-result.type';
import {
  IGif,
  IWord,
  IWordGifsIdsMatch,
  IWordGifsValuesMatch,
} from '../../common/interfaces/test.interface';

export type TRepeatStore = IGif;

export type TRecoginzeStore = IWordGifsValuesMatch[];

export interface IEnterAnswerStore {
  value: string;
  state: TOptionResult;
  question: IGif;
}

export interface IChooseWordStore {
  question: IGif;
  answers: IWord[];
  state: TOptionResult;
  answeredsIdx: number;
}

export interface IChooseGestureStore {
  word: IWord;
  gifs: IGif[];
  state: TOptionResult;
  answeredsIdx: number;
}

export interface IConncetStore {
  gifs: IGif[];
  words: IWord[];

  wordState: TOptionResult[];
  cardState: TOptionResult[];

  disabledWords: boolean[];
  disabledGifs: boolean[];

  connecteds: IWordGifsIdsMatch[];
}
