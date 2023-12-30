import { Component, inject } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../common/components/snackbar/snackbar.component';

@Component({
  selector: 'app-enter-answer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './enter-answer.component.html',
  styleUrl: './enter-answer.component.scss',
})
export class EnterAnswerComponent {
  value!: string;

  constructor(private _snackBar: MatSnackBar) {}

  onDone = () =>
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 5 * 1000,
      data: 'sworia',
    });
}
