import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObservableService {
  private source = new Subject<any>();
  public sourceObv = this.source.asObservable();

  constructor() { }

  public getList(e: any) {
    this.source.next(e);
  }

  public checkNewsLetter(e: any) {
    this.source.next(e);
  }

  public deleteHistory(e: any) {
    this.source.next(e);
  }
}
