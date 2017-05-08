import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import { StateService, Node, IBoard, IBoardNode } from "./state.service";

export interface IWinObject {
  line: IBoardNode[],
  winner: Node
};

@Injectable()
export class GameService {

  private winLine: IBoardNode[] = [];
  private someoneWon = new Subject<IWinObject>();

  constructor(private stateService: StateService) {

  }
  public someoneWon$ = this.someoneWon.asObservable();

  public startGame() {
    this.stateService.resetBoard();
    this.stateService.setGameMode(true);
  }

  public decorateWinLine(winLine: IBoardNode[]):void {	
    for(let winNode of winLine) {
      this.stateService.setNodeToWin(winNode.x, winNode.y);
    }
    
  }
  public setNodeToPlayer(node: IBoardNode) {
    node.owner = "player";
    this.setNode(node);
    let playerWinLine: IBoardNode[] = this.checkWinning("player", this.stateService.getWinLength());
    if(playerWinLine) {
      this.decorateWinLine(playerWinLine);
      this.someoneWon.next({
        line: playerWinLine,
        winner: "player"
      });
      this.stateService.incrementPlayerWin();
      this.freezeNodes();
      return;
    }
    const computerStep: IBoardNode = this.getComputerStep();
    if (computerStep) {
      this.setNode(computerStep);
    }
    const computerWinLine: IBoardNode[] = this.checkWinning("computer", this.stateService.getWinLength());
    if (computerWinLine) {
      this.decorateWinLine(computerWinLine);
      this.stateService.incrementComputerWin();
      this.someoneWon.next({
        line: computerWinLine,
        winner: "computer"
      });
      this.freezeNodes();
      return;
    }
    if (!this.getFreeNodes().length) {
      this.freezeNodes();
      this.stateService.incrementDraw();
      this.someoneWon.next(null);
    }
  }
  private setNode(node:IBoardNode): void {
  	this.stateService.setNode(node.x, node.y, node.owner);
  }
  private freezeNodes() {
    for (let x = 0; x < this.stateService.getXdimension(); x++) {
      for (let y = 0; y < this.stateService.getYdimension(); y++) {
        this.stateService.freezeNode(x, y);
      }
    }
  }
  public checkWinning(type: Node, length: number): IBoardNode[] {
  	let winLine: IBoardNode[];
  	const xDimension: number = this.stateService.getXdimension();
  	const yDimension: number = this.stateService.getYdimension();

    let checkLine = (node: IBoardNode) => {
      if (node.owner === type) {
          winLine.push(node);
        }
        else {
          winLine = [];
        }
        if (winLine.length === length) {
          this.decorateWinLine(winLine);
          return true;
        }
    };
    let checkDiagonal = (x: number, y: number): boolean => {
      while (x < xDimension && y < yDimension) {
        let node:IBoardNode = this.stateService.getNodeAt(x, y);
        if (checkLine(node)) {
          return true;
        }
        x++;
        y++;
      }
      return false;
    };
    let checkDiagonalReverse = (x: number, y: number): boolean => {
      while (x >= 0 && y < yDimension) {
        let node:IBoardNode = this.stateService.getNodeAt(x, y);
        if (checkLine(node)) {
          return true;
        }
        x--;
        y++;
      }
      return false;
    };

    // horizontal
    for (let y = 0; y < yDimension; y++) {
      winLine = [];
      for (let x = 0; x < xDimension; x++) {
        let node:IBoardNode = this.stateService.getNodeAt(x, y);
        if (checkLine(node)) {
          return winLine;
        }
      }
    }

    // vertical
    for (let x = 0; x < xDimension; x++ ) {
      winLine = [];
      for (let y = 0; y < yDimension; y++) {
        let node:IBoardNode = this.stateService.getNodeAt(x, y);
        if (checkLine(node)) {
          return winLine;
        }
      }
    }

    // diagonal \
    for (let x = 0; x < xDimension; x++) {
      winLine = [];
      if (checkDiagonal(x, 0)) {
        return winLine;
      }
    }
    for (let y = 1; y < yDimension; y++) {
      winLine = [];
      if (checkDiagonal(0, y)) {
        return winLine;
      }
    }
    // diagonal /
    for (let x = 0; x < xDimension; x++) {
      winLine = [];
      if (checkDiagonalReverse(x, 0)) {
        return winLine;
      }
    }

    for (let y = 1; y < yDimension; y++) {
      winLine = [];
      if (checkDiagonalReverse(xDimension - 1, y)) {
        return winLine;
      }
    }

    return null;
  }
  public getComputerStep(): IBoardNode {
  	let computerStep: IBoardNode;
  	// prevent player
  	  //this.checkWinning("user", 2);
    // finish line
      //this.checkWinning("computer", 2);

  	// if nothing to do just do a random step
    const freeNodes: IBoardNode[] = this.getFreeNodes();
    if (!freeNodes.length) {
      return null;
    }
  	computerStep = this.getRandomItem(freeNodes);
    computerStep.owner = "computer";
  	return computerStep;
  }
  private getFreeNodes(): IBoardNode[] {
  	let freeNodes = [];
  	const xDimension: number = this.stateService.getXdimension();
  	const yDimension: number = this.stateService.getYdimension();
  	for (let x = 0; x < xDimension; x++ ) {
      for (let y = 0; y < yDimension; y++) {
      	const node = this.stateService.getNodeAt(x, y); 
        if (!node.owner) {
          freeNodes.push(node);
        }
      }
    }
    return freeNodes;
  }
  private getRandomItem(items: any[]): any {
  	const randomIndex: number = Math.round(Math.random() * (items.length - 1));
  	return items[randomIndex];
  }
}
