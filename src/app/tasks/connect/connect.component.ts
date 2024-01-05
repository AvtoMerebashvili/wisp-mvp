import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import { QuizService } from '../../quiz/services/quiz.service';
import { TOptionResult } from '../../common/interfaces/option-result.type';
import {
  IGif,
  IWord,
  IWordGifsIdsMatch,
} from '../../common/interfaces/test.interface';

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.scss',
})
export class ConnectComponent {
  gifs = this.quizService.getFourGif();
  words = this.quizService.getFourWord();

  wordSelectedIdx: number | null = null;
  cardSelectedIdx: number | null = null;

  wordState: TOptionResult[] = [];
  cardState: TOptionResult[] = [];

  disabledWords: boolean[] = [];
  disabledGifs: boolean[] = [];

  connecteds: IWordGifsIdsMatch[] = [];

  constructor(private quizService: QuizService) {}

  public onCardSelect(idx: number) {
    if (this.cardSelectedIdx != null) {
      this.cardState[this.cardSelectedIdx] = '';
    }
    this.cardSelectedIdx = idx;
    this.cardState[idx] = 'pending';
    const chosenGif = this.gifs[idx];
    if (this.wordSelectedIdx != null) {
      const chosenWord = this.words[this.wordSelectedIdx];
      this.generateNewConnection(chosenWord, chosenGif);
      this.handleAnswer(chosenWord, chosenGif);
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
      this.generateNewConnection(chosenWord, chosenGif);
      this.handleAnswer(chosenWord, chosenGif);
    }
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
}
