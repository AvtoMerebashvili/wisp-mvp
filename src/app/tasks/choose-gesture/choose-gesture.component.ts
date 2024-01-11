import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import { QuizService } from '../../quiz/services/quiz.service';
import { TOptionResult } from '../../common/interfaces/option-result.type';
import { ActivatedRoute } from '@angular/router';
import {
  IChooseGestureStore,
  IChooseWordStore,
} from '../interfaces/task-store.interface';
import { IGif, IWord } from '../../common/interfaces/test.interface';

@Component({
  selector: 'app-choose-gesture',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './choose-gesture.component.html',
  styleUrl: './choose-gesture.component.scss',
})
export class ChooseGestureComponent {
  public taskId = this.route.snapshot.params['id'];

  word!: IWord;
  gifs!: IGif[];
  state!: TOptionResult;
  answeredsIdx!: number;

  constructor(
    private quizService: QuizService<IChooseGestureStore>,
    private route: ActivatedRoute
  ) {
    this.initialize();
  }

  onSelect(value: string, idx: number) {
    this.answeredsIdx = idx;
    const foundGif = this.quizService.getGifByValue(value);
    if (foundGif) {
      const isRight = this.quizService.isRight(this.word, foundGif);
      if (isRight) {
        this.state = 'correct';
      } else {
        this.state = 'incorrect';
        this.quizService.decrementLives();
      }
    } else this.state = 'incorrect';

    const dataToStore: IChooseGestureStore = {
      state: this.state,
      answeredsIdx: this.answeredsIdx,
      word: this.word,
      gifs: this.gifs,
    };

    this.quizService.setInStore(this.taskId, dataToStore);
  }

  private initialize() {
    const alreadyStored = this.quizService.existsInStore(this.taskId);
    if (alreadyStored) {
      const storedData = this.quizService.getFromStore(this.taskId);
      this.word = storedData.word;
      this.gifs = storedData.gifs;
      this.state = storedData.state;
      this.answeredsIdx = storedData.answeredsIdx;
    } else {
      this.word = this.quizService.getRandomWord();
      this.gifs = this.quizService.getFourGif();
    }
  }
}
