import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartStageComponent } from './start-stage.component';
import { GameService } from '../../services/game.service';
import { StateService } from '../../services/state.service';

describe('StartStageComponent', () => {
  let component: StartStageComponent;
  let fixture: ComponentFixture<StartStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartStageComponent ],
      providers: [
        GameService,
        StateService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
