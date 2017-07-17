/**
 * This Component will containes the tab view of all articles and tabs will be added dynamically when user clicks on specific category.
 */

import { Component,OnInit } from '@angular/core';

import { AppConstants }     from '../../../assets/app.constants';
import { AppStringConstants } from '../../../assets/app.Stringconstants';

import { ArticleTreeService } from '../../Services/ArticleTree/articletree.service';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { AppArticleTree } from '../ArticleTree/app.articletree';

import { SelectItem } from 'primeng/primeng';
import { TreeModule,TreeNode } from 'primeng/primeng';

import { ArticlesModel } from '../../Models/Articles/articles';


@Component({
    selector : 'app-articletabview',
    templateUrl : './app.articletabview.html',
    styleUrls : ['./app.articletabview.css']
})

export class AppArticleTabView implements OnInit{

    articleHeaderText = AppStringConstants.AllArticles;
    errorMessage: string;
    treeValues;
    switchViewText = AppStringConstants.SwitchView;
    switchViews: SelectItem[];
    articleDetails:ArticlesModel[];
    selectedDataModel:string;
    numLimit:Number;
    readMore:string;
    linkparams:any;
    
    constructor(private articleTreeService: ArticleTreeService,
                private route: ActivatedRoute,
                private location: Location) {
        this.selectedDataModel = 'Thumbnail View';
        this.numLimit = 30;
        this.readMore = 'Read More...';
    }

    ngOnInit(){
        this.getSwithViewData();
        
        //According to the Id given this call will route the window to that value.
        this.route.params.forEach((params:Params) => this.findSpecificArticle(params));
    }

    findSpecificArticle(params:Params){
        let id = params['id'];
        this.linkparams = params;
        this.treeValues =  this.articleTreeService.getArticleTreeValues();
        if(this.treeValues != null && this.treeValues != undefined){
            var treeNodes = this.treeValues[0];
            if(treeNodes.id == id){
                if(treeNodes.leaf == true){
                    //TODO: Write code for Opening the respective Articles Content.
                }else{
                    this.articleHeaderText = treeNodes.label;
                    var articleItemArray = new Array();
                    articleItemArray = this.prepareDataforArticleLaunch(treeNodes,articleItemArray);   
                    this.articleDetails =  articleItemArray as ArticlesModel[];
                }                         
            }else{
                this.findArticleHeader(treeNodes.children,id);
            }
        }else{
            this.articleTreeService.getArticleTree()
                               .subscribe(this.reRunFetchArticles);
                               //articles => this.treeValues = articles, error =>  this.errorMessage = <any>error
                               //(articles:TreeNode[],error)=>this.reRunFetchArticles(articles,error)
        }       
    }

    reRunFetchArticles(articles:TreeNode[]){
        debugger;
        this.linkparams;
    }

    findArticleHeader(childNodes,id){
        for(var i=0;i<childNodes.length;i++){
            var childItem = childNodes[i];
            if(childItem.id == id){
                if(childItem.leaf == true){
                    //TODO: Write code for Opening the respective Articles Content.
                }else{
                    this.articleHeaderText = childItem.label;
                    var articleItemArray = new Array();
                    articleItemArray = this.prepareDataforArticleLaunch(childItem,articleItemArray);
                    this.articleDetails =  articleItemArray as ArticlesModel[];   
                    break;
                }                
            }else{
                if(childItem.children != null && childItem.children != undefined){
                    if(childItem.children.length > 0){
                        this.findArticleHeader(childItem.children,id);
                    }                    
                }                
            }
        }
    }

    getSwithViewData() {
        this.articleTreeService.getSwitchViews()
                          .subscribe(switchViews => this.switchViews = switchViews, error =>  this.errorMessage = <any>error);
    }

    getArticleTreeContent(){
        //this.articleTreeService.getArticleTree().subscribe(articles => this.articles = articles, error =>  this.errorMessage = <any>error);
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

    onSwitchViewChange(event){
        
    }

    onReadMore($scope){
        debugger;
        if(this.numLimit === 30){
            this.numLimit = 500;
            this.readMore = 'Read Less...';
        }else if(this.numLimit === 500){
            this.numLimit = 30;
            this.readMore = 'Read More...';
        }
    }
}