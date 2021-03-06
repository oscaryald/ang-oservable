import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";

import {Observable} from "rxjs/Observable";
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/throw';


import {User} from "../models/user.model";

@Injectable()
export class UserService {


    userUrl: string = 'https://reqres.in/api/users/';

    // osbservable source
    private userCreatedSource = new Subject<User>();
    private userDeletedSource = new Subject();

    // observable stream
    userCreated$ = this.userCreatedSource.asObservable();
    userDeleted$ = this.userDeletedSource.asObservable();


    constructor(private http: HttpClient) {
    }

    private toUser(user): User{
        return {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            username: user.first_name,
            avatar: user.avatar
        }
    }

    getUsers(): Observable<User[]> {

        return this.http.get(this.userUrl)
            .map(data => data['data'])
            .map(users => users.map(this.toUser))
            .catch(this.handleError);
    }

    getUser(id: number): Observable<User> {

        let headers = new HttpHeaders()
        let token = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${token}`)

        return this.http.get(`${this.userUrl}${id}`, {headers})
            .map(data => data['data'])
            .map(this.toUser)
            .catch(this.handleError);
    }

    updateUser(user: User): Observable<User> {
        return this.http.put(`${this.userUrl}${user.id}`, user)
            .map(data => data['data'])
            .catch(this.handleError);
        
    }


    createUser(user: User):Observable<User> {


        return this.http.post(this.userUrl, user)
            .map(data => data['data'])
            .do(() => this.userCreated(user))
            .catch(this.handleError);
    }

    deleteUser(id:number):Observable<any> {
        return this.http.delete(`${this.userUrl}${id}`)
            .do(res => this.userDeleted())
    }


    // The user was created. Add this info to our stream

    userCreated(user: User){
        this.userCreatedSource.next(user);
    }

    // The user was deleted. Add this info to our stream

    userDeleted(){
        this.userDeletedSource.next();
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
