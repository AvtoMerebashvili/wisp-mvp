import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  imports: [
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
  ],
  exports: [
    FormsModule,
    MatCardModule,
    CardComponent,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    WordOptionComponent,
    MatProgressSpinnerModule,
  ],
})
export class SharedModule {}
