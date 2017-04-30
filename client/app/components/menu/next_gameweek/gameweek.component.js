"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var task_service_1 = require("../../../services/task.service");
var http_1 = require("@angular/http");
var GameweekComponent = (function () {
    function GameweekComponent(taskService, http) {
        this.taskService = taskService;
        this.http = http;
        this.callback = 0;
        this.teamsName = [];
        this.getPlayers();
        this.getTeams();
    }
    GameweekComponent.prototype.callbackPlayers = function () {
        console.log(this.players);
        //this.addPlayers()  //am apelat metoda cand am vrut sa adaug jucatorii in bd
        this.callback++;
        console.log(this.callback + ' callbackPlayers');
        if (this.callback == 2)
            this.findTeamNames();
    };
    GameweekComponent.prototype.callbackTeams = function () {
        //this.addTeams(); am apelat metoda cand am vrut sa echipe jucatorii in bd
        this.callback++;
        console.log(this.callback + ' callbackTeams');
        if (this.callback == 2)
            this.findTeamNames();
    };
    GameweekComponent.prototype.findTeamNames = function () {
        console.log(this.teams);
        var indexes = [];
        var _loop_1 = function (i) {
            //let idFirst = this.teams[i].id;
            if (!indexes.find(function (x) { return x == i; })) {
                var nameFirst = this_1.teams[i].name;
                var idSecond = this_1.teams[i].next_event_fixture[0].opponent;
                var isHome = this_1.teams[i].next_event_fixture[0].is_home;
                //console.log(idFirst + ' ' + nameFirst + ' ' + idSecond + ' ' + isHome)
                var nameSecond = this_1.teams[idSecond - 1].name;
                indexes.push(idSecond - 1);
                team = {
                    homeTeam: nameFirst,
                    awayTeam: nameSecond
                };
                if (!isHome) {
                    team.homeTeam = nameSecond;
                    team.awayTeam = nameFirst;
                }
                this_1.teamsName.push(team);
            }
        };
        var this_1 = this, team;
        for (var i = 0; i < this.teams.length; i++) {
            _loop_1(i);
        }
        console.log(this.teamsName);
        console.log(indexes);
    };
    //
    GameweekComponent.prototype.getPlayers = function () {
        var _this = this;
        this.http.get('https://fantasy.premierleague.com/drf/bootstrap-static')
            .map(function (res) { return res.json(); })
            .subscribe(function (players) { return _this.players = players.elements; }, function (err) { return console.log(err); }, function () { return _this.callbackPlayers(); });
    };
    GameweekComponent.prototype.getTeams = function () {
        var _this = this;
        this.http.get('https://fantasy.premierleague.com/drf/teams')
            .map(function (res) { return res.json(); })
            .subscribe(function (teams) {
            _this.teams = teams;
            console.log(_this.teams.length);
        }, function (err) { return console.log(err); }, function () { return _this.callbackTeams(); });
    };
    return GameweekComponent;
}());
GameweekComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'gameweek',
        templateUrl: 'gameweek.component.html'
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService, http_1.Http])
], GameweekComponent);
exports.GameweekComponent = GameweekComponent;
//# sourceMappingURL=gameweek.component.js.map