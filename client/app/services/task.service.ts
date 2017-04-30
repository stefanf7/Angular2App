import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService{
	constructor(private http: Http){
		console.log('TaskService Initialized...')
	}

	login(username, password) {
		var headers = new Headers();
		headers.append("Content-Type", 'application/json');
		console.log(username + ' ' + password)
		return this.http.post('http://localhost:3000/api/login', {"username" : username, password: password}, {headers: headers})
			//.map(res => res.json())
	}

	signup(first_name, last_name, email, password) {
		var headers = new Headers();
		headers.append("Content-Type", 'application/json');
		console.log('Emailul e ' + email)
		return this.http.post('/api/signup', {"first_name" : first_name, "last_name" : last_name, "username" : email, password: password}, {headers: headers});
			}


	getTasks() {
		return this.http.get('http://localhost:3000/api/tasks')
			.map(res => res.json());
	}

	addTask(newTask) {
		var headers = new Headers();
		headers.append("Content-Type", 'application/json');
		return this.http.post('http://localhost:3000/api/task', JSON.stringify(newTask), {headers: headers})
			.map(res => res.json())
	}

	addPlayers(players) {
		var headers = new Headers();
		headers.append("Content-Type", 'application/json');
		return this.http.post('http://localhost:3000/api/add_players', JSON.stringify(players), {headers: headers})
			.map(res => res.json())
	}

	addTeams(teams) {
		var headers = new Headers();
		headers.append("Content-Type", 'application/json');
		return this.http.post('http://localhost:3000/api/add_teams', JSON.stringify(teams), {headers: headers})
			.map(res => res.json())
	}

	addEvent(event) {
		var headers = new Headers();
		headers.append("Content-Type", 'application/json');
		return this.http.post('http://localhost:3000/api/add_event', JSON.stringify(event), {headers: headers})
			.map(res => res.json())
	}

	deleteTask(id) {
		return this.http.delete('/api/task/' + id)
			.map(res => res.json())
	}

	updateStatus(task) {
		var headers = new Headers();
		headers.append("Content-Type", 'application/json');
		return this.http.put('/api/task/'+task._id, JSON.stringify(task), {headers: headers})
			.map(res => res.json())
	}
}