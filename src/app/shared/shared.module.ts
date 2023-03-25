import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertComponent} from './components/alert/alert.component';
import {NgxJsonViewerModule} from 'ngx-json-viewer';


@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    NgxJsonViewerModule
  ],
  exports: [
    AlertComponent
  ]
})
export class SharedModule {
}
