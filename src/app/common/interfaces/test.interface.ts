export interface IBasetest {
  id: number;
  value: string;
}

export interface IWord extends IBasetest {}
export interface IGif extends IBasetest {}

export interface IWordGifs {
  wordId: number;
  gifId: number;
}

export interface IWordGifsValuesMatch {
  word: string;
  gif: string;
}

export interface IWordGifsIdsMatch {
  word: number;
  gif: number;
}
