import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared.module';

@Component({
  selector: 'app-choose-gesture',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './choose-gesture.component.html',
  styleUrl: './choose-gesture.component.scss',
})
export class ChooseGestureComponent {}
