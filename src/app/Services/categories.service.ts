import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface categories{
  ID: number;
  CategoryName: string;
  isDeleted: number;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategoriesAll(){
    const URL = "http://localhost:8090/categories"
    return this.http.get<categories[]>(URL)
  }

  getCategories(pageNum: number){
    const URL = "http://localhost:8090/categories"
    return this.http.get<categories[]>(URL, {
      params: {
        page: `${pageNum}` 
      },  
    })
  }

  getLength(){
    const URL = "http://localhost:8090/categories/length";
    let r = this.http.get<number>(URL)
    return r
  }

  getSelectedCategories(name: string){
    const URL = "http://localhost:8090/categories"
    return this.http.get<categories[]>(URL, {
      params: {
        search: `${name}` 
      },  
    })
  }

  addCategories(name: string){
    const URL = "http://localhost:8090/categories"
    return this.http.post<any>(URL, null,{
      params: {
        name: `${name}` 
      },  
    })
  }

  deleteCategory(name: string){
    const URL = "http://localhost:8090/categories"
    return this.http.delete<any>(URL,{
      params: {
        name: `${name}` 
      },  
    })
  }

  deleteCategoryID(id: number){
    const URL = "http://localhost:8090/categories"
    return this.http.delete<any>(URL, {
      params: {
        id: `${id}` 
      },  
    })
  }

  updateCategory(body: any){
    const URL = "http://localhost:8090/categories/update"
    return this.http.post<string>(URL, body);
  }

}
