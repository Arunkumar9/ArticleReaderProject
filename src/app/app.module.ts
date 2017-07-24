import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TruncateModule } from 'ng2-truncate';

import { InMemoryWebApiModule }     from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { AppHeaderComp } from './Components/Header/app.headercomp';
import { AppArticleTree } from './Components/ArticleTree/app.articletree';
import { AppArticleDashBoard } from './Components/ArticleDashboard/app.articledashboard';
import { AppAdministration } from './Components/Administration/app.administration';

import { Routing } from './app.routing';

import { DropdownModule }   from 'primeng/primeng';
import { TreeModule,TreeNode } from 'primeng/primeng';
import { TreeDragDropService } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { ToolbarModule } from 'primeng/primeng';
import { DataGridModule,PanelModule,DataListModule } from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';

//import { DragDropModule } from 'primeng/primeng';

import { ArticleTreeService } from './Services/ArticleTree/articletree.service';

//import { InMemoryDataService } from './Services/ArticleTree/articletreeinmemory.service';

@NgModule({
  imports: [
    CommonModule,
    TruncateModule,
    BrowserModule,
    HttpModule,
    JsonpModule,
    Routing,
    DropdownModule,
    BrowserAnimationsModule,
    TreeModule,    
    TabViewModule,
    ToolbarModule,
    DataGridModule,
    PanelModule,
    FormsModule,
    DataListModule
    //InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [
    AppComponent,
    AppHeaderComp,
    AppArticleTree,
    AppArticleDashBoard,
    AppAdministration
  ], 
  providers: [TreeDragDropService,ArticleTreeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
