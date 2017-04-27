import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {GetStateService} from "./services/get-state.service";
import {BoardNodeComponent} from "./components/board-node/board-node.component";

@NgModule({
  declarations: [
    AppComponent,
    BoardNodeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [GetStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
