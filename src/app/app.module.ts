import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {GameService} from "./services/game.service";
import {StateService} from "./services/state.service";
import {BoardNodeComponent} from "./components/board-node/board-node.component";
import { BoardComponent } from './components/board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardNodeComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [GameService, StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
