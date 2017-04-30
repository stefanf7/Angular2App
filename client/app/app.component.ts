import { Component } from '@angular/core';
import {TaskService} from './services/task.service'
import {AuthGuide} from './components/auth/auth.guide'
import {AuthGuard} from './components/auth/auth.guard'


@Component({
	moduleId: module.id,
	selector: 'my-app',
	templateUrl: 'app.component.html',
	providers: [TaskService, AuthGuide, AuthGuard]
})

export class AppComponent { }