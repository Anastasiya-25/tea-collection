import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'text'
})
export class TextPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (value.length <= 80) {
      return value;
    } else {
      const text: string = value.substring(0, 80);
      return text + '...';
    }
  }

}
