import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {queryRefresh} from '@angular/core/src/render3/query';
// import 'rxjs/add/operator/throw';


@Injectable()
export class AuthService {

    private authUrl: string = 'https://reqres.in/api/';
    private loggedIn: boolean = false;

    // osbservable source
    private userCreatedSource = new Subject<User>();
    private userDeletedSource = new Subject();

    // observable stream
    userCreated$ = this.userCreatedSource.asObservable();
    userDeleted$ = this.userDeletedSource.asObservable();


    constructor(private http: HttpClient) {

        // look at localStorage to check if the user is logged in
        this.loggedIn = !!localStorage.getItem('auth_token')
    }

    // Check if the user is logged in

    isLoggedIn(){
        return this.loggedIn
    }

    login(username: string, password: string): Observable<string>{
        return this.http.post(`${this.authUrl}login`, {username, password})
            .map(res => res)
            .do(res => {
                if(res.token){
                    localStorage.setItem('auth_token', res.token);
                    this.loggedIn = true;
                }
            })
            .catch(this.handleError);
    }

    // Log the user out
    logout(){
        localStorage.removeItem('auth_token')
        this.loggedIn = false;
    }

    private handleError(err){
        let errMassage: string;

        if(err instanceof HttpErrorResponse){
            let body = err || '';
            let error = JSON.stringify(body);
            errMassage = `${err.status} - ${err.statusText || ''} ${error}`;
        }else{
            errMassage = err.message ? err.message : err.toString();
        }

        return Observable.throw(errMassage);
    }




}
