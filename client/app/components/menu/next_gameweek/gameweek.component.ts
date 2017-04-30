import { Component } from '@angular/core';
import {TaskService} from '../../../services/task.service';
import { Router }            from '@angular/router';
import {AuthGuide} from '../../auth/auth.guide';
import {Http, Headers} from '@angular/http';
import {PlayersComponent} from '../players.component'
import {Team} from "../../../../Team";
@Component({
	moduleId: module.id,
	selector: 'gameweek',
	templateUrl: 'gameweek.component.html'
})


export class GameweekComponent { 
	players;
	teams;
	callback = 0;
	teamsName: Team[];
	constructor(private taskService: TaskService, private http: Http) {
		this.teamsName = [];
		this.getPlayers();
		this.getTeams();

	}
	
	callbackPlayers() {
		console.log(this.players)
		//this.addPlayers()  //am apelat metoda cand am vrut sa adaug jucatorii in bd
		this.callback++;
		console.log(this.callback + ' callbackPlayers')
		if (this.callback == 2)
			this.findTeamNames()
	}

	callbackTeams() {
		//this.addTeams(); am apelat metoda cand am vrut sa echipe jucatorii in bd
		this.callback++;
		console.log(this.callback + ' callbackTeams')
		if (this.callback == 2)
			this.findTeamNames()
	}

	findTeamNames() {
		console.log(this.teams)
		var indexes = []
		for(let i = 0; i < this.teams.length; i++)
		{
			//let idFirst = this.teams[i].id;
			if (!indexes.find(x => x == i))
			{
				let nameFirst = this.teams[i].name;
				let idSecond = this.teams[i].next_event_fixture[0].opponent;
				let isHome = this.teams[i].next_event_fixture[0].is_home;
				//console.log(idFirst + ' ' + nameFirst + ' ' + idSecond + ' ' + isHome)
				let nameSecond = this.teams[idSecond - 1].name;
				indexes.push(idSecond - 1);
				var team = {
					homeTeam: nameFirst,
					awayTeam: nameSecond
				};
				if (!isHome) {
					team.homeTeam = nameSecond;
					team.awayTeam = nameFirst;
				}
				this.teamsName.push(team);
			}
		}
		console.log(this.teamsName)
		console.log(indexes)
	}

	//
	getPlayers() {
			this.http.get('https://fantasy.premierleague.com/drf/bootstrap-static')
			.map(res => res.json())
			.subscribe(
				players => this.players = players.elements,
				(err) => console.log(err),
				() => this.callbackPlayers())
	}

	getTeams() {
		this.http.get('https://fantasy.premierleague.com/drf/teams')
		.map(res => res.json())
		.subscribe(
			teams =>{ this.teams = teams;
			console.log(this.teams.length)},

			(err) => console.log(err),
			() => this.callbackTeams())
	}

	
}