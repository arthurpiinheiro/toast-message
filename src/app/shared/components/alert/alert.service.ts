import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {AlertModel} from "@shared/models/alert.model";

@Injectable({
  providedIn: 'root'
})
export class AlertService {


  alertStateSubject: Subject<AlertModel[]> = new Subject<AlertModel[]>();
  timers: Array<AlertModel> = [];

  show(message: AlertModel, timeOut: boolean = true): void {
    const hash = this.generateHash();
    let timer = {
      ...message,
      id: hash
    };

    if (timeOut) {
      timer = {
        ...timer,
        timeOut: setTimeout(() => {
          this.hide(hash);
        }, 9000)
      };
    }
    this.timers.push(timer);
    this.alertStateSubject.next(this.timers);
  }

  hide(id: string): void {
    if (id) {
      const index = this.findIndex(this.timers, 'id', id);
      if (index !== -1) {
        clearTimeout(this.timers[index].timeOut);
        this.timers.splice(index, 1);
        this.alertStateSubject.next(this.timers);
      }
    }
  }

  stopAll(): void {
    this.timers.forEach((item, i) => {
      clearTimeout(this.timers[i].id);
    });

    this.timers = [];
    this.alertStateSubject.next(this.timers);
  }

  private findIndex(items: any, attr: string, value: any): number {
    for (let i = 0; i < items.length; i += 1) {
      if (items[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  private generateHash(): string {
    const a: any = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
    const b: any = [];
    for (let i = 0; i < 15; i++) {
      const j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
    }
    return b.join('');
  }
}
