import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SingleChatComponent } from './chat-list/single-chat/single-chat.component';
import { SidebarChatComponent } from './sidebar-chat/sidebar-chat.component';
import { RoomFormComponent } from './chat-list/room-form/room-form.component';
import {RoomService} from './services/room.service';
import {UserService} from './services/user.service';
import {MessageService} from './services/message.service';
import {MemberService} from './services/member.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inscription', component: SignupComponent },
  { path: 'connexion', component: SigninComponent },
  { path: 'chats', canActivate: [AuthGuardService], component: ChatListComponent },
  { path: 'chat/:id', canActivate: [AuthGuardService], component: SingleChatComponent },
  { path: 'nouveau-salon', canActivate: [AuthGuardService], component: RoomFormComponent },
  { path: '', redirectTo: 'chats', pathMatch: 'full' },
  { path: '**', redirectTo: 'chats' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    ChatListComponent,
    HomeComponent,
    SingleChatComponent,
    SidebarChatComponent,
    RoomFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
      AuthService,
      AuthGuardService,
      RoomService,
      UserService,
      MessageService,
      MemberService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
