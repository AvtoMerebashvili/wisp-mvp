import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordOptionComponent } from './word-option.component';

describe('WordOptionComponent', () => {
  let component: WordOptionComponent;
  let fixture: ComponentFixture<WordOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
