import {Component} from '@angular/core';
import {AlertService} from '@shared/components/alert/alert.service';
import {AlertModel} from '@shared/models/alert.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'toast-message';

  constructor(private _alertService: AlertService) {
  }

  showAlert(): void {
    const data: AlertModel = {
      message: 'Testando mensagem.',
      title: 'Titulo',
      color: 'success'
    };
    this._alertService.show(data);
  }
}
