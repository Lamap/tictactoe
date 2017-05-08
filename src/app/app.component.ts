import { Component } from '@angular/core';
import { GameService, IWinObject } from './services/game.service';
import { StateService, IBoard, IBoardNode, IScores} from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public boardNodes: IBoard;
  public isGameStage: boolean = false;
  public scores: IScores;
  public message: string;
  constructor(private gameService: GameService, private stateService: StateService) {
      this.gameService.someoneWon$.subscribe((winning: IWinObject) => {this.onWin(winning);});
      this.stateService.gameStage$.subscribe((isGameStage: boolean) => {this.setStage(isGameStage)});
      this.stateService.gameScores$.subscribe((scores: IScores) => {this.onScoresChanged(scores)});
      this.scores = this.stateService.getScores();
      this.isGameStage = this.stateService.getGameStage();
  }
  private onWin(winning: IWinObject) {
    if (!winning) {
      return this.message = "It is a draw. Try again!";
    }
    if (winning.winner === "player") {
      this.message = "You won!";
    }
    if (winning.winner === "computer") {
      this.message = "You lost, but try again!";
    }
  }
  private onScoresChanged(scores: IScores) {
    this.scores = scores;
  }
  private setStage(isGameStage: boolean) {
    this.isGameStage = isGameStage;
  }

  public reset() {
    this.stateService.resetBoard();
    this.isGameStage = false;
    this.message = "";
    //this.stateService.setGameMode(false);
  }
}
