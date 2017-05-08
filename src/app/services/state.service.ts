import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

export type Node = "player" | "computer";
export interface IBoardNode {
  x: number;
  y: number;
  isWinNode: boolean;
  owner: Node;
  freeze?: boolean
};
export interface IBoardRow {
  [index: number]: IBoardNode;
};
export interface IBoard {
  [index: number]: IBoardRow;
};
export interface IWinObject {
  line: IBoardNode[],
  winner: string
};
export interface IScores {
	player: number;
	computer: number;
	draw: number;
}
interface IBoardState {
	scores: IScores;
	xDimension: number;
	yDimension: number;
	winLength: number;
	board: IBoard;
	isGameStage: boolean;
};

@Injectable()
export class StateService {
	private key: string = "lamap-ttt-gamestate";
  	private boardSource = new Subject<IBoard>();
  	private gameStage = new Subject<boolean>();
  	private gameScores = new Subject<IScores>();

  	private initialBoardState: IBoardState = {
		scores: {
			player: 0,
			computer: 0,
			draw: 0
		},
		xDimension: 4,
		yDimension: 4,
		winLength: 3,
		board: null,
		isGameStage: false
	};

  	public boardSource$ = this.boardSource.asObservable();
  	public gameStage$ = this.gameStage.asObservable();
  	public gameScores$ = this.gameScores.asObservable();
  	private board: IBoard;

	constructor() {
		const storage = JSON.parse(window.localStorage.getItem(this.key));
		if (!storage) {
			this.initialBoardState.board = this.createInitialBoard(this.initialBoardState.xDimension, this.initialBoardState.yDimension);
			window.localStorage.setItem(this.key, JSON.stringify(this.initialBoardState));
		}
		this.getBoard();
	}
	private createInitialBoard(x: number, y: number): IBoard {
		let board = [];
		for (let y = 0; y < this.initialBoardState.yDimension; y++) {
			board[y] = [];
			for (let x = 0; x < this.initialBoardState.xDimension; x++) {
				board[y][x] = {x: 0, y: 0, isWinNode: false, owner: null, freeze: false};
			}
		}
		return board;
	}
	private updateBoard(board: IBoard) {
		let state:IBoardState = JSON.parse(window.localStorage.getItem(this.key));
		state.board = board;
		window.localStorage.setItem(this.key, JSON.stringify(state));
		this.boardSource.next(board);
	}
	public resetBoard(): void {
		let state:IBoardState = JSON.parse(window.localStorage.getItem(this.key));
		state.board = this.createInitialBoard(state.xDimension, state.yDimension);
		window.localStorage.setItem(this.key, JSON.stringify(state));
		this.updateBoard(state.board);
	}
	public getNodeAt(x:number, y:number): IBoardNode {
	    return this.board[y][x];
	  }
	public getBoard(): IBoard {
		this.board = [];
		try {
			let boardState: IBoardState = JSON.parse(window.localStorage.getItem(this.key));
			let boardData: IBoard = boardState.board;

		    for (let y = 0; y < boardState.yDimension; y++) {
		      this.board[y] = [];
		      for (let x = 0; x < boardState.xDimension; x++) {
		      	const isWinNode: boolean = boardData[y] && boardData[y][x] ? boardData[y][x].isWinNode : false;
		      	const owner: Node = boardData[y] && boardData[y][x] ? boardData[y][x].owner : null;
		      	const freeze: boolean = boardData[y] && boardData[y][x] ? boardData[y][x].freeze : false;

		        const boardNode: IBoardNode = {
		          x: x,
		          y: y,
		          isWinNode: isWinNode,
		          owner: owner,
		          freeze: freeze
		        };
		        this.board[y][x] = boardNode;
		      }
		    }

		} catch (err) {
			console.warn(err);
		} finally {
			return this.board;
		}
	}
	public setNode(x: number, y: number, value: Node) {
		this.board[y][x].owner = value;
		this.updateBoard(this.board);
	}
	public setNodeToWin(x: number, y: number) {
		this.board[y][x].isWinNode = true;
		this.updateBoard(this.board);
	}
	public getXdimension(): number {
		const storage = JSON.parse(window.localStorage.getItem(this.key));
		return storage.xDimension;
	}
	public getYdimension(): number {
		const storage = JSON.parse(window.localStorage.getItem(this.key));
		return storage.yDimension;
	}
	public getWinLength(): number {
		const storage = JSON.parse(window.localStorage.getItem(this.key));
		return storage.winLength;
	}
	public setXdimension(value: number) {
		let storage = JSON.parse(window.localStorage.getItem(this.key)) as IBoardState;
		storage.xDimension = value;
		window.localStorage.setItem(this.key, JSON.stringify(storage));
	}
	public setYdimension(value: number) {
		let storage = JSON.parse(window.localStorage.getItem(this.key)) as IBoardState;
		storage.yDimension = value;
		window.localStorage.setItem(this.key, JSON.stringify(storage));
	}
	public setWinLength(value: number) {
		let storage = JSON.parse(window.localStorage.getItem(this.key)) as IBoardState;
		storage.winLength = value;
		window.localStorage.setItem(this.key, JSON.stringify(storage));
	}
	public getScores(): IScores {
		const storage = JSON.parse(window.localStorage.getItem(this.key));
		return storage.scores;
	}

	public setGameMode(value: boolean) {
		const storage = JSON.parse(window.localStorage.getItem(this.key)) as IBoardState;
		storage.isGameStage = value;
		window.localStorage.setItem(this.key, JSON.stringify(storage));
		this.gameStage.next(value);
	}

	public getGameStage():boolean {
		const storage = JSON.parse(window.localStorage.getItem(this.key)) as IBoardState;
		return storage.isGameStage;
	}

	public incrementPlayerWin() {
		let storage = JSON.parse(window.localStorage.getItem(this.key)) as IBoardState;
		storage.scores.player++;
		window.localStorage.setItem(this.key, JSON.stringify(storage));
		this.gameScores.next(storage.scores);	
	}
	public incrementComputerWin() {
		let storage = JSON.parse(window.localStorage.getItem(this.key)) as IBoardState;
		storage.scores.computer++;
		window.localStorage.setItem(this.key, JSON.stringify(storage));
		this.gameScores.next(storage.scores);	
	}
	public incrementDraw() {
		let storage = JSON.parse(window.localStorage.getItem(this.key)) as IBoardState;
		storage.scores.draw++;
		window.localStorage.setItem(this.key, JSON.stringify(storage));
		this.gameScores.next(storage.scores);	
	}
	public freezeNode(x: number, y: number) {
		this.board[y][x].freeze = true;
		this.updateBoard(this.board);
	}
}
