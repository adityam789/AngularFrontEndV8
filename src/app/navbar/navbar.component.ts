import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  // @HostListener('storage', ['$event'])
  // onClick(btn) {
  //   this.val = localStorage.getItem('Authorization') ? true : false;
  //   console.log(this.val)
  // }

  val: boolean = localStorage.getItem('Authorization') ? true : false;

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

}
