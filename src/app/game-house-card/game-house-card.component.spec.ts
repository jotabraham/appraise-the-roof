import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameHouseCardComponent } from './game-house-card.component';

describe('GameHouseCardComponent', () => {
  let component: GameHouseCardComponent;
  let fixture: ComponentFixture<GameHouseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameHouseCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameHouseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
