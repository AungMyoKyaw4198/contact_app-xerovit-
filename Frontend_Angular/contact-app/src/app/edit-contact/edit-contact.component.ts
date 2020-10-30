import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../../modal/contact';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactServiceService } from '../../service/contact-service.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  newContact: Contact;

  editContactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  constructor(
    private counterService: ContactServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   * Getter Declarations for From validation
   */
  get name() {
    return this.editContactForm.get('name');
  }
  get email() {
    return this.editContactForm.get('email');
  }
  get phone() {
    return this.editContactForm.get('phone');
  }

  ngOnInit(): void {
    this.getContactById();
  }

  /**
   * Geting Contact by using ID
   */
  getContactById() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.counterService.getContactById(id).subscribe((data) => {
      this.editContactForm.setValue({
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
    });
  }

  /**
   * Updating Contact
   */
  updateContact() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.newContact = this.editContactForm.value;
    this.counterService.updateContact(id, this.newContact).subscribe();
    this.router.navigate(['contacts']);
  }
}
