import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/user.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

    user: User = {
        name: '',
        username: '',
        avatar: '',
    }

    successMessage: string = '';
    errorMessage: string = '';

    constructor(private userService: UserService,
                private router: Router) {
    }

    ngOnInit() {

    }

    createUser() {
        this.successMessage = '';
        this.userService.createUser(this.user)
            .subscribe(
                user => {
                    this.successMessage = 'user was created'
                    console.log('user was created')
                    this.router.navigate(['/users'])
                })
    }

}
