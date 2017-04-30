"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FilterPlayerPipe = (function () {
    function FilterPlayerPipe() {
    }
    FilterPlayerPipe.prototype.transform = function (players, name, second_name, goals, value, position) {
        if (players == undefined) {
            console.log("null :(");
            return null;
        }
        console.log("players= " + position);
        return players.filter(function (player) {
            // filter by name
            if (player.first_name.toLowerCase().indexOf(name.toLowerCase()) === -1)
                return false;
            //filter by second name
            if (player.second_name.toLowerCase().indexOf(second_name.toLowerCase()) === -1)
                return false;
            // filter by goals
            if (player.goals_scored < goals)
                return false;
            // filter by value
            if (value && player.now_cost > value)
                return false;
            if (position != 0 && player.element_type != position)
                return false;
            return true;
        });
    };
    return FilterPlayerPipe;
}());
FilterPlayerPipe = __decorate([
    core_1.Pipe({
        name: 'filterByName',
        pure: true
    }),
    core_1.Injectable()
], FilterPlayerPipe);
exports.FilterPlayerPipe = FilterPlayerPipe;
var FilterByValuePipe = (function () {
    function FilterByValuePipe() {
    }
    FilterByValuePipe.prototype.transform = function (players, value) {
        if (players == undefined) {
            console.log("null :(");
            return null;
        }
        console.log("players= " + name);
        return players.filter(function (player) { return player.now_costs > value; });
    };
    return FilterByValuePipe;
}());
FilterByValuePipe = __decorate([
    core_1.Pipe({
        name: 'filterByValue',
        pure: false
    }),
    core_1.Injectable()
], FilterByValuePipe);
exports.FilterByValuePipe = FilterByValuePipe;
//# sourceMappingURL=filterPlayerPipe.js.map