import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AppURL } from '../../../assets/app.AppURLs';


@Injectable()
export class ArticleTabService {
    private articleTreeUrl = AppURL.ArticleTreeURL;
    private switchViewUrl = AppURL.SwitchViewURL;
    private articleInMemoryUrl = 'api/articles';

    constructor (private http: Http) {}


    // getArticleTree(): Observable<TreeNode[]>{
    //     return this.http.get(this.articleTreeUrl)
    //                     .map(this.extractData)
    //                     .catch(this.handleError);
    // }

    private extractData(res: Response) {
        let body = res.json();
        return body.Data || { };
    }
    
    private handleError (error: Response | any) {
        //TODO: need to learn how to use the angular logging mechanisum

        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}