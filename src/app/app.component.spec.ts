import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { BoardNodeComponent } from './components/board-node/board-node.component';
import { StartStageComponent } from './components/start-stage/start-stage.component';
import { GameService } from './services/game.service';
import { StateService } from './services/state.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BoardComponent,
        BoardNodeComponent,
        StartStageComponent
      ],
      providers: [
        GameService,
        StateService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should not render game initially', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.tictactoe__game')).toBe(null);
  }));
});
