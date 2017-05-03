import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import { StateService } from "./state.service";


export type Node = "user" | "computer";
export interface IBoardNode {
  x: number;
  y: number;
  value: string;
  winNode?: boolean;
};
export interface IWinObject {
  line: IBoardNode[],
  winner: string
};
interface IBoardRow {
  [index: number]: IBoardNode;
};
export interface IBoard {
  [index: number]: IBoardRow;
};

@Injectable()
export class GameService {

  private boardData: any[] = [
    [null, null, null],
    [null, {owner: "computer"}, null],
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  private initialBoardData: any[] = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  private xDimension:number = 0;
  private yDimension: number = 0;
  private winLine: IBoardNode[] = [];
  private boardSource = new Subject<IBoard>();
  private someoneWon = new Subject<IWinObject>();

  constructor(private stateService: StateService) {

  }
  public boardSource$ = this.boardSource.asObservable();
  public someoneWon$ = this.someoneWon.asObservable();
  private boardUpdated () {
    this.boardSource.next(this.getBoard());
  }
  public getNodeAt(x:number, y:number): IBoardNode {
    const value: string = this.boardData[y][x] ? this.boardData[y][x].owner : null;
    return {
      value: value,
      x: x,
      y: y
    };
  }
  public getBoard():IBoard {
    let boardNodes: IBoard = [];
    this.yDimension = this.boardData.length;
    for (let y = 0; y < this.boardData.length; y++) {
      boardNodes[y] = [];
      if (this.xDimension < this.boardData[y].length) {
        this.xDimension = this.boardData[y].length;
      }
      for (let x = 0; x < this.boardData[x].length; x++) {
        const value: string = this.boardData[y][x] ? this.boardData[y][x].owner : null;
        const win: boolean = this.boardData[y][x] ? this.boardData[y][x].winLine : false;

        boardNodes[y][x] = {
          x: x,
          y: y,
          value: value,
          winNode: win
        };
      }
    }
    return boardNodes;
  }
  public decorateWinLine(winLine: IBoardNode[]):void {
    for(let winNode of winLine) {
      this.boardData[winNode.y][winNode.x].winLine = true;
    }
    this.someoneWon.next({
      line: winLine,
      winner: winLine[0].value
    });
  }
  public resetBoard(): void {
    this.boardData = JSON.parse(JSON.stringify(this.initialBoardData));
    this.boardUpdated();
    console.log("state:::::::::", this.stateService.getBoard());
  }
  public setNode(x: number, y: number, value: string): void {
    if (!this.boardData[y][x]) {
      this.boardData[y][x] = {};
    }
    this.boardData[y][x].owner = value;
    this.boardUpdated();
  }
  public checkWinning(type: Node, length: number): IBoardNode[] {
    let checkLine = (node: IBoardNode) => {
      if (node.value === type) {
          this.winLine.push(node);
        }
        else {
          this.winLine = [];
        }
        if (this.winLine.length === length) {
          this.decorateWinLine(this.winLine);
          return true;
        }
    };
    let checkDiagonal = (x: number, y: number): boolean => {
      while (x < this.xDimension && y < this.yDimension) {
        let node:IBoardNode = this.getNodeAt(x, y);
        if (checkLine(node)) {
          return true;
        }
        x++;
        y++;
      }
      return false;
    };
    let checkDiagonalReverse = (x: number, y: number): boolean => {
      while (x >= 0 && y < this.yDimension) {
        let node:IBoardNode = this.getNodeAt(x, y);
        if (checkLine(node)) {
          return true;
        }
        x--;
        y++;
      }
      return false;
    };

    // horizontal
    for (let y = 0; y < this.yDimension; y++) {
      this.winLine = [];
      for (let x = 0; x < this.xDimension; x++) {
        let node:IBoardNode = this.getNodeAt(x, y);
        if (checkLine(node)) {
          return this.winLine;
        }
      }
    }

    // vertical
    for (let x = 0; x < this.xDimension; x++ ) {
      this.winLine = [];
      for (let y = 0; y < this.yDimension; y++) {
        let node:IBoardNode = this.getNodeAt(x, y);
        if (checkLine(node)) {
          return this.winLine;
        }
      }
    }

    // diagonal \
    for (let x = 0; x < this.xDimension; x++) {
      this.winLine = [];
      if (checkDiagonal(x, 0)) {
        return this.winLine;
      }
    }
    for (let y = 1; y < this.yDimension; y++) {
      this.winLine = [];
      if (checkDiagonal(0, y)) {
        return this.winLine;
      }
    }
    // diagonal /
    for (let x = 0; x < this.xDimension; x++) {
      this.winLine = [];
      if (checkDiagonalReverse(x, 0)) {
        return this.winLine;
      }
    }

    for (let y = 1; y < this.yDimension; y++) {
      this.winLine = [];
      if (checkDiagonalReverse(this.xDimension - 1, y)) {
        return this.winLine;
      }
    }

    return null;
  }
}
