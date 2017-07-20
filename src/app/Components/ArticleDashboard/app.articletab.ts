import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { AppConstants }     from '../../../assets/app.constants';
import { AppStringConstants } from '../../../assets/app.Stringconstants';

import { ArticleTabService } from '../../Services/ArticleTree/articletab.service';



@Component({
    selector : 'app-articletab',
    templateUrl : './app.articletab.html',
    styleUrls : ['./app.articletab.css']
})

export class AppArticleTab implements OnInit{
    tabHeaderText: string;
    tabId: string;
    articleData: string;

    public angular2TabsExample:Array<any> = [
 
        {title: 'Angular Tab 1', content: 'Angular 2 Tabs are navigable windows, each window (called tab) contains content', disabled: false, removable: true},
        
        {title: 'Angular Tab 2', content: 'generally we categorize contents depending on the theme', disabled: false, removable: true},
        
        {title: 'Angular Tab (disabled) X', content: 'Angular 2 Tabs Content', disabled: true, removable: true}
        
    ];

    constructor(private articleTabService: ArticleTabService,
                private route: ActivatedRoute,
                private location: Location) {
            
    }

    ngOnInit(){
        debugger;
        //this.articleTreeService.getSwitchViews()
                          //.subscribe(switchViews => this.switchViews = switchViews, error =>  this.errorMessage = <any>error);
    }
}