import { Component, inject } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../common/components/snackbar/snackbar.component';
import { QuizService } from '../../quiz/services/quiz.service';
import { TOptionResult } from '../../common/interfaces/option-result.type';
import { gifs, wordGifs, words } from '../../quiz/data/data';
import { IGif } from '../../common/interfaces/test.interface';

@Component({
  selector: 'app-enter-answer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './enter-answer.component.html',
  styleUrl: './enter-answer.component.scss',
})
export class EnterAnswerComponent {
  value!: string;
  state!: TOptionResult;
  question: IGif = this.quizService.getRandomGif();

  constructor(
    // private _snackBar: MatSnackBar,
    private quizService: QuizService
  ) {}

  onDone() {
    const foundWord = this.quizService.getWordByValue(this.value);
    if (foundWord) {
      const isRight = this.quizService.isRight(foundWord, this.question);
      isRight ? (this.state = 'correct') : (this.state = 'incorrect');
      return;
    }
    this.state = 'incorrect';
  }
}
