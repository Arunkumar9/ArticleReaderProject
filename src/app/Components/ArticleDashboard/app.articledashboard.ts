/**
 * This component will show a list of Article which are availble now for the review
 */

import { Component,OnInit } from '@angular/core';
import { AppConstants }     from '../../../assets/app.constants';
import { AppStringConstants } from '../../../assets/app.Stringconstants';

import { ArticleTreeService } from '../../Services/ArticleTree/articletree.service';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { SelectItem } from 'primeng/primeng';
import {TreeModule,TreeNode} from 'primeng/primeng';

import { ArticlesModel } from '../../Models/Articles/articles';

import { AppArticleTab } from './app.articletab';

@Component({
    selector : 'app-articledashboard',
    templateUrl : './app.articledashboard.html',
    styleUrls : ['./app.articledashboard.css']
})

export class AppArticleDashBoard implements OnInit{
    treeValues:TreeNode[];
    articleHeaderText: string;
    childArticleHeaderText: string;
    articleData: string;
    articleDetails:ArticlesModel[];
    errorMessage: string;
    switchViewText = AppStringConstants.SwitchView;
    switchViews: SelectItem[];
    selectedDataModel:string;
    numLimit:Number;
    readMore:string;
    linkparams:any;
    dashboardSelected:boolean = true;
    showArticleInfoTab:boolean = false;
    index:number = 0;

    public articleTabArray: Array<any> = [];
    
    constructor(private articleTreeService: ArticleTreeService,
                private route: ActivatedRoute,
                private location: Location) {
        this.selectedDataModel = AppConstants.ThumbnailView;
        this.numLimit = AppConstants.ReadMoreMinLength;
        this.readMore = AppConstants.ReadMoreText;
    }

    ngOnInit(){
        //This will get the Swtich View details
        this.getSwithViewData();

        //With JSON file data will be received
        this.treeValues =  this.articleTreeService.getArticleTreeValues();

        //According to the Id given this call will route the window to that value.
        if(this.treeValues != null && this.treeValues != undefined){
            this.route.params.forEach((params:Params) => this.findDashboardContent(params));
        }else{
            this.articleTreeService.getArticleTree()
                               .subscribe(articles=>{
                                                this.treeValues = articles;
                                                
                                                this.requestArticleDashboardDetails()
                                         });
        }
    }

    getSwithViewData() {
        this.articleTreeService.getSwitchViews()
                          .subscribe(switchViews => this.switchViews = switchViews, error =>  this.errorMessage = <any>error);
    }

    requestArticleDashboardDetails(){
        if(this.treeValues != null && this.treeValues != undefined){
            this.route.params.forEach((params:Params) => this.findDashboardContent(params));

        }
    }

    findDashboardContent(parentID){
        let id = parentID['id'];
        var treeNodes = this.treeValues[0] as any;
        if(treeNodes.id == id){
            this.articleHeaderText = treeNodes.label;
            var articleItemArray = new Array();
            articleItemArray = this.prepareDataforArticleLaunch(treeNodes,articleItemArray);   
            this.articleDetails =  articleItemArray as ArticlesModel[];
            this.index = 0;                         
        }else{
            this.findArticleHeader(treeNodes,id);
        }
    }

    findArticleHeader(parentNode,id){
        var childNodes = parentNode.children;
        for(var i=0;i<childNodes.length;i++){
            var childItem = childNodes[i];
            if(childItem.id == id){
                if(childItem.leaf == true){
                    
                    //Load The parent info on the DashBoard
                    this.articleHeaderText = parentNode.label;
                    var articleItemArray = new Array();
                    articleItemArray = this.prepareDataforArticleLaunch(parentNode,articleItemArray);   
                    this.articleDetails =  articleItemArray as ArticlesModel[];

                    //Load Leaf node related info here.
                    this.showArticleInfoTab = true;
                    this.childArticleHeaderText = childItem.label;

                    this.articleTreeService.getLeafInfo(childItem.id)
                        .subscribe(
                            (response:any)=> {
                                //this.articleData = articleData;
                                //this.index = 1;
                                var url = response.url;
                                var id = url.split('?')[1];
                                var articleData = response._body;
                                for(var i=0;i<this.articleTabArray.length;i++){
                                    var rec = this.articleTabArray[i];
                                    rec.selected = false;
                                }
                                //this.dashboardSelected = false;

                                this.articleTabArray.push({'title':this.childArticleHeaderText,'id':id,'articleData':articleData,'selected':true});
                                
                                //this.index = this.articleTabArray.length;
                            },
                            error =>  this.errorMessage = <any>error
                        );
                }else{
                    this.articleHeaderText = childItem.label;
                    var articleItemArray = new Array();
                    articleItemArray = this.prepareDataforArticleLaunch(childItem,articleItemArray);
                    this.articleDetails =  articleItemArray as ArticlesModel[];  
                    this.index = 0; 
                    break;
                }                
            }else{
                if(childItem.children != null && childItem.children != undefined){
                    if(childItem.children.length > 0){
                        this.findArticleHeader(childItem,id);
                    }                    
                }                
            }
        }
    }

    prepareDataforArticleLaunch(childNodes,articleItemArray){
        let childItems = childNodes.children;
        
        for(var j=0;j<childItems.length;j++){
            var childItem = childItems[j];
            if(childItem.leaf == 'true' || childItem.leaf == true){
                articleItemArray.push({'label':childItem.label,'id':childItem.id,'author':childItem.author,'publishedon':childItem.publishedon,'summary':childItem.summary});
            }else{
                this.prepareDataforArticleLaunch(childItem,articleItemArray);
            }            
        }
        return articleItemArray;
       // this.articleDetails =  articleItemArray as ArticlesModel[];
    }

    onReadMore($scope){
        if(this.numLimit === AppConstants.ReadMoreMinLength){
            this.numLimit = AppConstants.ReadMoreMaxLength;
            this.readMore = AppConstants.ReadLessText;
        }else if(this.numLimit === AppConstants.ReadMoreMaxLength){
            this.numLimit = AppConstants.ReadMoreMinLength;
            this.readMore = AppConstants.ReadMoreText;
        }
    }

    onSwitchViewChange(event){
        
    }

    handleChange(e) {
        this.index = e.index;
    }

    onTabCreate(e){
        debugger;
    }
}