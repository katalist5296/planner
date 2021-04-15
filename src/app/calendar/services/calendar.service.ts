import { Injectable } from '@angular/core';
import {Day} from '../domain/day.domain';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private readonly currentYear: number;
  private readonly currentMonthIndex: number;
  private readonly currentDay: number;

  public readonly monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель',
    'Май', 'Июнь', 'Июль', 'Август',
    'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабарь'
  ];

  public readonly monthRusNames = [
    'Января', 'Февраля', 'Марта', 'Апреля',
    'Мая', 'Июня', 'Июля', 'Августа',
    'Сентября', 'Октября', 'Ноября', 'Декабаря'
  ];

  public readonly dayNames = [
    'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг',
    'Пятница', 'Суббота'
  ];

  public readonly dayAbbrNames = [
    'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'
  ];

  constructor() {
    const date = new Date();
    this.currentYear = date.getFullYear();
    this.currentMonthIndex = date.getMonth();
    this.currentDay = date.getDate();
  }

  public generateDayId(day: number, month: number, year: number): string {
    return `${day}${month}${year}`;
  }

  public getCurrentMonthIndex(): number {
    return this.currentMonthIndex;
  }

  public getCurrentYear(): number {
    return this.currentYear;
  }

  public getCurrentDay(): Day {
    return this.createDay(this.currentDay, this.currentMonthIndex, this.currentYear);
  }

  public getCurrentMonth(): any[] {
    return this.getMonth(this.currentMonthIndex, this.currentYear);
  }

  public getMonth(monthIndex: number, year: number): any[] {
    let weeks = [];
    const days = [];

    const firstday = this.createDay(1, monthIndex, year);

    // create empty days
    for (let i = 1; i < firstday.weekDayNumber; i++) {
      days.push({
        weekDayNumber: i,
        monthIndex,
        year,
      } as Day);
    }
    days.push(firstday);
    //

    const countDaysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    for (let i = 2; i < countDaysInMonth + 1; i++) {
      days.push(this.createDay(i, monthIndex, year));
    }

    const lastDayCount = days.length;
    if (lastDayCount < 36) {
      for (let i = 1; i < 36 - lastDayCount; i++) {
        days.push({
          weekDayNumber: i,
          monthIndex,
          year,
        } as Day);
      }
    }

    let week = [];
    for (const day of days) {
      week.push(day);

      if (week.length === 7) {
        weeks = [...weeks, [...week]];
        week = [];
      }
    }

    return weeks;
  }

  public getMonthName(monthIndex: number): string {
    return this.monthNames[monthIndex];
  }

  public getMonthRusName(monthIndex: number): string {
    return this.monthRusNames[monthIndex];
  }

  public getWeekDayAbbrName(weekDay: number): string {
    return this.dayAbbrNames[weekDay];
  }

  public getWeekDayName(weekDay: number): string {
    return this.dayNames[weekDay];
  }

  public getWeekDaysName(): string[] {
    return this.dayAbbrNames;
  }

  private createDay(dayNumber: number, monthIndex: number, year: number): Day {
    const day = new Day();

    day.monthIndex = monthIndex;
    day.month = this.getMonthName(monthIndex);
    day.monthLocale = this.getMonthRusName(monthIndex);

    day.number = dayNumber;
    day.year = this.currentYear;

    day.weekDayNumber = new Date(year, monthIndex, dayNumber).getDay();
    day.weekDayName = this.getWeekDayName(day.weekDayNumber);

    return day;
  }
}
