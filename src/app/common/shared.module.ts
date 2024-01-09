import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from './components/card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { WordOptionComponent } from './components/word-option/word-option.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

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
  ],
})
export class SharedModule {}
