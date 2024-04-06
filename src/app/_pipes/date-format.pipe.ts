import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    return formatDate(value, 'dd/MM/yyyy', 'en-US');
  }
}
