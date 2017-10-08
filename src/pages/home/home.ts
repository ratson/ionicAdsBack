import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public platform: Platform) {

  }
  navigate() {
    this.navCtrl.push('OtherPage');
  }
  ionViewWillEnter() {
    console.log("HOMEEEE");
    // this.platform.registerBackButtonAction(() => {
    //   console.log("backing");
    // }, 300)
  }
}
