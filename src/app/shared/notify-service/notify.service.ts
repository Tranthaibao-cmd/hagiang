import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  // private _notify = new BehaviorSubject(undefined);
  // private _notify = 'toan';
  // constructor() { }
  // get notify(){
  //   return this._notify;
  // }
  // set notify(notify){
  //   this._notify = notify;
  //   setTimeout(this._notify = '', 2250);
  // }
  // getNotify():Observable<string>{
  //   return of(this.notify);
  // }
  public name = '';
}
