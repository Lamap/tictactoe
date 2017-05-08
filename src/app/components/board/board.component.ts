import { Component, OnInit } from '@angular/core';
import {GameService, IWinObject} from '../../services/game.service';
import {StateService, IBoard, IBoardNode} from '../../services/state.service';

@Component({
  selector: 'ttt-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit {

	public boardNodes: IBoard;
  	constructor(private gameService: GameService, private stateService: StateService) {
	    this.stateService.boardSource$.subscribe((newBoard: IBoard) => {this.boardUpdated(newBoard);});
	    this.gameService.someoneWon$.subscribe((winning: IWinObject) => {this.onWin(winning);});

	    //TODO: the first initial change does not arrive via subscription
	    this.boardNodes = this.stateService.getBoard();
	}

	private boardUpdated(newBoard: IBoard) {
		this.boardNodes = newBoard;
	}

	private onWin(winning: IWinObject) {
		this.boardNodes = this.stateService.getBoard();
	}

	//TODO: use the subscribe instead, update the nodeService directly from the node
	public nodeUpdated(event: IBoardNode) {
		//TODO: this is to moved inner, no need for callback here
		this.gameService.setNodeToPlayer(event);
	}
	ngOnInit() {
	}

}
