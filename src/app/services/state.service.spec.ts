import { TestBed, inject } from '@angular/core/testing';

import { StateService, IBoard } from './state.service';
import { GameService } from './game.service';

const initailBoard: IBoard = [
  [

  ]
];

describe('StateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
		providers: [
      		StateService,
      		GameService
    	]
    });
  });

  it('should be created', inject([StateService], (service: StateService) => {
    expect(service).toBeTruthy();
  }));
  describe('initial state', () => {
    beforeEach(() => {
      window.localStorage.setItem("lamap-ttt-gamestate", null);
    });
    it('should contain initial board', inject([StateService], (service: StateService) => {
      const board: any = service.getBoard();
      expect(board.length).toBe(4);
      expect(board[3].length).toBe(4);
    }));
    it('should contain initial scores', inject([StateService], (service: StateService) => {
      expect(service.getScores().computer).toBe(0);
      expect(service.getScores().draw).toBe(0);
      expect(service.getScores().player).toBe(0);
    }));
    it('should contain initial winLength', inject([StateService], (service: StateService) => {
      expect(service.getWinLength()).toBe(3);
    }));
    it('should contain initial gameStage', inject([StateService], (service: StateService) => {
      expect(service.getGameStage()).toBe(false);
    }));
    it('should contain initial dimension', inject([StateService], (service: StateService) => {
      expect(service.getXdimension()).toBe(4);
      expect(service.getYdimension()).toBe(4);
    }));
  });
  describe('existing localstorage', () => {
    it('should set board', inject([StateService], (service: StateService) => {
      //
    }));
    it('should set scores', inject([StateService], (service: StateService) => {
      //
    }));
    it('should set winning line', inject([StateService], (service: StateService) => {
      //
    }));
    it('should set dimensions', inject([StateService], (service: StateService) => {
      //
    }));
  });
  it('should set owner of node', inject([StateService], (service: StateService) => {
    const board: any = service.getBoard();
    service.setNode(0, 0, "player");
    expect(service.getNodeAt(0, 0).owner).toBe("player");
  }));
  it('should freeze node', inject([StateService], (service: StateService) => {
    service.freezeNode(0, 0);
    expect(service.getNodeAt(0, 0).freeze).toBe(true);
  }));
  it('should set winning node', inject([StateService], (service: StateService) => {
    const board: any = service.getBoard();
    service.setNodeToWin(2, 1);
    expect(service.getNodeAt(2, 1).isWinNode).toBe(true);
  }));
  it('reset should set initial board', inject([StateService], (service: StateService) => {
    //
  }));
  it('reset should not change anything out of board', inject([StateService], (service: StateService) => {
    //
  }));
});
