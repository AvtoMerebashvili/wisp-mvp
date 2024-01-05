import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import { QuizService } from '../../quiz/services/quiz.service';

@Component({
  selector: 'app-repeat',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './repeat.component.html',
  styleUrl: './repeat.component.scss',
})
export class RepeatComponent {
  gifs = this.quizService.getFourGif();

  constructor(private quizService: QuizService) {}
}
