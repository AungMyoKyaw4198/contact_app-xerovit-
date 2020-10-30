import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent implements OnInit {
  @Input() title: string;
  @Input() name: string;
  @Input() email: string;
  @Input() phone: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  @Input() cancelButtonInclude: boolean;
  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  /**
   * Close the dialog box when user click cancel
   */
  public decline() {
    this.activeModal.dismiss();
  }
  /**
   * Accept the dialog box when user click Ok
   */
  public accept() {
    this.activeModal.close(true);
  }

  /**
   * Close the dialog box when user dismiss it
   */
  public dismiss() {
    this.activeModal.dismiss();
  }
}
