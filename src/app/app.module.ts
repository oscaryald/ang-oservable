import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";


import {AppComponent} from './app.component';
import {UserListComponent} from './users/user-list/user-list.component';
import {UserSingleComponent} from './users/user-single/user-single.component';
import {UserService} from "./shared/services/user.service";
import {RoutingModule} from "./router.module";
import {UsersComponent} from "./users/users.component";
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from './shared/services/auth.service';




@NgModule({
    declarations: [
        AppComponent,
        UserListComponent,
        UserSingleComponent,
        UsersComponent,
        UserCreateComponent,
        UserEditComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RoutingModule
    ],
    providers: [UserService, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
