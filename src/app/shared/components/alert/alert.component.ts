import {Component, ElementRef, OnInit, Renderer2, TemplateRef} from '@angular/core';
import {Observable} from "rxjs";
import {AlertService} from "@shared/components/alert/alert.service";
import {AlertModel} from "@shared/models/alert.model";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  alerts$!: Observable<AlertModel[]>;
  details!: any;

  constructor(
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

  closeAlert(id: string): void {
    const element = this._elem.nativeElement.querySelector(`.alert-item-${id}`);
    if (element) {
      this._renderer.addClass(element, `d-none`);
    }
    this._alertService.hide(id);
  }
}
