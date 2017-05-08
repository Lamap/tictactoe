import { TestBed, inject } from '@angular/core/testing';

import { GameService } from './game.service';
import { StateService } from './state.service';

describe('GameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      	providers: [
      		GameService,
      		StateService
  		]
    });
  });

  it('should be created', inject([GameService], (service: GameService) => {
    expect(service).toBeTruthy();
  }));
  describe('should find the winning line of', () => {

    it('vertical player nodes', inject([GameService], (service: GameService) => {
      service.setNodeToPlayer({x: 0, y: 0, owner: null, freeze: null, isWinNode: false});
      service.setNodeToPlayer({x: 0, y: 1, owner: null, freeze: null, isWinNode: false});
      service.setNodeToPlayer({x: 0, y: 2, owner: null, freeze: null, isWinNode: false});

      expect(service.checkWinning("player", 3)[0].owner).toBe("player");
      expect(service.checkWinning("player", 3).length).toBe(3);
    }));
    it('horizontal player nodes', inject([GameService, StateService], (service: GameService, state: StateService) => {
      state.resetBoard();
      service.setNodeToPlayer({x: 0, y: 0, owner: null, freeze: null, isWinNode: false});
      service.setNodeToPlayer({x: 1, y: 0, owner: null, freeze: null, isWinNode: false});
      service.setNodeToPlayer({x: 2, y: 0, owner: null, freeze: null, isWinNode: false});

      expect(service.checkWinning("player", 3)[0].owner).toBe("player");
      expect(service.checkWinning("player", 3).length).toBe(3);
    }));
    it('angular player nodes', inject([GameService, StateService], (service: GameService, state: StateService) => {
      state.resetBoard();
      service.setNodeToPlayer({x: 0, y: 0, owner: null, freeze: null, isWinNode: false});
      service.setNodeToPlayer({x: 1, y: 1, owner: null, freeze: null, isWinNode: false});
      service.setNodeToPlayer({x: 2, y: 2, owner: null, freeze: null, isWinNode: false});

      expect(service.checkWinning("player", 3)[0].owner).toBe("player");
      expect(service.checkWinning("player", 3).length).toBe(3);
    }));
    it('angular reversed player nodes', inject([GameService, StateService], (service: GameService, state: StateService) => {
      state.resetBoard();
      service.setNodeToPlayer({x: 2, y: 0, owner: null, freeze: null, isWinNode: false});
      service.setNodeToPlayer({x: 1, y: 1, owner: null, freeze: null, isWinNode: false});
      service.setNodeToPlayer({x: 0, y: 2, owner: null, freeze: null, isWinNode: false});

      expect(service.checkWinning("player", 3)[0].owner).toBe("player");
      expect(service.checkWinning("player", 3).length).toBe
    }));
  });
  it('should step for computer', inject([GameService], (service: GameService) => {
    // service.getComputerStep()
  }));
});
