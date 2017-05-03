import { Component } from '@angular/core';
import {GetStateService, IBoard, IBoardNode, IWinObject} from './services/get-state.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public boardNodes: IBoard;
  constructor(private stateService: GetStateService) {
    this.boardNodes = this.stateService.getBoard();
    this.stateService.boardSource$.subscribe((newBoard: IBoard) => {this.boardUpdated(newBoard)});
    this.stateService.someoneWon$.subscribe((winning: IWinObject) => {
      this.onWin(winning);
    });
  }

  private boardUpdated(newBoard: IBoard) {
    console.log("subscribed data arrived: ", newBoard);
    this.boardNodes = newBoard;
    this.stateService.checkWinning("user", 3);
  }

  private onWin(winning: IWinObject) {
    this.boardNodes = this.stateService.getBoard();
    console.log("winner: ", winning.winner);
  }

  //TODO: kill this, use the subscribe instead, update the nodeService directly from the node
  public nodeUpdated(event: IBoardNode) {
    //TODO: this is to moved inner, no need for callback here
    this.stateService.setNode(event.x, event.y, event.value);
  }
  public reset() {
    this.stateService.resetBoard();
    //TODO: listen to some event from the data source instead of directly from here
    this.boardNodes = this.stateService.getBoard();
    return false;
  }
}
