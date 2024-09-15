// src/app/application.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApplicationService {

  private apiUrl = 'https://api.buildpass.baguio.gov.ph/api/developer'; // Updated backend URL with /api/

  constructor(private http: HttpClient) { }

  transferApplication(applicationCode: string, emailAddress: string): Observable<any> {
    const payload = {
      application_code: applicationCode,
      email_address: emailAddress
    };
    return this.http.post<any>(`${this.apiUrl}/transfer-application`, payload);
  }

  checkApplication(applicationCode: string): Observable<any> {
    const encodedCode = encodeURIComponent(applicationCode); // URL-encoding for safe transport
    return this.http.get<any>(`${this.apiUrl}/check-application/${encodedCode}`);
  }

  checkUser(emailAddress: string): Observable<any> {
    const encodedEmail = encodeURIComponent(emailAddress); // Keep URL-encoded email
    return this.http.get<any>(`${this.apiUrl}/check-user/${encodedEmail}`);
  }
}
