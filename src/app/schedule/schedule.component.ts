import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ScheduleService } from '../Services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  fileUploaded!: File;
  uploadForm!: FormGroup;
  Message: string = ""

  constructor(private formBuilder: FormBuilder, private api : ScheduleService) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
    console.log(this.uploadForm)
  }

  uploadedFile(event: any) {  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.value['profile']=file;
    }
    // this.fileUploaded = event.target.files[0];
    // console.log(this.fileUploaded)   
  }

  onSubmit(){  
    const formData = new FormData();
    formData.append('file', this.uploadForm.value['profile']);
    this.api.uploadFile(formData);
    this.Message = "Boss the file has been uploaded GG!"
  }

}
