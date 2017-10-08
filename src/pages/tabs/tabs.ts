import { Component, ViewChild } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Platform, NavController, Tabs, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild("myTabs") tabRef: Tabs;
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public platform: Platform,public navCtrl: NavController,public viewCtrl: ViewController) {
    this.platform.registerBackButtonAction(() => {
      let viewname = this.navCtrl.getActive().id;
      let tabView = this.tabRef.viewCtrl.instance.navCtrl._app._title;
      
      console.log(viewname);
      console.log(tabView);
      
      
    });
  }
}
