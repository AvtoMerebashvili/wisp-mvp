import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { CardComponent } from './components/card/card.component';
import { WordOptionComponent } from './components/word-option/word-option.component';
import { DialogComponent } from './components/dialog/dialog.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    CardComponent,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
    WordOptionComponent,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    CardComponent,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    WordOptionComponent,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatDialogModule,
  ],
})
export class SharedModule {}
