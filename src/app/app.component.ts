import { Component } from '@angular/core';
import {GetStateService, IBoard} from './services/get-state.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public title = 'app works!';
  public boardNodes: IBoard;
  constructor(private stateService: GetStateService) {
    console.log(this.stateService.getNodeAt(1, 2));
    console.log(this.stateService.getBoard());
    this.boardNodes = this.stateService.getBoard();
  }
}
