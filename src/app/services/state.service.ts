import { Injectable } from '@angular/core';
import { IBoard } from "./game.service";

@Injectable()
export class StateService {
	private key: string = "lamap-ttt-gamestate";
	private initialState: any[] = [
	    [null, null, null, null],
	    [null, null, null, null],
	    [null, null, null, null],
	    [null, null, null, null],
	    [null, null, null, null]
	  ];
	constructor() {
		if (!window.localStorage.getItem(this.key)) {
			window.localStorage.setItem(this.key, JSON.stringify(this.initialState));
		}
	}
	public updateBoard(board: IBoard) {
		window.localStorage.setItem(this.key, JSON.stringify(board));
	}
	public getBoard() {
		let board: IBoard = null;
		try {
			board = JSON.parse(window.localStorage.getItem(this.key))
		} catch (err) {
			console.log(err);
		} finally {
			return board;
		}
	}
}
