import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OperationResponse } from '../qrscanner/CommunicationModels/response.model'
import { Appointment } from '../qrscanner/CommunicationModels/appointment.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  baseUrl: string = environment.apiUrl + 'log/appointment';

  constructor(private http: HttpClient) {
  }

  public logAppointment(appointment: Appointment): Observable<OperationResponse> {
    return this.http.post<OperationResponse>(this.baseUrl, appointment);
  }

}