import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'ttt-start-stage',
  templateUrl: './start-stage.component.html',
  styleUrls: ['./start-stage.component.less']
})
export class StartStageComponent implements OnInit {
	public winLength: number;
	public xDimension: number;
	public yDimension: number;

  constructor(private stateService: StateService, private gameService: GameService) {
  	this.winLength = this.stateService.getWinLength();
  	this.xDimension = this.stateService.getXdimension();
  	this.yDimension = this.stateService.getYdimension();

  }

  public startGame(event) {
  	this.gameService.startGame();
  }
  public setXDimension(event, value) {
  	this.xDimension = value;
  	this.stateService.setXdimension(value);
  }
  public setYDimension(event, value) {
  	this.yDimension = value;
  	this.stateService.setYdimension(value);
  }
  public setWinLine(event, value) {
  	this.winLength = value;
  	this.stateService.setWinLength(value);
  }

  ngOnInit() {

  }

}
