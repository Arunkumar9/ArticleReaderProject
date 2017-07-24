import { Component,OnInit } from '@angular/core';

import { AppConstants }     from '../../../assets/app.constants';
import { AppStringConstants } from '../../../assets/app.Stringconstants';

import { Router } from '@angular/router';

@Component({
    selector : 'app-administration',
    templateUrl : './app.administration.html',
    styleUrls : ['./app.administration.css']
})

export class AppAdministration implements OnInit{
    tabHeaderText: string;
    tabId: string;
    articleData: string;

    constructor(private router:Router) {
    }

    ngOnInit(){
        //this.articleTreeService.getSwitchViews()
                          //.subscribe(switchViews => this.switchViews = switchViews, error =>  this.errorMessage = <any>error);
    }

    onStutusClick(event){
        let link = ['/articleStatistics','ArticleStates'];
        this.router.navigate(link);
    }
}