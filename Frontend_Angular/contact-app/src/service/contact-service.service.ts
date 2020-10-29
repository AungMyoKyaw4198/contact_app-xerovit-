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

  getAllContactList(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.baseUrl}`);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.baseUrl}`, contact);
  }

  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.baseUrl}/${id}`);
  }

  updateContact(id: number, contact: Contact): Observable<object> {
    return this.http.put(`${this.baseUrl}/${id}`, contact);
  }

  deleteContact(id: number): Observable<Contact> {
    return this.http.delete<Contact>(`${this.baseUrl}/${id}`);
  }
}
