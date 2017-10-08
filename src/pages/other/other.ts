import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdMobFree } from '@ionic-native/admob-free';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-other',
  templateUrl: 'other.html',
})
export class OtherPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private admobFree: AdMobFree,
    private iab: InAppBrowser, private ngZone: NgZone) {
  }
  goBack() {
    this.navCtrl.setRoot(TabsPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherPage');
  }
  ionViewWillLeave() {
    // // this.displayInterstital();
    // this.ngZone.run(()=>{

    // });
  }
  ionViewWillEnter() {
    this.prepareInterstital();
  }
  prepareInterstital() {
    this.admobFree.interstitial.prepare().then((result) => {
      console.log('Prepare', result);
    }, (reason) => {
      console.log('Prepare', reason);
    });
  }
  displayInterstital() {
    this.admobFree.interstitial.isReady().then((result) => {
      console.log('Ready', result);
      this.admobFree.interstitial.show().then((result) => {
        console.log('Shown', result);
      }, (reason) => {
        console.log('Shown', reason);
      });
    }, (reason) => {
      console.log('Ready', reason);
    });
  }
  browser() {
    let browser = this.iab.create('https://www.google.co.in', '_blank', 'location=no,clearsessioncache=yes,hardwareback=no');
    browser.on("loadstop").subscribe(() => {
      this.prepareInterstital();
    });
    browser.on('backPressed').subscribe(() => {
      console.log("back");
    });
    browser.on("exit").subscribe(() => {
      // console.log("exit");
      this.displayInterstital();
      browser.close();
    });
  }
}
