import { CanActivate, Router } from '@angular/router';
import {AuthGuide} from './auth.guide';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

	
	constructor(private authGuide: AuthGuide, private router: Router) {
		console.log('AuthGuard Initialized...')
		if (this.authGuide.isLogged() == undefined)
		{
			this.authGuide.logout();
			console.log('AuthGuard Initializedasdasdas...')
		}
	}	

	canActivate() {
	// Imaginary method that is supposed to validate an auth token
	// and return a boolean
	
		if (!this.authGuide.isLogged()) {
		 // this.router.navigate(['']);   //asta ar trebui, dar ma delogheaza mereu
		  return false;
		}
		console.log(this.authGuide.isLogged() + " sdsadasd")
		return this.authGuide.isLogged();
	}

}