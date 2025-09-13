import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Moodle } from '../../services/moodle';
import { User } from '../../services/user';
import { CourseCard } from '../../components/course-card/course-card';
import { Spinner } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-courses',
  imports: [CommonModule,CourseCard,Spinner],
  templateUrl: './courses.html',
  styleUrl: './courses.scss'
})
export class Courses implements OnInit {
  private moodle = inject(Moodle);
  token = 'ebefc8da31d60e88355709ecd3f7fafb';
  courses: any[] = [];
  loading = true;
  error = '';
//Injected User to constructor
  constructor(private userService: User) {}

  //ngOnInit() runs once
  ngOnInit() {
    // Fetch immediately if a userId already exists
    const currentUserId = this.userService.getUserId();
    if (currentUserId) {
      this.loadCourses(currentUserId);
    }

    // Subscribe to userId changes for future updates
    this.userService.userId$.subscribe(userId => {
      if (userId) {
        this.loadCourses(userId);
      }
    });
  }

  private loadCourses(userId: number) {
    this.courses = [];
    this.loading = true;
    this.error = '';

    this.moodle.getUserCourses(userId).subscribe({
      next: (data) => {
        this.courses = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load courses from Moodle';
        this.loading = false;
      }
    });
  }

  // onImageError(event: Event) {
  //   const target = event.target as HTMLImageElement;
  //   target.src = 'images/course.jpg';
  // }

  // // For trimming the summary until first full stop
  // getTrimmedSummary(summary: string): string {
  //   if (!summary) return "No description available.";

  //   // Strip HTML tags first
  //   const plainText = summary.replace(/<[^>]+>/g, '');

  //   // Find the first full stop
  //   const firstStopIndex = plainText.indexOf('.');
  //   if (firstStopIndex !== -1) {
  //     return plainText.substring(0, firstStopIndex + 1);
  //   }

  //   // If no full stop, return the whole summary
  //   return plainText;
  // }

  onOpen(course: any){
    console.log("Open course", course);
    //TODO : navigate to course detail page
  }
}
