import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form = this.fb.group({
    file: [''],
  });

  response: any;

  get files() {
    return this.form.controls.file.value as FileList;
  }

  constructor(private fb: FormBuilder, private appService: AppService) {}

  fileChange(files: FileList) {
    this.form.controls.file.patchValue(files);
  }

  onClick(useNativeHttp = false) {
    this.response = undefined;
    this.appService.postFiles(this.files, useNativeHttp).subscribe(res => (this.response = res));
  }
}
