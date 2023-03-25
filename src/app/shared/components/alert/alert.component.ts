import {Component, ElementRef, OnInit, Renderer2, TemplateRef} from '@angular/core';
import {Observable} from "rxjs";
import {AlertService} from "@shared/components/alert/alert.service";
import {AlertModel} from "@shared/models/alert.model";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  alerts$!: Observable<AlertModel[]>;
  alertModalRef!: NgbModalRef;
  details!: any;

  constructor(
    private _modalService: NgbModal,
    private _alertService: AlertService,
    private _elem: ElementRef,
    private _renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void {
    this.alerts$ = this._alertService.alertStateSubject;
  }

  openModal(content: TemplateRef<any>, id: string, details: any): void {
    this.details = details;
    const options = {
      ariaLabelledBy: 'modal-basic-title',
      scrollable: true,
      size: 'xl'
    };
    this.alertModalRef = this._modalService.open(content, options);
    this.closeAlert(id);
  }

  closeModal() {
    this.alertModalRef.close();
  }

  closeAlert(id: string): void {
    const element = this._elem.nativeElement.querySelector(`.alert-item-${id}`);
    if (element) {
      this._renderer.addClass(element, `d-none`);
    }
    this._alertService.hide(id);
  }
}
