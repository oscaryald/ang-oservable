import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {User} from "./user.model";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'


@Injectable()
export class UserService {


    userUrl: string = 'https://reqres.in/api/users/'

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
        console.log(this.userUrl)
        return this.http.get(this.userUrl)
            .map(data => data['data'])
            .map(users => users.map(this.toUser))
            // .catch(this.handleError);
    }

    getUser(id: number): Observable<User> {
        return this.http.get(`${this.userUrl}${id}`)
            .map(data => data['data'])
            .map(this.toUser)
            // .catch(this.handleError);
    }

    updateUser(user: User): Observable<User> {
        return this.http.put(`${this.userUrl}${user.id}`, user)
            .map(data => data['data'])
            // .catch(this.handleError);
        
    }


    createUser(user: User):Observable<User> {
        return this.http.post(this.userUrl, user)
            .map(data => data['data'])
            // .catch(this.handleError);
    }

    deleteUser(id:number):Observable<any> {
        return this.http.delete(`${this.userUrl}${id}`)
    }


    // private handleError(err){
    //     let errMassage: string;
    //
    //     if(err instanceof HttpErrorResponse){
    //         let body = err || '';
    //         let error = JSON.stringify(body);
    //         errMassage = `${err.status} - ${err.statusText || ''} ${error}`;
    //     }else{
    //         errMassage = err.message ? err.message : err.toString();
    //     }
    //
    //     return Observable.throw(errMassage);
    // }

}
