import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from './components/signup/signup.component'
import {LoginComponent} from './components/login/login.component'
import {AuthGuard} from './components/auth/auth.guard';
import {AuthGuide} from './components/auth/auth.guide';
import {HomeComponent} from './components/home/home.component';
import {PlayersComponent} from './components/menu/players.component';
import {GameweekComponent} from './components/menu/next_gameweek/gameweek.component';
import {TeamComponent} from './components/menu/choose_team/team.component';
import {PointsComponent} from './components/menu/my_points/points.component';
const appRoutes: Routes = [
  {
    path: 'api/signup',
    component: SignupComponent
  },
  { 
    path: 'api/home', 
    component: HomeComponent

  },
  {
    path: 'api/gallery',
    component: PlayersComponent
  },
  {
    path: 'api/next_gameweek',
    component: GameweekComponent
  },
  {
    path: 'api/choose_team',
    component: TeamComponent
  },
  {
    path: 'api/points',
    component: PointsComponent
  },
  {
    path: 'api/about',
    component: SignupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'api/contact',
    component: SignupComponent
  },  
  { 
    path: '**', 
    component: LoginComponent 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes, { useHash: true } //pune # in cadrul link ului
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard, AuthGuide
  ]
})
export class AppRoutingModule { 
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/