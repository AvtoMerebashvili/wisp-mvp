import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterAnswerComponent } from './enter-answer.component';

describe('EnterAnswerComponent', () => {
  let component: EnterAnswerComponent;
  let fixture: ComponentFixture<EnterAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterAnswerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnterAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
