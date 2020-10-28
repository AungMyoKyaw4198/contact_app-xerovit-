import { Component, OnInit } from '@angular/core';
import { Contact } from '../../modal/contact';
import { Observable } from 'rxjs';
import { ContactServiceService } from '../../service/contact-service.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contactList: Observable<Contact[]>;
  constructor(private contactService: ContactServiceService) {}

  ngOnInit(): void {
    this.showAllContactList();
  }

  showAllContactList() {
    this.contactService
      .getAllContactList()
      .subscribe((data) => (this.contactList = data));
  }
}
