import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';
import { Moodle } from '../../services/moodle';

@Component({
  selector: 'app-all-courses',
  imports: [CommonModule, CourseCard],
  templateUrl: './all-courses.html',
  styleUrl: './all-courses.scss'
})
export class AllCourses {

  private moodle = inject(Moodle);

  courses: any[] = [];
  loading = true;
  error = ''
  token = 'ebefc8da31d60e88355709ecd3f7fafb'

  ngOnInit(){
    this.loadCourses();
  }


  private loadCourses(){
    this.loading = true;
    this.moodle.getAllCoursesWithImages().subscribe({
      next: (data: any[]) => {
        console.log('All courses:', data);
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

  onOpen(course: any){
    console.log("Open course detail", course);
    //TODO: navigate to course detail page
  }

  onAddToCart(course: any){
    console.log("Added to cart:", course);
    //TODO :  hookUp with the cart service
  }
}


