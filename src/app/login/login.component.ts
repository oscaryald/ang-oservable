import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';





@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    credentials = {
        username: '',
        password: ''
    };

    successMessage: string = '';
    errorMessage: string = '';

    constructor(private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
    }


    login(){
        this.authService.login(this.credentials.username, this.credentials.password)
            .subscribe(
                data => {

                    console.log(data);

                    this.router.navigate(['']);
                },
                err => {
                    this.errorMessage = 'Invalid name or password';
                    console.log(err)
                }
            )
    }



}
