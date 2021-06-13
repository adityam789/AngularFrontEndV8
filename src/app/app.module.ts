import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardGuard } from './auth-guard.guard';
import { JwtModule } from "@auth0/angular-jwt";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginGuard } from './login.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventsComponent } from './events/events.component'
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoriesComponent } from './categories/categories.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { EditPageComponent } from './edit-page/edit-page.component';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { HttpInterceptorService } from './Services/http-interceptor.service';

import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QRScannerComponent } from './qrscanner/qrscanner.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatroomComponent } from './chatroom/chatroom.component';

const config: SocketIoConfig = { url: 'http://localhost:8090', options: {} }

let extraImports = [
  OverlayModule, 
  CdkTreeModule,
  PortalModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatChipsModule,
  MatRippleModule,
  MatDividerModule,
  MatExpansionModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTreeModule,
  MatBadgeModule,
  MatGridListModule,
  MatRadioModule,
  MatDatepickerModule,
  MatTooltipModule
]

export function tokenGetter() {
  console.log("hmm")
  console.log(localStorage.getItem("Authorization"))
  return localStorage.getItem("Authorization");
}

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    CategoriesComponent,
    NavbarComponent,
    ScheduleComponent,
    HomepageComponent,
    EditPageComponent,
    QRScannerComponent,
    LoginComponent,
    RegistrationComponent,
    ChatroomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatCardModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    ZXingScannerModule,
    MatSelectModule,
    FlexLayoutModule,
    NgbModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: () => {
    //       console.log("hit")
    //       return "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcnkgSGFtIiwiaWF0IjoxNTE2MjM5MDIyfQ.s3fC7DY5TeJb8OVluGojXNS5YhclsydmnQxd1UosU2ynA7EWQvgqUTFM6MOi2gTrIqtMAh16Rkm0OQilfL1ROpSKGstm2gxb1ZjQEKbVJ17NLU6Uxh56zpNGhvLVunCRH0PC8TqWWUZXKZ1B4SF_cQU-K--z2biPoynsA9pzgiHLEcnNjnG4ymqGJ_xIAMn80R1QCfGw_1FmIHCytTs8bV5YOnkkaqHgvaUEJCg8U5O5zPIVftiafRLEmNgyo7h5C9_gWLlygneQQLNNPQZh9uPhorr_DLBqJNRVm9LbhVSqR4cd1ZlWRryGl_uzddqBAPojS1PjokZXu9hff9u25Q"
    //     },
    //     // throwNoTokenError: true,
    //     // skipWhenExpired: true,
    //     headerName: "Homer",
    //     // whitelistedDomains: ["example.com"],
    //     // blacklistedRoutes: ["http://example.com/examplebadroute/"],
    //   },
    // }), 
    SocketIoModule.forRoot(config),
    ...extraImports
  ],
  providers: [AuthGuardGuard, LoginGuard, 
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
