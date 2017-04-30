import { Component } from '@angular/core';
import {TaskService} from '../../services/task.service';
import { Router }            from '@angular/router';
import {AuthGuide} from '../auth/auth.guide';
//(submit)="login(username.value, password.value)"
@Component({
	moduleId: module.id,
	selector: 'login',
	templateUrl: 'login.component.html'
})

export class LoginComponent { 
	errorMsg: string;

	constructor(private taskService: TaskService,  private router: Router,
		public authGuide: AuthGuide) {
		console.log('LoginComponent Initialized...')
		this.authGuide.logout();
		this.taskService.getTasks()
			.subscribe(tasks => {
			})

	}


	login(username, password) {
		console.log("aici")
		event.preventDefault();
		var success = this.taskService.login(username, password) 
			.subscribe(data => {
				if(data.status == 200)
				{
					
					this.router.navigate(['/api/home']);
					this.authGuide.login();
					console.log(this.authGuide.isLogged() + ' login ')
				}
				else 
				{
					this.errorMsg = "Failed To Login. Incorrect User or Password"
					this.authGuide.logout();
					console.log(this.authGuide.isLogged() +'logout')
				}
				//console.log(task + ' jjj')
			});

		console.log("success");
		//
	}

	//console.log(loginRes + ' login')
	/*signup() {
		//this.router.navigate(['../signup/signup.component.html'])
		//window.location.href = "/login.component.html" //"
		//templateUrl = "../signup/signup.component.html"
	}*/
}