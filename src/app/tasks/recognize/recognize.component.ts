import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import { BehaviorSubject } from 'rxjs';
import { gifs, wordGifs, words } from '../../quiz/data/data';
import { QuizService } from '../../quiz/services/quiz.service';
import { IWordGifsValuesMatch } from '../../common/interfaces/test.interface';

@Component({
  selector: 'app-recognize',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './recognize.component.html',
  styleUrl: './recognize.component.scss',
})
export class RecognizeComponent implements OnInit {
  public data$ = new BehaviorSubject<IWordGifsValuesMatch[]>([]);

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.createTest();
  }

  private createTest = () =>
    this.data$.next(
      wordGifs.map((wg) => {
        return {
          gif: gifs.find((g) => g.id == wg.gifId)!.value,
          word: words.find((w) => w.id == wg.wordId)!.value,
        };
      })
    );
}
