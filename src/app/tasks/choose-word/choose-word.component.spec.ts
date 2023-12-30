import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosAnswerComponent } from './choose-word.component';

describe('ChoosAnswerComponent', () => {
  let component: ChoosAnswerComponent;
  let fixture: ComponentFixture<ChoosAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoosAnswerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChoosAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
