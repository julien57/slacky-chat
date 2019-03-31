import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'slack-project';

  constructor() {
    const config = {
      apiKey: "AIzaSyBHUKnwMsWChsMgHfmx3K0NSy8j9FMi2Qo",
      authDomain: "slacky-3bc7d.firebaseapp.com",
      databaseURL: "https://slacky-3bc7d.firebaseio.com",
      projectId: "slacky-3bc7d",
      storageBucket: "slacky-3bc7d.appspot.com",
      messagingSenderId: "556534632883"
    };
    firebase.initializeApp(config);
  }
}
