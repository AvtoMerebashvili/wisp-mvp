import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IWordGifsValuesMatch } from '../../common/interfaces/test.interface';
import { SharedModule } from '../../common/shared.module';
import { gifs, wordGifs, words } from '../../quiz/data/data';
import { QuizService } from '../../quiz/services/quiz.service';
import { TRecoginzeStore } from '../interfaces/task-store.interface';

@Component({
  selector: 'app-recognize',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './recognize.component.html',
  styleUrl: './recognize.component.scss',
})
export class RecognizeComponent implements OnInit {
  public taskId = +this.route.snapshot.params['id'];
  public data$ = new BehaviorSubject<IWordGifsValuesMatch[]>([]);

  constructor(
    private quizService: QuizService<TRecoginzeStore>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createTest();
  }

  private createTest() {
    const alreadyStored = this.quizService.existsInStore(this.taskId);
    let data: IWordGifsValuesMatch[];

    if (alreadyStored) {
      data = this.quizService.getFromStore(this.taskId);
    } else {
      data = wordGifs.map((wg) => {
        return {
          gif: gifs.find((g) => g.id == wg.gifId)!.value,
          word: words.find((w) => w.id == wg.wordId)!.value,
        };
      });
      this.quizService.setInStore(this.taskId, data);
    }
    this.data$.next(data);
  }
}
