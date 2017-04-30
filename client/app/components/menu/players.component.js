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
var core_2 = require("@angular/core");
var task_service_1 = require("../../services/task.service");
var http_1 = require("@angular/http");
var PlayersComponent = (function () {
    function PlayersComponent(taskService, http) {
        this.taskService = taskService;
        this.http = http;
        this.eventNumber = 34;
        this.selectedValue = null;
        this.sortAscByGoals = false;
        this.sortAscByValue = false;
        this.positions = [
            { id: 0, name: "All" },
            { id: 1, name: "Goalkeeper" },
            { id: 2, name: "Defender" },
            { id: 3, name: "Midfielder" },
            { id: 4, name: "Forward" }
        ];
        this.myTeam = [];
        this.budget = 1000; // ar trebui doar prima oara sa fie 1000
        this.myTeamIds = [];
        this.getPlayers();
        this.getTeams();
        this.getEventByNumber(this.eventNumber);
        console.log(2);
    }
    PlayersComponent.prototype.sortByGoals = function () {
        console.log("sort by g");
        if (this.sortAscByGoals == false) {
            this.players.sort(function (a, b) {
                if (a.goals_scored < b.goals_scored)
                    return 1;
                if (a.goals_scored > b.goals_scored)
                    return -1;
                return 0;
            });
        }
        else {
            this.players.sort(function (a, b) {
                if (a.goals_scored > b.goals_scored)
                    return 1;
                if (a.goals_scored < b.goals_scored)
                    return -1;
                return 0;
            });
        }
        this.sortAscByGoals = !this.sortAscByGoals;
    };
    PlayersComponent.prototype.sortByValue = function () {
        console.log("sort by v");
        if (this.sortAscByValue == false) {
            this.players.sort(function (a, b) {
                if (a.now_cost < b.now_cost)
                    return 1;
                if (a.now_cost > b.now_cost)
                    return -1;
                return 0;
            });
        }
        else {
            this.players.sort(function (a, b) {
                if (a.now_cost > b.now_cost)
                    return 1;
                if (a.now_cost < b.now_cost)
                    return -1;
                return 0;
            });
        }
        this.sortAscByValue = !this.sortAscByValue;
    };
    PlayersComponent.prototype.addPlayerInMyTeam = function (player) {
        //daca nu exista trebuie sa il adaug
        if (this.myTeam.filter(function (p) { return p.id == player.id; }).length == 0) {
            if (player.element_type == 1) {
                if (this.myTeam.filter(function (p) { return p.element_type == player.element_type; }).length < 2) {
                    this.myTeam.push(player);
                    this.myTeamIds.push(player.id);
                    this.budget -= player.now_cost;
                    console.log(this.myTeam);
                }
                else {
                    swal({
                        text: "You can not have more than 2 goalkeepers in your squad",
                        type: "error",
                        confirmButtonText: "Back"
                    });
                }
            }
            if (player.element_type == 4) {
                if (this.myTeam.filter(function (p) { return p.element_type == player.element_type; }).length < 3) {
                    this.myTeam.push(player);
                    this.myTeamIds.push(player.id);
                    this.budget -= player.now_cost;
                    console.log(this.myTeam);
                }
                else {
                    swal({
                        text: "You can not have more than 3 forwards in your squad",
                        type: "error",
                        confirmButtonText: "Back"
                    });
                }
            }
            else if (player.element_type == 2 || player.element_type == 3) {
                if (this.myTeam.filter(function (p) { return p.element_type == player.element_type; }).length < 5) {
                    this.myTeam.push(player);
                    this.myTeamIds.push(player.id);
                    this.budget -= player.now_cost;
                    console.log(this.myTeam);
                }
                else {
                    swal({
                        text: "You can not have more than 5 defenders/midfielders in your squad",
                        type: "error",
                        confirmButtonText: "Back"
                    });
                }
            }
        }
    };
    PlayersComponent.prototype.removePlayerFromMyTeam = function (player) {
        this.myTeam = this.myTeam.filter(function (p) { return p.id != player.id; });
        this.myTeamIds = this.myTeamIds.filter(function (p) { return p != player.id; });
        this.budget += player.now_cost;
        console.log(this.myTeam);
    };
    PlayersComponent.prototype.saveSquad = function () {
        if (this.myTeam.length != 15) {
            console.log(this.myTeam.length);
            swal({
                text: "You must have 15 players in your squad",
                type: "error",
                confirmButtonText: "Back"
            });
        }
        if (this.budget < 0) {
            console.log(this.myTeam.length);
            swal({
                text: "You do not have enough budget for these players. Your budget should be 0 or greater",
                type: "error",
                confirmButtonText: "Back"
            });
        }
        //TO DO 1
        //save team in DB
    };
    PlayersComponent.prototype.callbackPlayers = function () {
        console.log(this.players);
        this.sortByGoals();
        //this.addPlayers()  //am apelat metoda cand am vrut sa adaug jucatorii in bd
    };
    PlayersComponent.prototype.callbackTeams = function () {
        //this.addTeams(); am apelat metoda cand am vrut sa echipe jucatorii in bd
    };
    PlayersComponent.prototype.callbackEvent = function () {
        //this.addEventByNumber(this.eventNumber);
    };
    PlayersComponent.prototype.addPlayers = function () {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            this.taskService.addPlayers(player)
                .subscribe(function (task) {
            });
        }
    };
    PlayersComponent.prototype.addTeams = function () {
        for (var _i = 0, _a = this.teams; _i < _a.length; _i++) {
            var team = _a[_i];
            this.taskService.addTeams(team)
                .subscribe(function (task) {
            });
        }
    };
    PlayersComponent.prototype.addEventByNumber = function (eventNumber) {
        for (var _i = 0, _a = this.event; _i < _a.length; _i++) {
            var e = _a[_i];
            this.taskService.addEvent(e)
                .subscribe(function (task) {
            });
        }
    };
    //
    PlayersComponent.prototype.getPlayers = function () {
        var _this = this;
        this.http.get('https://fantasy.premierleague.com/drf/bootstrap-static')
            .map(function (res) { return res.json(); })
            .subscribe(function (players) { return _this.players = players.elements; }, function (err) { return console.log(err); }, function () { return _this.callbackPlayers(); });
    };
    PlayersComponent.prototype.getTeams = function () {
        var _this = this;
        this.http.get('https://fantasy.premierleague.com/drf/teams')
            .map(function (res) { return res.json(); })
            .subscribe(function (teams) {
            _this.teams = teams;
            console.log(_this.teams.length);
        }, function (err) { return console.log(err); }, function () { return _this.callbackTeams(); });
    };
    PlayersComponent.prototype.getEventByNumber = function (eventNumber) {
        var _this = this;
        this.http.get('https://fantasy.premierleague.com/drf/fixtures/?event=' + eventNumber)
            .map(function (res) { return res.json(); })
            .subscribe(function (event) {
            _this.event = event;
            console.log(_this.event.length);
        }, function (err) { return console.log(err); }, function () { return _this.callbackEvent(); });
    };
    return PlayersComponent;
}());
PlayersComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'players',
        templateUrl: 'players.component.html'
    }),
    core_2.Injectable(),
    __metadata("design:paramtypes", [task_service_1.TaskService, http_1.Http])
], PlayersComponent);
exports.PlayersComponent = PlayersComponent;
//# sourceMappingURL=players.component.js.map