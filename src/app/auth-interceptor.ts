import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

// ...
// Example of user credentials to match against incoming credentials.
const username  = 't';
const password  = 't';

// list of friends to return when the route /api/friends is invoked.
const friends   = ['alice', 'bob']

// the hardcoded JWT access token you created @ jwt.io.
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImZ1eHh4cyJ9.iIewzj4D-Q_gEjnDAU5t1LZNIm7CT4UMaztEd8C5GiA';
// ...
// Use these methods in the implementation of the intercept method below to return either a success or failure response.
const makeError = (status, error) => {
    return Observable.throw(
        new HttpErrorResponse({
            status,
            error
        })
    );
};

const makeResponse = body => {
    return of(
        new HttpResponse({
            status: 200,
            body: body
        })
    );
};

// ...

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const { 
        body,       // object
        headers,    // object
        method,     // string
        url,        // string
    } = req;

//console.log(body, headers, method, url);
/*
if (url.endsWith('/login')) {
    if (body.username === 't' && body.password == 't') {
        return makeResponse({
          token: token,

        });
    } else {
        return makeError(500, {

        });
    }
}
*/
if (url.endsWith('/login')) {
  console.log("user", body)
    if (body.username === 't' && body.password === 't') {
        return makeResponse({
            token: token,
        });
    } else {
        return makeError(401, {

        });
    }
} else if (url.endsWith('/friends')) {
    if (headers.has('Authorization')) {
        if (headers.get('Authorization') === `Bearer ${token}`) {
            return makeResponse({
                friends: friends,
            });
        } else {
            return makeError(401, {});
        }
    } else {
        return makeError(401, {});
    }
} else {
    return makeError(500, {});
}
    // implement logic for handling API requests, as defined in the exercise instructions.
  }
}
