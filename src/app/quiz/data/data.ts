import { IGif, IWord, IWordGifs } from '../../common/interfaces/test.interface';

export const words: IWord[] = [
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

export const gifs: IGif[] = [
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

export const wordGifs: IWordGifs[] = [
  {
    wordId: 1,
    gifId: 3,
  },
  {
    wordId: 2,
    gifId: 1,
  },
  {
    wordId: 3,
    gifId: 4,
  },
  {
    wordId: 4,
    gifId: 2,
  },
];
