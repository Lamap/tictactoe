import { Component } from '@angular/core';
import {GameService, IBoard, IBoardNode, IWinObject} from './services/game.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public boardNodes: IBoard;
  constructor(private gameService: GameService) {

  }

  public reset() {
    this.gameService.resetBoard();
    return false;
  }
}
