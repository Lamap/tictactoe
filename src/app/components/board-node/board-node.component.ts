import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import  { IWinObject } from "../../services/game.service";
import  { IBoardNode, IBoard } from "../../services/state.service";

@Component({
  selector: 'ttt-board-node',
  templateUrl: './board-node.component.html',
  styleUrls: ['./board-node.component.less']
})
export class BoardNodeComponent implements OnInit {

  constructor() {

  }
  @Input() node;
  @Output() onUpdated = new EventEmitter<IBoardNode>();

  ngOnInit() {
  	//this.isPlayer = this.node === 'user';
  }
  public isPlayer = () => {
  	return this.node.owner === "player";
  };
  public isComputer = () => {
  	return this.node.owner === "computer";
  };
  public isWinningLine = () => {
  	return this.node.isWinNode;
  };
  public isFreezed = () => {
    return this.node.freeze;
  }

  public nodeClick(event, item) {
  	if (item.owner || this.node.freeze) {
  		return;
  	}
  	let updatedItem: IBoardNode = JSON.parse(JSON.stringify(item));
  	updatedItem.owner = "player";
  	this.onUpdated.emit(updatedItem);
  }
}
