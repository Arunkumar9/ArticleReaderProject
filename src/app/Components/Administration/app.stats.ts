import { Component,OnInit } from '@angular/core';
import { AppConstants }     from '../../../assets/app.constants';
import { AppStringConstants } from '../../../assets/app.Stringconstants';

import { ArticleStatsService } from '../../Services/ArticleTree/articlestats.service';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector : 'app-articlestatus',
    templateUrl : './app.stats.html',
    styleUrls : ['./app.stats.css']
})

export class AppArticleStatus implements OnInit{
    articlePieStats:Array<any>;
    data: any;
    finalData:any;
    constructor(private articleStatsService: ArticleStatsService,
                private route: ActivatedRoute,
                private location: Location) {
       
    }

    ngOnInit(){
        this.articleStatsService.getArticlePieStats()
                               .subscribe(articles=>{
                                                this.articlePieStats = articles;
                                                this.parepareDataforPie();
                                         });
    }

    parepareDataforPie(){
        this.data = {};
        this.data.labels = [];
        var pieData = this.articlePieStats as any;
        
        for(var i=0;i<pieData.legends.length;i++){
            var legend = pieData.legends[i];
            if(legend != null){
                this.data.labels.push(legend.name);
            }
        }

        this.data.datasets = [];
        for(var j=0;j<pieData.datasets.length;j++){
            var dataset = pieData.datasets[j];
            if(dataset != null){
                this.data.datasets.push(dataset);
            }
        }

        this.finalData = this.data;
    }

}