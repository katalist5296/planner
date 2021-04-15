import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Day} from '../../domain/day.domain';
import {CalendarService} from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public monthWeeks: any[];
  public monthNumber: number;
  public year: number;

  @Output() onDayClicked = new EventEmitter<any>();


  constructor(public calendarService: CalendarService) {}

  ngOnInit(): void {
    this.monthNumber = this.calendarService.getCurrentMonthIndex();
    this.year = this.calendarService.getCurrentYear();

    this.setMonthWeeks(this.calendarService.getCurrentMonth());
    this.onDayClick(this.calendarService.getCurrentDay());
  }

  onCurrentMonth(): void {
    this.monthNumber = this.calendarService.getCurrentMonthIndex();
    this.year = this.calendarService.getCurrentYear();

    this.setMonthWeeks(this.calendarService.getMonth(this.monthNumber, this.year));
    this.onDayClick(this.calendarService.getCurrentDay());
  }

  onNextMonth(): void {
    this.monthNumber++;

    if (this.monthNumber === 12) {
      this.monthNumber = 0;
      this.year++;
    }

    this.setMonthWeeks(this.calendarService.getMonth(this.monthNumber, this.year));
  }

  onPreviousMonth(): void{
    this.monthNumber--;

    if (this.monthNumber < 0) {
      this.monthNumber = 11;
      this.year--;
    }

    this.setMonthWeeks(this.calendarService.getMonth(this.monthNumber, this.year));
  }

  onDayClick(day: Day): void {
    this.onDayClicked.emit(day);
  }

  private setMonthWeeks(weeks: any[]): void {
    this.monthWeeks = weeks;
  }
}
