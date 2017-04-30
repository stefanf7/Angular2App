import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {LoginComponent} from './components/login/login.component'
import {SignupComponent} from './components/signup/signup.component'
import { AppRoutingModule }        from './app-routing.module';
import {HomeComponent} from './components/home/home.component';
import {PlayersComponent} from './components/menu/players.component'
import {FilterPlayerPipe} from './pipes/filterPlayerPipe'
import {GameweekComponent} from './components/menu/next_gameweek/gameweek.component'
import {TeamComponent} from './components/menu/choose_team/team.component'
import {PointsComponent} from './components/menu/my_points/points.component';
//import {HashLocationStrategy, LocationStrategy} from '@angular/common';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, AppRoutingModule],
  declarations: [AppComponent, TasksComponent, LoginComponent, 
  	SignupComponent, HomeComponent, PlayersComponent, FilterPlayerPipe,
  	GameweekComponent, TeamComponent, PointsComponent],
  bootstrap: [AppComponent]//,
 // providers: [{provide: APP_BASE_HREF, useValue: ''}]
 // providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppModule { }