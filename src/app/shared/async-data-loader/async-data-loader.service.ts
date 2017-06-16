import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AsyncDataLoaderService {
  dataLoadedRxx = new BehaviorSubject({});

  constructor() { }

  feed(source: string, item: string, data: any) {
    const currentData = this.dataLoadedRxx.getValue();
    if (!currentData[source]) {currentData[source] = {}; }
    currentData[source][item] = data;
    this.dataLoadedRxx.next(currentData);
  }

  isLoadedRxxFac(source: string, items: string[]) {
    return this.dataLoadedRxx.map(data => {
      if (!data[source]) {return false; }
      let isLoaded = true;
      for (const item of items) {
        if (!data[source][item]) {
          isLoaded = false;
          break;
        }
      }
      return isLoaded;
    });
  }

  hasErrorRxxFac(source: string, items: string[]) {
    return this.dataLoadedRxx.map(data => {
      if (!data[source]) {return false; }
      let hasError = false;
      for (const item of items) {
        if (data[source][item] && data[source][item]['error']) {
          hasError = true;
          break;
        }
      }
      return hasError;
    });
  }

  getDataRxxFac(source: string, items: string[]) {
    return this.dataLoadedRxx.map(data => {
      if (!data[source]) {return null; }
      const ddata = {};
      for (const item of items) {
        ddata[item] = data[source][item];
      }
      return ddata;
    });
  }

  destroy(source) {
    const currentData = this.dataLoadedRxx.getValue();
    currentData[source] = null;
    this.dataLoadedRxx.next(currentData);
  }

}
