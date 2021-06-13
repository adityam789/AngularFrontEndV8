import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  uploadFile(file: any){
    console.log(file)
    const URL = "http://localhost:8090/upload-file"
    this.http.post<any>(URL, file).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }  
}
