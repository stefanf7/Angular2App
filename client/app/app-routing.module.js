"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var signup_component_1 = require("./components/signup/signup.component");
var login_component_1 = require("./components/login/login.component");
var auth_guard_1 = require("./components/auth/auth.guard");
var auth_guide_1 = require("./components/auth/auth.guide");
var home_component_1 = require("./components/home/home.component");
var players_component_1 = require("./components/menu/players.component");
var gameweek_component_1 = require("./components/menu/next_gameweek/gameweek.component");
var team_component_1 = require("./components/menu/choose_team/team.component");
var points_component_1 = require("./components/menu/my_points/points.component");
var appRoutes = [
    {
        path: 'api/signup',
        component: signup_component_1.SignupComponent
    },
    {
        path: 'api/home',
        component: home_component_1.HomeComponent
    },
    {
        path: 'api/gallery',
        component: players_component_1.PlayersComponent
    },
    {
        path: 'api/next_gameweek',
        component: gameweek_component_1.GameweekComponent
    },
    {
        path: 'api/choose_team',
        component: team_component_1.TeamComponent
    },
    {
        path: 'api/points',
        component: points_component_1.PointsComponent
    },
    {
        path: 'api/about',
        component: signup_component_1.SignupComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'api/contact',
        component: signup_component_1.SignupComponent
    },
    {
        path: '**',
        component: login_component_1.LoginComponent
    },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot(appRoutes, { useHash: true } //pune # in cadrul link ului
            )
        ],
        exports: [
            router_1.RouterModule
        ],
        providers: [
            auth_guard_1.AuthGuard, auth_guide_1.AuthGuide
        ]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=app-routing.module.js.map