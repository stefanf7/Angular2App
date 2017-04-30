import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByName',
    pure: true
})
@Injectable()
export class FilterPlayerPipe implements PipeTransform {
    transform(players: any, name:any, second_name:any, goals: number,
     value: number, position: number): any {
    	if (players == undefined)
    	{
    		console.log("null :(")
    		return null;
    	}
    	console.log("players= " + position)

        return players.filter(player => {
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
        })
    }
}

@Pipe({
    name: 'filterByValue',
    pure: false
})
@Injectable()
export class FilterByValuePipe implements PipeTransform {
    transform(players: any, value:any): any {
    	if (players == undefined)
    	{
    		console.log("null :(")
    		return null;
    	}
    	console.log("players= " + name)
        return players.filter(player => player.now_costs > value)
    }
}