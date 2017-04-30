import { Component } from '@angular/core';
import {Injectable} from '@angular/core';
import {TaskService} from '../../services/task.service';
import { Router }            from '@angular/router';
import {AuthGuide} from '../auth/auth.guide';
import {Http, Headers} from '@angular/http';
import {Player} from "../../../Player";
import {FilterPlayerPipe} from '../../pipes/filterPlayerPipe'
declare var swal: any;
@Component({
	moduleId: module.id,
	selector: 'players',
	templateUrl: 'players.component.html'
})

@Injectable()
export class PlayersComponent 
{ 
	players: Player[];
	teams;
	event;
	eventNumber = 34;
	selectedValue = null;
	sortAscByGoals= false;
	sortAscByValue = false;
	myTeam;
	myTeamIds;
	budget;
	positions = [
		{id: 0, name: "All"},
		{id: 1, name: "Goalkeeper"},
		{id: 2, name: "Defender"},
		{id: 3, name: "Midfielder"},
		{id: 4, name: "Forward"}
     ];

	constructor(private taskService: TaskService, private http: Http) {
		this.myTeam = [];
		this.budget = 1000; // ar trebui doar prima oara sa fie 1000
		this.myTeamIds = [];
		this.getPlayers();
		this.getTeams();
		this.getEventByNumber(this.eventNumber);
		console.log(2)
	}

	sortByGoals() {
		console.log("sort by g")
		if (this.sortAscByGoals == false)
		{
			this.players.sort(function(a, b){
			    if ( a.goals_scored < b.goals_scored )
			        return 1;
			    if ( a.goals_scored > b.goals_scored )
			        return -1;
			    return 0;
			});
		} else {
			this.players.sort(function(a, b){
			    if ( a.goals_scored > b.goals_scored )
			        return 1;
			    if ( a.goals_scored < b.goals_scored )
			        return -1;
			    return 0;
			});
		}
		this.sortAscByGoals = !this.sortAscByGoals;
	}

	sortByValue() {
		console.log("sort by v")
		if (this.sortAscByValue == false)
		{
			this.players.sort(function(a, b){
			    if ( a.now_cost < b.now_cost )
			        return 1;
			    if ( a.now_cost > b.now_cost )
			        return -1;
			    return 0;
			});
		} else {
			this.players.sort(function(a, b){
			    if ( a.now_cost > b.now_cost )
			        return 1;
			    if ( a.now_cost < b.now_cost )
			        return -1;
			    return 0;
			});
		}
		this.sortAscByValue = !this.sortAscByValue;

	}

	addPlayerInMyTeam(player) {
		//daca nu exista trebuie sa il adaug
		if (this.myTeam.filter(p => p.id == player.id).length == 0)
		{
			if (player.element_type == 1) {
				if (this.myTeam.filter(p => p.element_type == player.element_type).length < 2)
				{
					this.myTeam.push(player);
					this.myTeamIds.push(player.id)
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
				if (this.myTeam.filter(p => p.element_type == player.element_type).length < 3)
				{
					this.myTeam.push(player);
					this.myTeamIds.push(player.id);
					this.budget -= player.now_cost;
					console.log(this.myTeam);
				} else {
					swal({
					  text: "You can not have more than 3 forwards in your squad",
					  type: "error",
					  confirmButtonText: "Back"
					});
				}
			}
			else if (player.element_type == 2 || player.element_type == 3)
			{
				if (this.myTeam.filter(p => p.element_type == player.element_type).length < 5)
				{
					this.myTeam.push(player);
					this.myTeamIds.push(player.id);
					this.budget -= player.now_cost;
					console.log(this.myTeam);
				} else {
					swal({
					  text: "You can not have more than 5 defenders/midfielders in your squad",
					  type: "error",
					  confirmButtonText: "Back"
					});
				}

			}
		}
	}

	removePlayerFromMyTeam(player) {
		this.myTeam = this.myTeam.filter(p => p.id != player.id);
		this.myTeamIds = this.myTeamIds.filter(p => p != player.id)
		this.budget += player.now_cost;
		console.log(this.myTeam)
	}

	saveSquad() {
		if (this.myTeam.length != 15)
		{
			console.log(this.myTeam.length)
			swal({
			  text: "You must have 15 players in your squad",
			  type: "error",
			  confirmButtonText: "Back"
			});
		}

		if (this.budget < 0)
		{
			console.log(this.myTeam.length)
			swal({
			  text: "You do not have enough budget for these players. Your budget should be 0 or greater",
			  type: "error",
			  confirmButtonText: "Back"
			});
		}

		//TO DO 1
		//save team in DB
	}

    callbackPlayers() {
		console.log(this.players)
		this.sortByGoals();
		//this.addPlayers()  //am apelat metoda cand am vrut sa adaug jucatorii in bd

	}

	callbackTeams() {
		//this.addTeams(); am apelat metoda cand am vrut sa echipe jucatorii in bd
	}

	callbackEvent() {
		//this.addEventByNumber(this.eventNumber);
	}

	addPlayers() {
		for(let player of this.players)
		{
			this.taskService.addPlayers(player) 
				.subscribe(task => {
			})
		}
		
	}

	addTeams() {
		for(let team of this.teams)
		{
			this.taskService.addTeams(team) 
				.subscribe(task => {
			})
		}
	}

	addEventByNumber(eventNumber) {
		for(let e of this.event)
		{
			this.taskService.addEvent(e) 
				.subscribe(task => {
			})
		}
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


	getEventByNumber(eventNumber) {
		this.http.get('https://fantasy.premierleague.com/drf/fixtures/?event=' + eventNumber)
		.map(res => res.json())
		.subscribe(
			event =>{ this.event = event;
			console.log(this.event.length)},

			(err) => console.log(err),
			() => this.callbackEvent())
	}
}