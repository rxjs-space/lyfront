import { Injectable } from '@angular/core';

@Injectable()
export class TimeCalculationService {
  oneDayMS = 1000 * 60 * 60 * 24;
  constructor() { }

  /**
   * return an array of Monday dates of specified weeks
   */
  lastMondays(weeks) {
    const today = (new Date());
    const onedayMS = 1000 * 60 * 60 * 24;
    const todayDay = today.getUTCDay();
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


  getDaysAgoDate(startDay, days) {
    // startDay = new Date();
    const onedayMS = 1000 * 60 * 60 * 24;
    const daysAgoMS = new Date(Date.parse(startDay) - onedayMS * days);
    return daysAgoMS.toISOString().slice(0, 10);
  }

  getTodayDateBeijing() {
    const today = new Date();
    let timeWithBeijingDate;
    const uHours = today.getUTCHours();
    switch (true) {
      case uHours >= 16:
        timeWithBeijingDate = new Date(Date.parse(today.toString()) + this.oneDayMS);
        break;
      default:
        timeWithBeijingDate = today;
    }
    return timeWithBeijingDate.toISOString().substring(0, 10);
  }

}
