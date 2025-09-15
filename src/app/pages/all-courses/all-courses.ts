import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';
import { Moodle } from '../../services/moodle';
import { CourseHeaderControls } from '../../shared/course-header-controls/course-header-controls';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [
    CommonModule,
    CourseCard,
    CourseHeaderControls,
    MatProgressSpinnerModule
  ],
  templateUrl: './all-courses.html',
  styleUrls: ['./all-courses.scss']
})
export class AllCourses implements OnInit {
  private moodle = inject(Moodle);

  courses: any[] = [];
  filteredCourses: any[] = [];   // 👈 used for displaying filtered list
  loading = true;
  error = '';
  token = 'ebefc8da31d60e88355709ecd3f7fafb';

  // state for filters
  private searchTerm = '';
  private sortBy = 'relevance';

  ngOnInit() {
    this.loadCourses();
  }

  private loadCourses() {
    this.loading = true;
    this.moodle.getAllCoursesWithImages().subscribe({
      next: (data: any[]) => {
        console.log('All courses:', data);
        this.courses = data;
        this.applyFilters();   // 👈 initial filter
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load courses from Moodle';
        this.loading = false;
      }
    });
  }

  onSearch(term: string) {
    this.searchTerm = term || '';
    this.applyFilters();
  }

  onSortChange(sortValue: string) {
    this.sortBy = sortValue || 'relevance';
    this.applyFilters();
  }

  private applyFilters() {
    const term = this.searchTerm.toLowerCase().trim();

    let list = this.courses.filter(c => {
      const title = (c.fullname || '').toLowerCase();
      const summary = (c.summary || '').replace(/<[^>]+>/g, '').toLowerCase();
      return !term || title.includes(term) || summary.includes(term);
    });

    switch (this.sortBy) {
      case 'newest':
        list.sort((a, b) =>
          (b.startdate || b.timecreated || 0) - (a.startdate || a.timecreated || 0)
        );
        break;
      case 'oldest':
        list.sort((a, b) =>
          (a.startdate || a.timecreated || 0) - (b.startdate || b.timecreated || 0)
        );
        break;
      case 'az':
        list.sort((a, b) => (a.fullname || '').localeCompare(b.fullname || ''));
        break;
      case 'za':
        list.sort((a, b) => (b.fullname || '').localeCompare(a.fullname || ''));
        break;
      case 'relevance':
      default:
        // keep original order
        break;
    }

    this.filteredCourses = list;
  }

  onOpen(course: any) {
    console.log('Open course detail', course);
    // TODO: navigate to course detail page
  }

  onAddToCart(course: any) {
    console.log('Added to cart:', course);
    // TODO: hook up with the cart service
  }
}
