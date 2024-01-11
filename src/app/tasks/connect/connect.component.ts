import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import { QuizService } from '../../quiz/services/quiz.service';
import { TOptionResult } from '../../common/interfaces/option-result.type';
import {
  IGif,
  IWord,
  IWordGifsIdsMatch,
} from '../../common/interfaces/test.interface';
import { ActivatedRoute } from '@angular/router';
import { IConncetStore } from '../interfaces/task-store.interface';

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.scss',
})
export class ConnectComponent {
  taskId = this.route.snapshot.params['id'];

  gifs!: IGif[];
  words!: IWord[];

  wordSelectedIdx: number | null = null;
  cardSelectedIdx: number | null = null;

  wordState: TOptionResult[] = [];
  cardState: TOptionResult[] = [];

  disabledWords: boolean[] = [];
  disabledGifs: boolean[] = [];

  connecteds: IWordGifsIdsMatch[] = [];

  constructor(
    private quizService: QuizService<IConncetStore>,
    private route: ActivatedRoute
  ) {
    this.initialize();
  }

  public onCardSelect(idx: number) {
    if (this.cardSelectedIdx != null) {
      this.cardState[this.cardSelectedIdx] = '';
    }
    this.cardSelectedIdx = idx;
    this.cardState[idx] = 'pending';
    const chosenGif = this.gifs[idx];
    if (this.wordSelectedIdx != null) {
      const chosenWord = this.words[this.wordSelectedIdx];
      this.handleNewConnection(chosenWord, chosenGif);
    }
  }

  public onWordSelect(idx: number) {
    if (this.wordSelectedIdx != null) {
      this.wordState[this.wordSelectedIdx] = '';
    }
    this.wordSelectedIdx = idx;
    this.wordState[idx] = 'pending';
    const chosenWord = this.words[idx];
    if (this.cardSelectedIdx != null) {
      const chosenGif = this.gifs[this.cardSelectedIdx];
      this.handleNewConnection(chosenWord, chosenGif);
    }
  }

  private initialize() {
    const alreadyStored = this.quizService.existsInStore(this.taskId);
    if (alreadyStored) {
      const storedData = this.quizService.getFromStore(this.taskId);
      this.gifs = storedData.gifs;
      this.words = storedData.words;
      this.wordState = storedData.wordState;
      this.cardState = storedData.cardState;
      this.disabledGifs = storedData.disabledGifs;
      this.disabledWords = storedData.disabledWords;
    } else {
      this.gifs = this.quizService.getFourGif();
      this.words = this.quizService.getFourWord();
    }
  }

  private handleNewConnection(chosenWord: IWord, chosenGif: IGif) {
    this.generateNewConnection(chosenWord, chosenGif);
    this.handleAnswer(chosenWord, chosenGif);
    this.storeData();
  }

  private generateNewConnection(chosenWord: IWord, chosenGif: IGif) {
    const newConnection = {
      word: chosenWord.id,
      gif: chosenGif.id,
    };

    this.connecteds.push(newConnection);
  }

  private handleAnswer(chosenWord: IWord, chosenGif: IGif) {
    const isRightConnection = this.quizService.isRight(chosenWord, chosenGif);
    if (isRightConnection) {
      this.updateProperties('correct');
    } else {
      this.updateProperties('incorrect');
    }
  }

  private updateProperties(state: 'correct' | 'incorrect') {
    if (this.wordSelectedIdx != null && this.cardSelectedIdx != null) {
      this.wordState[this.wordSelectedIdx] = state;
      this.cardState[this.cardSelectedIdx] = state;
      this.disabledGifs[this.cardSelectedIdx] = true;
      this.disabledWords[this.wordSelectedIdx] = true;
    }
    this.wordSelectedIdx = null;
    this.cardSelectedIdx = null;
  }

  private storeData() {
    const newDataToStore: IConncetStore = {
      gifs: this.gifs,
      words: this.words,
      wordState: this.wordState,
      cardState: this.cardState,
      disabledWords: this.disabledWords,
      disabledGifs: this.disabledGifs,
      connecteds: this.connecteds,
    };
    this.quizService.setInStore(this.taskId, newDataToStore);
  }
}
