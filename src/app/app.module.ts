import { NgModule }               from '@angular/core';
import { IonicApp, IonicModule }  from 'ionic-angular';
import { MyApp }                  from './app.component';

import { AboutPage }              from '../pages/about/about';
import { ContactPage }            from '../pages/contact/contact';
import { HomePage }               from '../pages/home/home';
import { TabsPage }               from '../pages/tabs/tabs';

import {DatabaseService}          from "../providers/database-service";
import {GlobalVariables}          from "../providers/global-variables";
import {HttpService}              from "../providers/http-service";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    DatabaseService,
    HttpService,
    GlobalVariables
  ]
})
export class AppModule {}
