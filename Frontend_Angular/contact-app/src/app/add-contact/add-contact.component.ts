import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contact } from '../../modal/contact';
import { Router } from '@angular/router';
import { ContactServiceService } from '../../service/contact-service.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  contact: Contact;
  addContactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });
  constructor(
    private contactService: ContactServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addContact() {
    this.contact = this.addContactForm.value;
    this.contactService.addContact(this.contact).subscribe();
    this.router.navigate(['contacts']);
  }
}
