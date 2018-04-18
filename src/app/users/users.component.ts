import { Component, OnInit } from '@angular/core';
import {User} from "../shared/user.model";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {

    users: User[] = [];

    constructor() { }

    ngOnInit() {

    }



}
