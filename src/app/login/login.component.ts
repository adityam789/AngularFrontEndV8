import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private api: LoginService, private router: Router) { }

  ngOnInit() {
    
  }

  submit(username: string, password: string){
    let cred = {username, password}
    let v: any;
    let ans = this.api.verify(cred).subscribe(elem => v = ans)
    console.log(v)
    if(!v.verified){
      // TODO: Add the error message and refresh
    }
    else{
      localStorage.setItem('Authorization',v.token)
      this.router.navigate(['home'])
    }
  }

}
