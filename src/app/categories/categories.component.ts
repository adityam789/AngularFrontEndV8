import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../Services/categories.service';
import { Observable, Observer } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

export interface categories{
  ID: number;
  CategoryName: string;
  isDeleted: number;
}

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  myControl: FormControl = new FormControl();
  asyncTabs: Observable<ExampleTab[]>;
  displayedColumns: string[] = ['ID', 'CategoryName', 'edit', 'delete'];

  pageEvent!: PageEvent;
  public pageSize = 20;
  public currentPage = 0;
  public totalSize = 0;

  value = '';
  AddMessage: string = "";
  DeleteMessage: string = "";
  searchValue: string = "";
  elementToEdit: string;

  rawData: categories[] = [];
  searchData: categories[] = [];
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  constructor(private api: CategoriesService) { 
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: 'Categories', content: 'Content 1' },
          { label: 'Add', content: 'Content 3' },
        ]);
      }, 1000);
    });
    this.api.getCategoriesAll().subscribe(elem => {
      this.rawData = elem;
      elem.forEach(subElem => this.options.push(subElem.CategoryName))
    })
    this.api.getLength().subscribe(elem => {this.totalSize = elem})
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.api.getCategories(0).subscribe(elem => {this.rawData = elem})
  }

  public handlePage(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.api.getCategories(this.currentPage).subscribe(elem => {this.rawData = elem})
    return e;
  }

  onButtonClick(search: string) {
    if(search){
      this.value = search;
      this.api.getSelectedCategories(this.value).subscribe(elem => this.searchData = elem);
    }
    else{
      this.searchData = this.rawData
    }
  }

  onButtonClickAdd(add: string){
    if(add){
      this.api.addCategories(add).subscribe(elem => this.AddMessage = elem);
      this.api.getCategories(this.currentPage).subscribe(elem => {this.rawData = elem})
    }
    else{
      this.AddMessage = "Bro the category gotta have name...."
    }
  }

  onButtonClickDelete(deleteCat: string){
    if(deleteCat){
      this.api.deleteCategory(deleteCat).subscribe(elem => this.DeleteMessage = elem)
      this.api.getCategories(this.currentPage).subscribe(elem => {this.rawData = elem})
    }
    else{
      this.DeleteMessage = "Bro I can't delete nothing LOL"
    }
  }

  onButtonClickDeleteModified(id: number){
    if(id){
      this.api.deleteCategoryID(id).subscribe(elem => this.DeleteMessage = elem)
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

}
