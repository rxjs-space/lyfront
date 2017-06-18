import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

/**
 * in refreshData method of the consumer component,
 * feed null to adlService first
 * after received the data or error, feed again;
 * in ngOnDestroy, call destroy method
 */
@Injectable()
export class AsyncDataLoaderService {
  dataLoadedRxx = new BehaviorSubject({});
  holder = {};
  constructor() { }

  init(source: string, itemRxHash: {[key: string]: Observable<any>}) {
    const keys = Object.keys(itemRxHash);
    const latestResultRxxHash = {};
    const isLoadedWithoutErrorRxx = new BehaviorSubject(false);
    const isWithErrorRxx = new BehaviorSubject(false);

    for (const k of keys) {
      latestResultRxxHash[k] = new BehaviorSubject(null);
      itemRxHash[k] = itemRxHash[k]
        .first()
        .catch(error => Observable.of({
          ok: false,
          error
        }))
        .do(r => latestResultRxxHash[k].next(r))
        .startWith('loading')
        .do(r => {
          if (r === 'loading') {
            latestResultRxxHash[k].next(null);
          }
        })
    }

    const latestResultRxxArray = keys.map(k => latestResultRxxHash[k]);
    Observable.combineLatest(latestResultRxxArray)
      .subscribe(resultArray => {
        console.log(resultArray);
        let isWithError = false;
        for (const result of resultArray) {
          if (result && result.error) {
            isWithError = true;
            break;
          }
        }
        isWithErrorRxx.next(isWithError);

        let isLoadedWithOutError = true;
        for (const result of resultArray) {
          if (!result || result.error) {
            isLoadedWithOutError = false;
            break;
          }
        }
        isLoadedWithoutErrorRxx.next(isLoadedWithOutError);
      })

    const refreshAll = () => {
      if (!itemRxHash) {throw new Error(`no itemRxHash for ${source}`); }
      for (const k of keys) {
        itemRxHash[k].subscribe();
      }
    }

    const refreshByTitle = (title: string) => {
      if (!title) {throw new Error('no title param provided'); }
      if (!itemRxHash) {throw new Error(`no itemRxHash for ${source}`); }
      if (!itemRxHash[title]) {throw new Error(`no itemRx with title as ${title}`); }
      itemRxHash[title].subscribe();
    }

    this.holder[source] = {
      latestResultRxxHash,
      isLoadedWithoutErrorRxx,
      isWithErrorRxx,
      refreshAll,
      refreshByTitle
    }

    return this.holder[source];
  }


  destroy2(source: string) {
    this.holder[source] = null;
  }


  feed(source: string, item: string, data: any) {
    const currentData = this.dataLoadedRxx.getValue();
    if (!currentData[source]) {currentData[source] = {}; }
    currentData[source][item] = data;
    this.dataLoadedRxx.next(currentData);
  }

  /**
   * data is loaded without error
   */
  isLoadedRxxFac(source: string, items: string[]) {
    return this.dataLoadedRxx.map(data => {
      if (!data[source]) {return false; }
      let isLoaded = true;
      for (const item of items) {
        if (!data[source][item] || data[source][item]['error']) {
          isLoaded = false;
          break;
        }
      }
      return isLoaded;
    });
  }

  /**
   * data loading failed with error
   */
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
