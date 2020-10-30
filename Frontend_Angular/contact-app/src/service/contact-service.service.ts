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

  /**
   * Get all contact list from back-end
   * @returns Contact[] Contact List
   */
  getAllContactList(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.baseUrl}`);
  }

  /**
   * Add new contact to back-end
   * @param contact new COntact
   * @returns Contact contact
   */
  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.baseUrl}`, contact);
  }

  /**
   * Get contact with ID
   * @param id contact id
   * @returns Contact contact
   */
  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.baseUrl}/${id}`);
  }

  /**
   * Update contact with ID
   * @param id contact id
   * @param contact updated Contact
   */
  updateContact(id: number, contact: Contact): Observable<object> {
    return this.http.put(`${this.baseUrl}/${id}`, contact);
  }

  /**
   * Delete contact with ID
   * @param id contact id
   * @returns Contact contact
   */
  deleteContact(id: number): Observable<Contact> {
    return this.http.delete<Contact>(`${this.baseUrl}/${id}`);
  }
}
