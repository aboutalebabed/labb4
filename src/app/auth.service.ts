import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


// ...

interface AuthResponse {
  token: string;
}

interface User {
  sub: string;
  name: string;
}

// ...

@Injectable()
export class AuthService {

  // the decoded token if the user has been authenticated, carrying information about the user.
  _user: User;
  token;

  // inject the HttpClient service.
  constructor(private http: HttpClient) {
    // perform any logic upon application startup here...
    /*
    const token = localStorage.getItem('user');
    if (token) {
      this._user = jwt_decode('token');
      this.token = token;
    }
    */
  }

  // ...
  // The following computed properties may come in handy in the markup in your template...
  get user() {
    return this._user;
  }

  get authenticated() {
    return this._user !== undefined;
  }

  // use this method to catch http errors.
  handleError(error: HttpErrorResponse) {
    return Observable.throw({
      error: error.error
    });
  }

  login(credentials) {

    /*
    OLD

    const ob = this.http.post('/login', credentials);
    ob.subscribe((token: any) => {
      //result.token === ''
      const decoded = jwt_decode(token);
      console.log(decoded.name);
      localStorage.setItem('user', token);
      //decoded = { sub: string, name: string} === User

      this._user = decoded;
    }, (err) => console.error("err", err));
    return ob;
    */

    // invoke the relevant API route for authenticating the user with the given credentials and return an observable
    // of a User object (= decoded token).
    //
    // Make sure to handle a successful authentication by storing and also decoding the returned token, as well as
    // catching http errors.

    // return ...
    const ob = this.http.post('/login', credentials);
    ob.subscribe((resp: any) => {
      //result.token === ''
        console.log(resp);
      const token = resp.token;
      this.token = token;

     const user = jwt_decode(token);
      this._user = user;
      localStorage.setItem('user', token);
      //decoded = { sub: string, name: string} === User


    }, (err) => console.error("err", err));
    return ob;

  }

  logout() {
    // logout the current user by removing the corresponding token.
    this._user = null;
    localStorage.clear('user');
  }

  getResource(resource): Observable<any> {
    // invoke a protected API route by including the Authorization header and return an Observable.
    //
    // If e.g. invoking /api/friends, the 'resource' parameter should equal 'friends'.

    // return ...
    const options = {
    headers: new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`
    })
  };
      return this.http.get<any>(resource, options);


  }
}
