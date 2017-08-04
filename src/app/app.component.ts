import { Component,OnInit } from '@angular/core';
import { AppConstants } from '../assets/app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = AppConstants.AppName;
  ngOnInit(){
    // require("style-loader!./assets/themes/gray/theme.min.css");
    // import { GrayTheme } from "style-loader!./assets/themes/gray/theme.min.css";
  }
}
