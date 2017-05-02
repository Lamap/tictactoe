import { Component } from '@angular/core';
import {GetStateService, IBoard, IBoardNode} from './services/get-state.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public boardNodes: IBoard;
  constructor(private stateService: GetStateService) {
    this.boardNodes = this.stateService.getBoard();
  }
  public nodeUpdated(event: IBoardNode) {
    this.stateService.setNode(event.x, event.y, event.value);

    //TODO: listen to some event from the data source instead of directly from here
    this.boardNodes = this.stateService.getBoard();

    let winLine = this.stateService.hasWinningLine("user", 3)
    if (winLine) {
      this.stateService.decorateWinLine(winLine);
      //TODO: listen to some event from the data source instead of directly from here
      this.boardNodes = this.stateService.getBoard();
    }
  }
  public reset() {
    this.stateService.resetBoard();
    //TODO: listen to some event from the data source instead of directly from here
    this.boardNodes = this.stateService.getBoard();
    return false;
  }
}
