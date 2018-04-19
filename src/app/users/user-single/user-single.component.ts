import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.css']
})
export class UserSingleComponent implements OnInit {

  user: User;

  constructor(private actvatedRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {

    let id = this.actvatedRoute.snapshot.params['id'];

    this.userService.getUser(id)
        .subscribe((data)=>{
          this.user = data
        })


  }

    deleteUser(){
        let id = this.actvatedRoute.snapshot.params['id'];
      this.userService.deleteUser(id)
          .subscribe(data => {
            console.log('user was delete')
            this.router.navigate(['/users'])
          })
    }

}
