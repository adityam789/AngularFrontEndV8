import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private api: LoginService, private router: Router, private UserError: MatSnackBar) { }

  ngOnInit() {
    
  }

  submit(username: string, password: string){
    let cred = {username, password}
    this.api.verify(cred).subscribe(elem => {
      if(!elem.verified){
        // TODO: Add the error message and refresh
        this.UserError.open("EHHHHHHHHHHHHH","close")
      }
      else{
        localStorage.setItem('Authorization', elem.token)
        this.router.navigate(['home']).then((v) => {
          window.location.reload();
        })
      }
    })
  }

} 
