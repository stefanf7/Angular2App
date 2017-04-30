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
var router_1 = require("@angular/router");
var auth_guide_1 = require("./auth.guide");
var core_1 = require("@angular/core");
var AuthGuard = (function () {
    function AuthGuard(authGuide, router) {
        this.authGuide = authGuide;
        this.router = router;
        console.log('AuthGuard Initialized...');
        if (this.authGuide.isLogged() == undefined) {
            this.authGuide.logout();
            console.log('AuthGuard Initializedasdasdas...');
        }
    }
    AuthGuard.prototype.canActivate = function () {
        // Imaginary method that is supposed to validate an auth token
        // and return a boolean
        if (!this.authGuide.isLogged()) {
            // this.router.navigate(['']);   //asta ar trebui, dar ma delogheaza mereu
            return false;
        }
        console.log(this.authGuide.isLogged() + " sdsadasd");
        return this.authGuide.isLogged();
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [auth_guide_1.AuthGuide, router_1.Router])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map