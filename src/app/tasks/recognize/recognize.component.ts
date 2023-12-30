import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared.module';

@Component({
  selector: 'app-recognize',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './recognize.component.html',
  styleUrl: './recognize.component.scss',
})
export class RecognizeComponent {}
