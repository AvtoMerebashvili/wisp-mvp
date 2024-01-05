import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-word-option',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './word-option.component.html',
  styleUrl: './word-option.component.scss',
})
export class WordOptionComponent {
  @Input() value!: string;
}
