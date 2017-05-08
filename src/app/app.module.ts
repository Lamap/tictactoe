import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { GameService } from "./services/game.service";
import { StateService } from "./services/state.service";
import { BoardNodeComponent } from "./components/board-node/board-node.component";
import { BoardComponent } from './components/board/board.component';
import { StartStageComponent } from './components/start-stage/start-stage.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardNodeComponent,
    BoardComponent,
    StartStageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [GameService, StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
