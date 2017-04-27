import { Injectable } from '@angular/core';
type Node = "user" | "computer";
interface IBoardRow {
  [index: number]: String;
};
export interface IBoard {
  [index: number]: IBoardRow;
};
@Injectable()
export class GetStateService {
  private board = [
    [null, "user", null],
    ["user", null, null],
    [null, null, "user"]
  ];
  constructor() {

  }
  public getNodeAt(col:number, row:number): String {
    return this.board[col][row];
  }
  public getBoard():IBoard {
    return this.board;
  }
}
