import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AdMobFree, AdMobFreeInterstitialConfig, AdMobFreeBannerConfig, AdMobFreeInterstitial } from '@ionic-native/admob-free';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private admobFree: AdMobFree) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.displayBannerAds();
    });
  }
  displayBannerAds() {
    const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      id: 'ca-pub-xxxxxxxxxxx',
      isTesting: true,
      autoShow: true,
      bannerAtTop: true,     
    };
    const interstitialConfig: AdMobFreeInterstitialConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      id: 'ca-app-pub-xxxxxxxxxxxxxxxx',
      isTesting: false,
      autoShow: false
    };
    this.admobFree.banner.config(bannerConfig);
    this.admobFree.banner.prepare().then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
    });
    this.admobFree.interstitial.config(interstitialConfig);
    this.admobFree.on("admob.interstitial.events.CLOSE").subscribe(()=>{
      console.log("CLOSE");
      this.nav.setRoot(TabsPage);
    });
    this.admobFree.on("admob.interstitial.events.EXIT_APP").subscribe(()=>{
      console.log("EXIT_APP");
      
    })
   }
}
