import { Component } from '@angular/core';
import {TaskService} from '../../services/task.service';
import { Router }            from '@angular/router';
//import {AuthGuard} from '../auth/auth.guard'
//(submit)="login(username.value, password.value)"
@Component({
	moduleId: module.id,
	selector: 'signup',
	templateUrl: 'signup.component.html'
	//providers: [AuthGuard]
})

export class SignupComponent { 
	errorMsg: string;
	constructor(private taskService: TaskService, private router: Router) {
		console.log('SignupComponent Initialized...')
		/*this.taskService.getTasks()
			.subscribe(tasks => {
			})*/

	}

	signup(first_name, last_name, email, password) {
		console.log("aici")
		event.preventDefault();
		this.taskService.signup(first_name, last_name, email, password) 
			.subscribe(data => {
				//console.log(task + ' jjj')
				if (data.status == 204)
				{
					console.log("204")
					this.errorMsg = "User already signed up"
				}
				else if (data.status == 200)
				{
					this.router.navigate(['/api/login']);
				}
			})
	}
}