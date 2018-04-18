import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/user.service";
import {User} from "../../shared/user.model";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers(){
    this.userService.getUsers()
        .subscribe((data) => {
          console.log(data);
          this.users = data;
        })
  }

}
