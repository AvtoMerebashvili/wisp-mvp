import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared.module';

@Component({
  selector: 'app-repeat',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './repeat.component.html',
  styleUrl: './repeat.component.scss',
})
export class RepeatComponent {}
