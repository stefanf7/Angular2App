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
var task_service_1 = require("../../services/task.service");
var router_1 = require("@angular/router");
var auth_guide_1 = require("../auth/auth.guide");
//(submit)="login(username.value, password.value)"
var LoginComponent = (function () {
    function LoginComponent(taskService, router, authGuide) {
        this.taskService = taskService;
        this.router = router;
        this.authGuide = authGuide;
        console.log('LoginComponent Initialized...');
        this.authGuide.logout();
        this.taskService.getTasks()
            .subscribe(function (tasks) {
        });
    }
    LoginComponent.prototype.login = function (username, password) {
        var _this = this;
        console.log("aici");
        event.preventDefault();
        var success = this.taskService.login(username, password)
            .subscribe(function (data) {
            if (data.status == 200) {
                _this.router.navigate(['/api/home']);
                _this.authGuide.login();
                console.log(_this.authGuide.isLogged() + ' login ');
            }
            else {
                _this.errorMsg = "Failed To Login. Incorrect User or Password";
                _this.authGuide.logout();
                console.log(_this.authGuide.isLogged() + 'logout');
            }
            //console.log(task + ' jjj')
        });
        console.log("success");
        //
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'login',
        templateUrl: 'login.component.html'
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService, router_1.Router,
        auth_guide_1.AuthGuide])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map