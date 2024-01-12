import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TOptionResult } from '../../common/interfaces/option-result.type';
import { IGif, IWord } from '../../common/interfaces/test.interface';
import { SharedModule } from '../../common/shared.module';
import { QuizService } from '../../quiz/services/quiz.service';
import { IChooseWordStore } from '../interfaces/task-store.interface';

@Component({
  selector: 'app-choos-answer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './choose-word.component.html',
  styleUrl: './choose-word.component.scss',
})
export class ChooseWordComponent {
  public taskId = +this.route.snapshot.params['id'];

  question!: IGif;
  answers!: IWord[];
  state!: TOptionResult;
  answeredsIdx!: number;

  constructor(
    private quizService: QuizService<IChooseWordStore>,
    private route: ActivatedRoute
  ) {
    this.initialize();
  }

  public onSelect(value: string, idx: number) {
    this.answeredsIdx = idx;
    const foundWord = this.quizService.getWordByValue(value);
    if (foundWord) {
      const isRight = this.quizService.isRight(foundWord, this.question);
      if (isRight) {
        this.state = 'correct';
      } else {
        this.state = 'incorrect';
        this.quizService.decrementLives();
      }
    } else this.state = 'incorrect';

    const dataToStore: IChooseWordStore = {
      question: this.question,
      answers: this.answers,
      state: this.state,
      answeredsIdx: this.answeredsIdx,
    };

    this.quizService.setInStore(this.taskId, dataToStore);
  }

  private initialize() {
    const alreadyStored = this.quizService.existsInStore(this.taskId);
    if (alreadyStored) {
      const storedData = this.quizService.getFromStore(this.taskId);
      this.question = storedData.question;
      this.answers = storedData.answers;
      this.state = storedData.state;
      this.answeredsIdx = storedData.answeredsIdx;
    } else {
      this.question = this.quizService.getRandomGif();
      this.answers = this.quizService.getFourWord();
    }
  }
}
