import { Injectable } from '@angular/core';

export class DayStore {
  constructor(
    public day: number,
    public monthIndex: number,
    public year: number) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class DayStoreService {
  private readonly currentDay: DayStore;
  private selectDay: DayStore;

  constructor() {
    const date = new Date();
    this.currentDay = new DayStore(date.getDate(), date.getMonth(), date.getFullYear());
  }

  public getCurrentDay(): DayStore {
    return this.currentDay;
  }

  public setSelectDay(day: number, month: number, year: number): void {
    this.selectDay = new DayStore(day, month, year);
  }

  public getSelectDay(): DayStore {
    return this.selectDay;
  }
}
