import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseGestureComponent } from './choose-gesture.component';

describe('ChooseGestureComponent', () => {
  let component: ChooseGestureComponent;
  let fixture: ComponentFixture<ChooseGestureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseGestureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseGestureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
