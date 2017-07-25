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
    categoryPieStats:Array<any>;
    data: any;
    categoryData:any;

    articleColumnStats:Array<any>;
    articleData:any;
    articlebarData:any;
    constructor(private articleStatsService: ArticleStatsService,
                private route: ActivatedRoute,
                private location: Location) {
       
    }

    ngOnInit(){
        this.articleStatsService.getArticlePieStats()
                               .subscribe(articles=>{
                                                this.categoryPieStats = articles;
                                                this.parepareDataforPie();
                                         });
        
        this.articleStatsService.getArticleColumnStats()
                               .subscribe(articles=>{
                                                this.articleColumnStats = articles;
                                         });
    }

    parepareDataforPie(){
        this.data = {};
        this.data.labels = [];
        var pieData = this.categoryPieStats as any;
        
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

        this.categoryData = this.data;
    }

    onPieClick(event:any){
        debugger;
        var id = event.element._view.label;

        this.articleData = {};
        this.articleData.labels = [];
        this.articleData.datasets = [];
        var columnDataset = this.articleColumnStats as any;
        var columnChartData = new Array();
        var articleHitCountData = new Array();
        var backgroundColorVal = "";
        var borderColorVal = "";
        for(var k=0;k<columnDataset.length;k++){
            var lengends = columnDataset[k];
            if(lengends.id == id){
                columnChartData = lengends.children;
                backgroundColorVal = lengends.backgroundColor;
                borderColorVal     = lengends.borderColor;
            }
        }

        if(columnChartData.length > 0){
           
            for(var l=0;l<columnChartData.length;l++){
                var columnRec = columnChartData[l];
                this.articleData.labels.push(columnRec.label);
                articleHitCountData.push(columnRec.hitCount);
            }

            this.articleData.datasets.push({label:id,backgroundColor:backgroundColorVal,borderColor:borderColorVal,data:articleHitCountData});
        }

        this.articlebarData   = this.articleData;
    }

}