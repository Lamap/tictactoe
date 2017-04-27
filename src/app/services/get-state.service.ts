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
    [null, null, null],
    [null, null, null]
  ];
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
  public setNode(col: number, row: number, value: string): void {
    this.boardData[col][row] = value;
  }
}
