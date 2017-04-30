import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuide{
	static isLoggedIn;

	constructor() {
		console.log("Auth Guide")
		//AuthGuide.isLoggedIn = false;
	}

	login() {
		AuthGuide.isLoggedIn = true;
	}

	logout() {
		AuthGuide.isLoggedIn = false;
	}

	isLogged() {
		return AuthGuide.isLoggedIn;
	}
}
