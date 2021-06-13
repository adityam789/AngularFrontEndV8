import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  // post -> Login: JWT or Error
  // if jwt: set to localstorage and redirect to homepage
  // else: display error

  verify(cred: any){
    const URL = "http://localhost:8090/login/verify"
    return this.http.post<any>(URL, cred)
  }

  register(cred: any){
    const URL = "http://localhost:8090/login/register"
    this.http.post<any>(URL, cred).subscribe(console.log)
  }

}
