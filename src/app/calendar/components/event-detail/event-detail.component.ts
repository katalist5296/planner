import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Event} from '../../../core/domain/event.domain';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {Day} from "../../domain/day.domain";
import {CalendarService} from "../../services/calendar.service";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  form: FormGroup;

  @Input()
  event: Event;

  @Input()
  date: string;

  @Input()
  isCreate: boolean;

  @Output()
  onCancel = new EventEmitter<any>();

  @Output()
  onDelete = new EventEmitter<any>();

  @Output()
  onUpdate = new EventEmitter<Event>();

  @Output()
  onAdd = new EventEmitter<Event>();

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [this.event.text || '', Validators.required],
      time: [this.event.time || '', Validators.required]
    });
  }

  handleSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const { title, time } = this.form.controls;
    this.event.text = title.value;
    this.event.time = time.value;
    this.event.date = this.date;

    this.isCreate ? this.onAdd.emit(this.event) : this.onUpdate.emit(this.event);
  }

  handleCancel(): void {
    this.onCancel.emit();
  }

  handleDelete(): void {
    this.onDelete.emit(this.event.id);
  }
}
