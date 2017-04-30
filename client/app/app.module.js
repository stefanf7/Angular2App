"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var tasks_component_1 = require("./components/tasks/tasks.component");
var login_component_1 = require("./components/login/login.component");
var signup_component_1 = require("./components/signup/signup.component");
var app_routing_module_1 = require("./app-routing.module");
var home_component_1 = require("./components/home/home.component");
var players_component_1 = require("./components/menu/players.component");
var filterPlayerPipe_1 = require("./pipes/filterPlayerPipe");
var gameweek_component_1 = require("./components/menu/next_gameweek/gameweek.component");
var team_component_1 = require("./components/menu/choose_team/team.component");
var points_component_1 = require("./components/menu/my_points/points.component");
//import {HashLocationStrategy, LocationStrategy} from '@angular/common';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, app_routing_module_1.AppRoutingModule],
        declarations: [app_component_1.AppComponent, tasks_component_1.TasksComponent, login_component_1.LoginComponent,
            signup_component_1.SignupComponent, home_component_1.HomeComponent, players_component_1.PlayersComponent, filterPlayerPipe_1.FilterPlayerPipe,
            gameweek_component_1.GameweekComponent, team_component_1.TeamComponent, points_component_1.PointsComponent],
        bootstrap: [app_component_1.AppComponent] //,
        // providers: [{provide: APP_BASE_HREF, useValue: ''}]
        // providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map