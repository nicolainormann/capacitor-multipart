import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private http: HttpClient, @Optional() private nativeHttp: HTTP) {}

  postFiles(files?: FileList, useNativeHttp = false) {
    const url = 'https://demo7914731.mockable.io/post';
    const formData = new FormData();
    if (files) {
      const file = files.item(0);
      formData.append('file', file, file.name);
    }

    let request: Observable<any>;
    if (useNativeHttp) {
      this.nativeHttp.setDataSerializer('multipart');
      request = from(this.nativeHttp.post(url, formData, {}));
    } else {
      request = this.http.post(url, formData);
    }

    return request;
  }
}
