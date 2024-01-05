import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import { QuizService } from '../../quiz/services/quiz.service';
import { IGif } from '../../common/interfaces/test.interface';
import { gifs } from '../../quiz/data/data';
import { TOptionResult } from '../../common/interfaces/option-result.type';

@Component({
  selector: 'app-choos-answer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './choose-word.component.html',
  styleUrl: './choose-word.component.scss',
})
export class ChooseWordComponent {
  question: IGif = this.quizService.getRandomGif();
  answers = this.quizService.getFourWord();
  state!: TOptionResult;
  answeredsIdx!: number;

  constructor(private quizService: QuizService) {}

  public onSelect(value: string, idx: number) {
    this.answeredsIdx = idx;
    const foundWord = this.quizService.getWordByValue(value);
    if (foundWord) {
      const isRight = this.quizService.isRight(foundWord, this.question);
      isRight ? (this.state = 'correct') : (this.state = 'incorrect');
      return;
    }
    this.state = 'incorrect';
  }
}
