import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class EventListenersService {
  listeners = {};
  constructor() { }
  add(name): SubjectWithRemove<any> {
    if (!this.listeners[name]) {
      this.listeners[name] = new Subject();
      const listeners = this.listeners;
      this.listeners[name].remove = () => {
        delete listeners[name];
      };
    }
    return this.listeners[name];
  }

  getListener(name) {
    return this.listeners[name];
  }
}

export interface SubjectWithRemove<T> extends Subject<T> {
  remove: () => {};
}
