import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, take, tap } from 'rxjs';
import { TOptionResult } from '../../common/interfaces/option-result.type';
import { IGif } from '../../common/interfaces/test.interface';
import { SharedModule } from '../../common/shared.module';
import { QuizService } from '../../quiz/services/quiz.service';
import { IEnterAnswerStore } from '../interfaces/task-store.interface';

@Component({
  selector: 'app-enter-answer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './enter-answer.component.html',
  styleUrl: './enter-answer.component.scss',
})
export class EnterAnswerComponent implements OnInit {
  taskId = +this.route.snapshot.params['id'];
  formControl = new FormControl('');
  state!: TOptionResult;
  question!: IGif;

  constructor(
    // private _snackBar: MatSnackBar,
    private quizService: QuizService<IEnterAnswerStore>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listenFormControl();
    this.initialize();
  }

  initialize() {
    const alreadyStored = this.quizService.existsInStore(this.taskId);
    if (alreadyStored) {
      const storeData = this.quizService.getFromStore(this.taskId);
      this.formControl.setValue(storeData.value, {
        emitEvent: false,
      });
      this.formControl.disable({ emitEvent: false });
      this.state = storeData.state;
      this.question = storeData.question;
    } else {
      this.question = this.quizService.getRandomGif();
    }
  }

  listenFormControl = () =>
    this.formControl.valueChanges
      .pipe(
        debounceTime(2000),
        take(1),
        tap(() => this.onDone())
      )
      .subscribe();

  onDone() {
    this.formControl.disable();
    const foundWord = this.quizService.getWordByValue(
      this.formControl.value as string
    );
    if (foundWord) {
      const isRight = this.quizService.isRight(foundWord, this.question);
      if (isRight) this.state = 'correct';
    } else {
      this.state = 'incorrect';
      this.quizService.decrementLives();
    }

    const dataToStore: IEnterAnswerStore = {
      value: this.formControl.value as string,
      state: this.state,
      question: this.question,
    };
    this.quizService.setInStore(this.taskId, dataToStore);
  }
}
