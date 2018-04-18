import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";


import {AppComponent} from './app.component';
import {UserListComponent} from './users/user-list/user-list.component';
import {UserSingleComponent} from './users/user-single/user-single.component';
import {UserService} from "./shared/user.service";
import {RoutingModule} from "./router.module";
import {UsersComponent} from "./users/users.component";
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';




@NgModule({
    declarations: [
        AppComponent,
        UserListComponent,
        UserSingleComponent,
        UsersComponent,
        UserCreateComponent,
        UserEditComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RoutingModule
    ],
    providers: [UserService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
