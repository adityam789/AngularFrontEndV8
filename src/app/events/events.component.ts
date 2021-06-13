import { Component, OnInit } from '@angular/core';
import { EventsService } from '../Services/events.service';
import { Observable, Observer } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

export interface ExampleTab {
  label: string;
  content: string;
}

export interface EventTypes {
  id: number;
  EventTypeName: string;
  eventState: boolean;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'EventTypeName', 'eventState', 'edit', 'delete'];
  myControl: FormControl = new FormControl();
  asyncTabs: Observable<ExampleTab[]>;

  public pageSize = 20;
  public currentPage = 0;
  public totalSize = 0;
  pageEvent!: PageEvent;

  value = '';
  AddMessage: string = "";
  DeleteMessage: string = "";
  searchValue: string = "";
  elementToEdit: string;

  rawDataNew: EventTypes[] = [];
  searchData: EventTypes[] = [];
  dataSource: EventTypes[] = [];
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  constructor(private api: EventsService, private router: Router) { 
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: 'Events', content: 'Content 1' },
          { label: 'Add', content: 'Content 2' },
        ]);
      }, 1000);
    });
    this.api.getEventsAll().subscribe(elem => {
      this.rawDataNew = elem.rows;
      this.totalSize = elem.count;
      elem.rows.forEach((subElem: { EventTypeName: string; }) => this.options.push(subElem.EventTypeName))
    });
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.api.getEvents(0).r.subscribe(elem => this.dataSource = elem);
  }

  public handlePage(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.api.getEvents(this.currentPage).r.subscribe(elem => this.dataSource = elem);
    return e;
  }

  onButtonClick(search: string) {
    if(search){
      this.value = search;
      this.api.getSelectedEvents(this.value).subscribe(elem => this.searchData = elem);
    }
    else{
      this.searchData = this.rawDataNew
    }
  }

  onButtonClickAdd(add: string){
    if(add){
      this.api.addEvents(add).subscribe(elem => this.AddMessage = elem);
    }
    else{
      this.AddMessage = "Bro the event gotta have name...."
    }
  }

  onButtonClickDelete(deleteCat: string){
    if(deleteCat){
      this.api.deleteEvent(deleteCat).subscribe(elem => this.DeleteMessage = elem)
    }
    else{
      this.DeleteMessage = "Bro I can't delete nothing LOL"
    }
  }

  onButtonClickDeleteModified(id: number){
    if(id){
      this.api.deleteEventID(id).subscribe(elem => this.DeleteMessage = elem)
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/events']);
    });
    }
    else{
      this.DeleteMessage = "Bro I can't delete nothing LOL"
    }
  }

  modelChangeFn(value: string){
    this.searchValue = value
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  tabClick(event: any) {
    console.log(event)
  }

}
