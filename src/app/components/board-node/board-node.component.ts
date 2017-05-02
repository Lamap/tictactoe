import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import  {IBoardNode} from "../../services/get-state.service";

@Component({
  selector: 'ttt-board-node',
  templateUrl: './board-node.component.html',
  styleUrls: ['./board-node.component.less']
})
export class BoardNodeComponent implements OnInit {

  constructor() { }
  @Input() node;
  @Output() onUpdated = new EventEmitter<IBoardNode>();

  ngOnInit() {
  	//this.isPlayer = this.node === 'user';
  }
  public isPlayer = () => {
  	return this.node.value === 'user';
  }
  public isComputer = () => {
  	return this.node.value === 'computer';
  }

  public nodeClick(event, item) {
  	if (item.value) {
  		return;
  	}
  	console.log(item);
  	let updatedItem: IBoardNode = JSON.parse(JSON.stringify(item));
  	updatedItem.value = "user";
  	this.onUpdated.emit(updatedItem);
  }

}
