import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { TOptionResult } from '../../interfaces/option-result.type';

@Component({
  selector: 'app-word-option',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './word-option.component.html',
  styleUrl: './word-option.component.scss',
})
export class WordOptionComponent {
  @Input() value!: string;
  @Input() state!: TOptionResult;
  @Input() disabled = false;
  @Output() clicked = new EventEmitter();

  onClick = () => (this.disabled ? false : this.clicked.emit(this.value));
}
