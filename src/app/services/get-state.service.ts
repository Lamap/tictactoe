import { Injectable } from '@angular/core';
type Node = "user" | "computer";
export interface IBoardNode {
  col: number;
  row: number;
  value: string;
};
interface IBoardRow {
  [index: number]: IBoardNode;
};
export interface IBoard {
  [index: number]: IBoardRow;
};
@Injectable()
export class GetStateService {
  private boardData = [
    [null, null, null],
    [null, "computer", null],
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  private initialBoardData = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  private maxRowLength:number = 0;
  constructor() {

  }
  public getNodeAt(col:number, row:number): IBoardNode {
    return {
      value: this.boardData[col][row],
      row: row,
      col: col
    };
  }
  public getBoard():IBoard {
    let boardNodes: IBoard = [];
    for (let col = 0; col < this.boardData.length; col++) {
      boardNodes[col] = [];
      if (this.maxRowLength < this.boardData[col].length) {
        this.maxRowLength = this.boardData[col].length;
      }
      for (let row = 0; row < this.boardData[col].length; row++) {
        boardNodes[col][row] = {
          col: col,
          row: row,
          value: this.boardData[col][row]
        };
      }
    }
    return boardNodes;
  }
  public resetBoard(): void {
    this.boardData = JSON.parse(JSON.stringify(this.initialBoardData));
  }
  public setNode(col: number, row: number, value: string): void {
    this.boardData[col][row] = value;
  }
  public hasLine(type: Node, length: number): boolean {
    let line: number = 0;

    let checkLine = (node: string) => {
      if (node === type) {
          line++;
        }
        else {
          line = 0;
        }
        if (line === length) {
          return true;
        }
    }
    
    //horizontal
    for (let col = 0; col < this.boardData.length; col++) {
      line = 0;
      for (let row = 0; row < this.boardData[col].length; row++) {
        if (checkLine(this.boardData[col][row])) {
          return true;
        }
      }
    }

    //vertical
    for (let row = 0; row < this.maxRowLength; row++ ) {
      line = 0;
      for (let col = 0; col < this.boardData.length; col++) {
        if (checkLine(this.boardData[col][row])) {
          return true;
        }
      }
    }
    //diagonal LR

    return false;
  }
}
