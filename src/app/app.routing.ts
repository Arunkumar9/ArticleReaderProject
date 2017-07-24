import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { AppArticleDashBoard } from './Components/ArticleDashboard/app.articledashboard';
import { AppArticleStatus } from './Components/Administration/app.stats';

const appRoutes: Routes = [
	{
		path:'articleDashboard/:id',
		component: AppArticleDashBoard
	},{
		path:'articleStatistics/:id',
		component: AppArticleStatus
	},{
		path:'',
		redirectTo: '',
		pathMatch: 'full'
	}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);