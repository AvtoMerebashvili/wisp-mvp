import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../common/components/snackbar/snackbar.component';
import { QuizService } from '../../quiz/services/quiz.service';
import { TOptionResult } from '../../common/interfaces/option-result.type';
import { gifs, wordGifs, words } from '../../quiz/data/data';
import { IGif } from '../../common/interfaces/test.interface';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, debounceTime, tap } from 'rxjs';
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
      this.formControl.setValue(storeData.value);
      this.formControl.disable();
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
      else {
        this.state = 'incorrect';
        this.quizService.decrementLives();
      }
    } else this.state = 'incorrect';

    const dataToStore: IEnterAnswerStore = {
      value: this.formControl.value as string,
      state: this.state,
      question: this.question,
    };
    this.quizService.setInStore(this.taskId, dataToStore);
  }
}
