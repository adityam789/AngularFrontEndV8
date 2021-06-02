import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OperationResponse } from '../qrscanner/CommunicationModels/response.model'
import { Appointment } from '../qrscanner/CommunicationModels/appointment.model';
import { LogService } from '../qrscanner.service';

interface Transport {
  plates: string;
  slot: Slot;
}

interface Slot {
  name: string;
  description: string;
}

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.css']
})
export class QRScannerComponent implements OnInit {

  private scannerEnabled: boolean = true;
  private transports: Transport[] = [];
  private information: string = "No code information detected. Zoom in on a QR code to scan.";
  content: string;

  constructor(private logService: LogService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.information = "Wait retrieving information ...";
    console.log($event)
    this.content = $event
    const appointment = new Appointment($event);
    this.logService.logAppointment(appointment).subscribe(
      (result: OperationResponse) => {
        this.information = $event;
        this.transports = result.object;
        this.cd.markForCheck();
      },
      (error: any) => {
        this.information = "An error has occurred please try again ... ";
        this.cd.markForCheck();
      });
  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = "No code information detected. Zoom in on a QR code to scan.";
  }

}
