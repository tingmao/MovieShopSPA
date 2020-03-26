import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovieDetails } from '../../models/movie-details';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h6 class="modal-title">Are you sure you wanna buy</h6>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{moviedeatil.title}} which is :  {{moviedeatil.price}}</p>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-outline-primary" (click)="activeModal.close('Close click')">Yes</button>
      <button type="button" class="btn btn-outline-primary" (click)="activeModal.close('Close click')">No</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() moviedeatil:MovieDetails;

  constructor(public activeModal: NgbActiveModal) { }
}

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './movie-modal.component.html'
})
export class NgbdModalComponent {
  constructor(private modalService: NgbModal) { }
  @Input() modelmovie : MovieDetails;

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.moviedeatil = this.modelmovie;
  }
}