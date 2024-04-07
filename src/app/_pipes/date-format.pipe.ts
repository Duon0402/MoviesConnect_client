import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | any): string {
    return formatDate(value, 'yyyy-MM-dd', 'en-US');
  }
}
