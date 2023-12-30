import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared.module';

@Component({
  selector: 'app-choos-answer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './choose-word.component.html',
  styleUrl: './choose-word.component.scss',
})
export class ChooseWordComponent {}
