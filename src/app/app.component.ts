import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userCredentials = {
    username: '',
    password: ''

  };

  friends = [];

  constructor(private authService: AuthService) {}

  login() {
    // login user using authService.
    var success = (response) => {
    console.log('success');
  }

  var error = (response) => {
  console.log('error22');
}
    //this.authService.login(this.userCredentials)
        console.log('hejsannnn');
    this.authService.login(this.userCredentials).subscribe(success, error);
  }

  logout() {
    // logout user using authService.
    this.authService.logout();
  }

  testApi() {
    // test API access by invoking getResource on authService.
    // friends va i subscribe parameter först
    this.authService.getResource('/friends').subscribe((resp) => {
    this.friends = resp.friends
    console.log(this.friends, 'friends');
  }, (err) => {
    console.error('got error back', err);
  });
  }
}
