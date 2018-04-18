import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/user.service";
import {User} from "../../shared/user.model";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
    user: User;
    successMessage: string = '';
    errorMessage: string = '';

    constructor(private userService: UserService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        let id = this.activatedRoute.snapshot.params['id'];
        this.userService.getUser(id)
            .subscribe(user => this.user = user)
    }

    updateUser() {
        this.successMessage = '';
        this.errorMessage = '';

        this.userService.updateUser(this.user)
            .subscribe(
                user => {
                    this.successMessage = 'user was updated'
                    console.log('user is edit')
            },
                err => {
                    console.error(err)
                    this.errorMessage = 'user was NOT updated';
                }

            )
    }


}
