import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  constructor(private modalService: NgbModal) {}

  /**
   * Confirm for showing dialog box
   * @param title title of dialog box
   * @param name new of Contact
   * @param email email of Contact
   * @param phone phone of Contact
   * @param btnOkText Text for OK Button
   * @param btnCancelText Text for Cancel Button
   * @param dialogSize size of dialog box(small or large)
   * @param cancelButtonInclude True: dialog box with Ok and cancel Buttons , False: no cancel Button
   */
  public confirm(
    title: string,
    name: string,
    email: string,
    phone: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm' | 'lg' = 'lg',
    cancelButtonInclude: boolean = true
  ): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmDialogComponent, {
      size: dialogSize,
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.name = name;
    modalRef.componentInstance.email = email;
    modalRef.componentInstance.phone = phone;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    modalRef.componentInstance.cancelButtonInclude = cancelButtonInclude;

    return modalRef.result;
  }
}
