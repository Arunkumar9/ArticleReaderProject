import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { AppArticleTabView } from './Components/Articles/app.articletabview';
import { AppArticleDashBoard } from './Components/ArticleDashboard/app.articledashboard';

const appRoutes: Routes = [
	{
		path:'articleDetails/:id',
		component: AppArticleTabView
	},{
		path:'articleDashboard/:id',
		component: AppArticleDashBoard
	},{
		path:'',
		redirectTo: '',
		pathMatch: 'full'
	}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);