import { Injectable } from '@angular/core';

@Injectable()
export class TimeCalculationService {
  constructor() { }

  lastMondays(weeks) {
    const today = (new Date());
    const onedayMS = 1000 * 60 * 60 * 24;
    const todayDay = today.getDay();
    let daysFromLatestMonday;
    switch (todayDay) {
      case 0:
        daysFromLatestMonday = 6;
        break;
      default:
        daysFromLatestMonday = todayDay - 1;
    }
    const latestMondayMS = Date.parse(today.toString()) - onedayMS * daysFromLatestMonday;
    const latestMondayDate: string = (new Date(latestMondayMS)).toISOString().substring(0, 10);
    const latestMondays: string[] = [latestMondayDate];
    for (let i = 2; i <= weeks; i++) {
      const thatMonday = (new Date(latestMondayMS - onedayMS * 7 * (i -1))).toISOString().substring(0, 10);
      latestMondays.unshift(thatMonday);
    }
    return latestMondays;
  }
}
