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
    console.log(this.boardNodes);
  }
  public nodeUpdated(event: IBoardNode) {
    console.log("board-node-upd", event);
    this.stateService.setNode(event.col, event.row, event.value);

    //TODO: listen to some event from the data source instead of directly from here
    this.boardNodes = this.stateService.getBoard();
  }
}
