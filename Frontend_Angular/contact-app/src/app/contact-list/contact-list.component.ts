import { Component, OnInit } from '@angular/core';
import { Contact } from '../../modal/contact';
import { Observable } from 'rxjs';
import { ContactServiceService } from '../../service/contact-service.service';
import { ConfirmDialogService } from '../common/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contactList: Contact[] = [];
  searchText: string;
  currentContact: Contact;
  isEmptyContacts = false;
  constructor(
    private contactService: ContactServiceService,
    private confirmDialogService: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.showAllContactList();
  }

  showAllContactList() {
    this.contactService.getAllContactList().subscribe(
      (data) => {
        if (data != null) {
          this.contactList = data;
          if (this.contactList.length === 0) {
            this.isEmptyContacts = true;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe((res: any) => {
      location.reload();
    });
  }

  openConfirmDialog(id: number) {
    this.contactService.getContactById(id).subscribe((data) => {
      this.currentContact = data;
      this.confirmDialogService
        .confirm(
          'Are you sure you want to delete?',
          this.currentContact.name,
          this.currentContact.email,
          this.currentContact.phone
        )
        .then(
          (confirmed) => {
            {
              console.log('User confirmed:', confirmed);
              this.deleteContact(id);
            }
          },
          (cancel) => console.log('User cancel:', cancel)
        )
        .catch(() =>
          console.log(
            'User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'
          )
        );
    });
  }
}
