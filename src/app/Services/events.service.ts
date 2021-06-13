import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface EventTypes {
  id: number;
  EventTypeName: string;
  eventState: boolean;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getEventsAll(){
    console.log("All")
    const URL = "http://localhost:8090/events"
    return this.http.get<any>(URL);
  }

  getEvents(pageNum: number) {
    console.log("hmm")
    // now returns an Observable of Config
    const URL = "http://localhost:8090/events";
    let r = this.http.get<EventTypes[]>(URL, {
      params: {
        page: `${pageNum}` 
      },  
    })
    return {r}
  }

  getLength(){
    const URL = "http://localhost:8090/events/pgLength";
    let r = this.http.get<number>(URL)
    return r
  }

  getSelectedEvents(name: string){
    const URL = "http://localhost:8090/events"
    return this.http.get<EventTypes[]>(URL, {
      params: {
        search: `${name}` 
      },  
    })
  }

  addEvents(name: string){
    const URL = "http://localhost:8090/events"
    return this.http.post<any>(URL, null,{
      params: {
        name: `${name}` 
      },  
    })
  }

  deleteEvent(name: string){
    const URL = "http://localhost:8090/events"
    return this.http.delete<any>(URL, {
      params: {
        name: `${name}` 
      },  
    })
  }

  deleteEventID(id: number){
    const URL = "http://localhost:8090/events"
    return this.http.delete<any>(URL, {
      params: {
        id: `${id}` 
      },  
    })
  }

  updateEvent(body: any){
    const URL = "http://localhost:8090/events/update"
    return this.http.post<string>(URL, body);
  }

}
