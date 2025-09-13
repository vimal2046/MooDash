import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml'
})
export class StripHtmlPipe implements PipeTransform {

 transform(value: string): string {
    if (!value) return '';
    return value.replace(/<[^>]+>/g, ''); // remove HTML tags
  }

}
