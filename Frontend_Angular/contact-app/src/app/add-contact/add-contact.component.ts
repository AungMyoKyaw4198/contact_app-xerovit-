import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contact } from '../../modal/contact';
import { Router } from '@angular/router';
import { ContactServiceService } from '../../service/contact-service.service';
import { ConfirmDialogService } from '../common/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  contactList: Contact[] = [];
  contact: Contact;
  isSameValueExist = false;
  addContactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });
  constructor(
    private contactService: ContactServiceService,
    private router: Router,
    private confirmDialogService: ConfirmDialogService
  ) {}

  get name() {
    return this.addContactForm.get('name');
  }
  get email() {
    return this.addContactForm.get('email');
  }
  get phone() {
    return this.addContactForm.get('phone');
  }

  ngOnInit(): void {
    this.contactService
      .getAllContactList()
      .subscribe((data) => (this.contactList = data));
  }

  addContact() {
    this.contact = this.addContactForm.value;
    this.checkSameValue(this.contact);
    if (this.isSameValueExist) {
      this.confirmDialogService.confirm(
        'Contact with Same phone or email already exist !',
        'Please try again.',
        '',
        ''
      );
    } else {
      this.contactService.addContact(this.contact).subscribe();
      this.router.navigate(['contacts']);
    }
  }

  checkSameValue(newContact: Contact) {
    this.isSameValueExist = false;
    for (const contact of this.contactList) {
      if (
        contact.email === newContact.email ||
        contact.phone === newContact.phone
      ) {
        this.isSameValueExist = true;
      }
    }
    return this.isSameValueExist;
  }
}
