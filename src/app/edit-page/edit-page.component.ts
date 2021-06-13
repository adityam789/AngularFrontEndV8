import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventsService } from '../Services/events.service';
import { CategoriesService } from '../Services/categories.service';
import { Router } from '@angular/router';

export interface EventTypes {
  id: number;
  EventTypeName: string;
  eventState: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface categories{
  ID: number;
  CategoryName: string;
  isDeleted: number;
}

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit{

  source: string;
  eventInfo: EventTypes[] = [];
  categoriesInfo: categories[] = [];

  message: string;
  message2: any;

  newEvent: any;
  checkoutForm = this.fb.group({
    EventTypeName: '',
    EventState: '',
    isDeleted: ''
  });

  newCategory: any;
  checkoutForm2 = this.fb.group({
    CategoryName: '',
    isDeleted: ''
  });

  options: FormGroup;

  constructor(private route: ActivatedRoute, private api: EventsService, private api2: CategoriesService, public fb: FormBuilder, private router: Router) { 
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
    this.route.params.subscribe((params: Params) => {
      if(params.source == "events"){
        this.api.getSelectedEvents(params.id).subscribe(elem => this.eventInfo = elem)
        this.source = "events"
      }
      else if(params.source == "categories"){
        this.api2.getSelectedCategories(params.id).subscribe(elem => this.categoriesInfo = elem)
        this.source = "categories"
      }
    })
  }

  ngOnInit(){
  }

  onSubmit(): void {
    // Process checkout data here
    // this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.newEvent.name = this.checkoutForm.value.EventTypeName == null ? this.eventInfo[0].EventTypeName : this.checkoutForm.value.EventTypeName
    this.newEvent.state = this.checkoutForm.value.EventState == null ? this.eventInfo[0].eventState : this.checkoutForm.value.EventState
    this.newEvent.isDeleted = this.checkoutForm.value.isDeleted
    this.newEvent.toEdit = this.eventInfo[0].EventTypeName
    this.checkoutForm.reset();
    this.api.updateEvent(this.newEvent).subscribe(elem => this.message = elem)
    this.router.navigate(["events"])
  }

  onSubmit2(): void {
    this.newCategory.name = this.checkoutForm2.value.CategoryName == null ? this.categoriesInfo[0].CategoryName : this.checkoutForm2.value.CategoryName
    this.newCategory.isDeleted = this.checkoutForm2.value.isDeleted
    this.newCategory.toEdit = this.categoriesInfo[0].CategoryName
    this.api2.updateCategory(this.newCategory).subscribe(elem => this.message2 = elem)
    this.router.navigate(["categories"])
  }

}
