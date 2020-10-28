import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../modal/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactServiceService {
  private baseUrl = 'http://localhost:3000/contacts';
  constructor(private http: HttpClient) {}

  getAllContactList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  addContact(contact: Contact): Observable<object> {
    return this.http.post(`${this.baseUrl}`, contact);
  }
}
