import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import { QuizService } from '../../quiz/services/quiz.service';
import { TOptionResult } from '../../common/interfaces/option-result.type';

@Component({
  selector: 'app-choose-gesture',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './choose-gesture.component.html',
  styleUrl: './choose-gesture.component.scss',
})
export class ChooseGestureComponent {
  word = this.quizService.getRandomWord();
  gifs = this.quizService.getFourGif();
  state!: TOptionResult;
  answeredsIdx!: number;

  constructor(private quizService: QuizService) {}

  onSelect(value: string, idx: number) {
    this.answeredsIdx = idx;
    const foundGif = this.quizService.getGifByValue(value);
    if (foundGif) {
      const isRight = this.quizService.isRight(this.word, foundGif);
      isRight ? (this.state = 'correct') : (this.state = 'incorrect');
      return;
    }
    this.state = 'incorrect';
  }
}
