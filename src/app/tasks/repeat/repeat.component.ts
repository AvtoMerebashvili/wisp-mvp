import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { IGif } from '../../common/interfaces/test.interface';
import { SharedModule } from '../../common/shared.module';
import { QuizService } from '../../quiz/services/quiz.service';
import { TRepeatStore } from '../interfaces/task-store.interface';

@Component({
  selector: 'app-repeat',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './repeat.component.html',
  styleUrl: './repeat.component.scss',
})
export class RepeatComponent implements OnInit {
  taskId = +this.route.snapshot.params['id'];
  gif!: IGif;

  constructor(
    private quizService: QuizService<TRepeatStore>,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.generateGif();
  }

  private generateGif() {
    const alreadyStored = this.quizService.existsInStore(this.taskId);
    let gif: IGif;
    if (alreadyStored) {
      gif = this.quizService.getFromStore(this.taskId);
    } else {
      gif = this.quizService.getRandomGif();
      this.quizService.setInStore(this.taskId, gif);
    }
    this.gif = gif;
  }
}
