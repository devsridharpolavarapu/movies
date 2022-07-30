import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readMore'
})
export class ReadMorePipe implements PipeTransform {

  transform(input: string, length?: number, suffix?: string, wordBreak?: boolean): string;
  transform(input: any, length?: number, suffix?: string, wordBreak?: boolean): any;

  transform(text: any, length: number = 0, suffix: string = '', wordBreak: boolean = true): string {
    if (Object.prototype.toString.call(text) === "[object String]") {
      if (text.length > length) {
        if (wordBreak) {
          return text.slice(0, length) + suffix;
        }

        if (!!~text.indexOf(' ', length)) {
          return text.slice(0, text.indexOf(' ', length)) + suffix;
        }
      }
    }

    return text;
  }

}
