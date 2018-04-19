import {Component, OnInit} from '@angular/core';
import {User} from '../shared/models/user.model';
import {UserService} from '../shared/services/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {

    successMessage: string = '';
    errorMessage: string = '';

    constructor(private userService: UserService) {
    }

    ngOnInit() {

        // user has been created
        this.userService.userCreated$.subscribe(user => {
            this.successMessage = `${user.name} has been created!`;
            this.clearMessages();
        });

        // user has been deleted
        this.userService.userDeleted$.subscribe(() => {
            this.successMessage = `the user has been deleted!`;
            this.clearMessages();
        });

    }

    clearMessages(){
        setTimeout(() => {
            this.successMessage = '';
            this.errorMessage = '';
        },5000);
    }


}
