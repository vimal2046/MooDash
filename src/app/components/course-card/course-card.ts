import { NgIf, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { StripHtmlPipe } from '../../pipes/strip-html-pipe';

@Component({
  selector: 'app-course-card',
  imports: [NgIf, CommonModule, MatTooltipModule,StripHtmlPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.scss'
})
export class CourseCard {
  @Input() course:any;
  @Input() token =  '';
  @Output() open = new EventEmitter<any>();
  @Output() addToCart = new EventEmitter<any>();
  @Input() mode: 'my' | 'all' = 'my';


  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '/images/course.jpg';
  }

  getTrimmedSummary(summary: string): string {
    if (!summary) return "No Description available";
    const plainText = summary.replace(/<[^>]+>/g,'');
    const firstStopIndex = plainText.indexOf('.');
    return firstStopIndex !== -1
    ? plainText.substring(0, firstStopIndex + 1)
    : plainText;
  }
}
