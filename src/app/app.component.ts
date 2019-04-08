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
    var config = {
      apiKey: "AIzaSyAB65LNH2VfcywL6Iohe9MNU9WjFrxCD9c",
      authDomain: "slackytwo-1285f.firebaseapp.com",
      databaseURL: "https://slackytwo-1285f.firebaseio.com",
      projectId: "slackytwo-1285f",
      storageBucket: "slackytwo-1285f.appspot.com",
      messagingSenderId: "271920339852"
    };
    firebase.initializeApp(config);
  }
}
