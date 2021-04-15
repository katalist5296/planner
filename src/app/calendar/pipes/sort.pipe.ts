import { Pipe, PipeTransform } from '@angular/core';
import {Event} from '../../core/domain/event.domain';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: Event[]): Event[] {
    if (!Array.isArray(array)) {
      return;
    }

    array.sort((a: any, b: any) => a.time < b.time ? -1 : 1);
    return array;
  }

}
