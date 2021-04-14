import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-bottombar',
  templateUrl: './bottombar.component.html',
  styleUrls: ['./bottombar.component.scss']
})
export class BottombarComponent {
  @Input() tabs: string[];
  @Output() onTabSelect: EventEmitter<any> = new EventEmitter();

  onSelect(tab) {
    this.onTabSelect.emit(tab);
  }
}
