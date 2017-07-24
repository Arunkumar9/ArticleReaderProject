import { Component,OnInit } from '@angular/core';

import { AppConstants }     from '../../../assets/app.constants';
import { AppStringConstants } from '../../../assets/app.Stringconstants';

@Component({
    selector : 'app-administration',
    templateUrl : './app.administration.html',
    styleUrls : ['./app.administration.css']
})

export class AppAdministration implements OnInit{
    tabHeaderText: string;
    tabId: string;
    articleData: string;

    constructor() {
    }

    ngOnInit(){
        //this.articleTreeService.getSwitchViews()
                          //.subscribe(switchViews => this.switchViews = switchViews, error =>  this.errorMessage = <any>error);
    }
}