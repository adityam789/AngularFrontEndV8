import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  Roles: any = ['Admin', 'Author', 'Reader'];
  message: any;

  constructor(private api: LoginService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(firstname: any, lastname: any, username: any, email: any, password: any, role: any){
    let cred = {firstname, lastname, username, email, password, role}
    console.log(cred)
    this.api.register(cred)
    this.router.navigate(['login'])
  }

}
