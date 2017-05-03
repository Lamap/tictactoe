import { Component, OnInit } from '@angular/core';
import {GameService, IBoard, IBoardNode, IWinObject} from '../../services/game.service';

@Component({
  selector: 'ttt-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit {

	public boardNodes: IBoard;
  	constructor(private gameService: GameService) {
	    this.boardNodes = this.gameService.getBoard();
	    this.gameService.boardSource$.subscribe((newBoard: IBoard) => {this.boardUpdated(newBoard);});
	    this.gameService.someoneWon$.subscribe((winning: IWinObject) => {this.onWin(winning);});
	}

	private boardUpdated(newBoard: IBoard) {
		console.log("subscribed data arrived: ", newBoard);
		this.boardNodes = newBoard;
		this.gameService.checkWinning("user", 3);
	}

	private onWin(winning: IWinObject) {
		this.boardNodes = this.gameService.getBoard();
		console.log("winner: ", winning.winner);
	}

	//TODO: use the subscribe instead, update the nodeService directly from the node
	public nodeUpdated(event: IBoardNode) {
		//TODO: this is to moved inner, no need for callback here
		this.gameService.setNode(event.x, event.y, event.value);
	}
	ngOnInit() {
	}

}
