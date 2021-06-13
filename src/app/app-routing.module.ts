import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CategoriesComponent } from './categories/categories.component';
import { ScheduleComponent } from './schedule/schedule.component';
import  { EditPageComponent } from './edit-page/edit-page.component';
import { QRScannerComponent } from './qrscanner/qrscanner.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component'
import { AuthGuardGuard } from './auth-guard.guard';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  { path: "events", component: EventsComponent, canActivate : [AuthGuardGuard] },
  { path: "home", component: HomepageComponent, pathMatch: "full", canActivate : [AuthGuardGuard]},
  { path: "categories", component: CategoriesComponent, canActivate : [AuthGuardGuard] },
  { path: "schedule", component: ScheduleComponent , canActivate : [AuthGuardGuard]},
  { path: "edit-page/:id/:source", component: EditPageComponent ,canActivate : [AuthGuardGuard]},
  { path: "QRScanner", component: QRScannerComponent ,canActivate : [AuthGuardGuard]},
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]  },
  { path: 'register', component: RegistrationComponent, canActivate: [LoginGuard]},
  { path: 'chat/:id', component: ChatroomComponent, canActivate : [AuthGuardGuard]},
  { path: 'chat', pathMatch: 'full', redirectTo: 'chat/lobby'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
