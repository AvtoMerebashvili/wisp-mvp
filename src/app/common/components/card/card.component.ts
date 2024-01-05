import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TOptionResult } from '../../interfaces/option-result.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() src = '';
  @Input() describe = '';
  @Input() disabled = false;
  @Input() state!: TOptionResult;
  @Output() clicked = new EventEmitter<string>();

  onClick = () => (this.disabled ? false : this.clicked.emit(this.src));
}
