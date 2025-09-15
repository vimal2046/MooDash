import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Moodle } from '../../services/moodle';
import { User } from '../../services/user';
import { CourseCard } from '../../components/course-card/course-card';
import { Spinner } from '../../shared/spinner/spinner';
import { CourseHeaderControls } from '../../shared/course-header-controls/course-header-controls';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    CourseCard,
    Spinner,
    CourseHeaderControls,
    MatProgressSpinnerModule
  ],
  templateUrl: './courses.html',
  styleUrls: ['./courses.scss']
})
export class Courses implements OnInit {
  private moodle = inject(Moodle);
  constructor(private userService: User) {}

  courses: any[] = [];
  filteredCourses: any[] = [];
  loading = true;
  error = '';

  private searchTerm = '';
  private sortBy = 'relevance';

  ngOnInit() {
    const currentUserId = this.userService.getUserId();
    if (currentUserId) {
      this.loadCourses(currentUserId);
    }

    this.userService.userId$.subscribe(userId => {
      if (userId) {
        this.loadCourses(userId);
      }
    });
  }

  private loadCourses(userId: number) {
    this.loading = true;
    this.error = '';

    this.moodle.getUserCourses(userId).subscribe({
      next: (data) => {
        this.courses = data;
        this.applyFilters();   // 👈 filter immediately
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
        list.sort((a, b) => (b.startdate || b.timecreated || 0) - (a.startdate || a.timecreated || 0));
        break;
      case 'oldest':
        list.sort((a, b) => (a.startdate || a.timecreated || 0) - (b.startdate || b.timecreated || 0));
        break;
      case 'az':
        list.sort((a, b) => (a.fullname || '').localeCompare(b.fullname || ''));
        break;
      case 'za':
        list.sort((a, b) => (b.fullname || '').localeCompare(a.fullname || ''));
        break;
    }

    this.filteredCourses = list;
  }

  onOpen(course: any) {
    console.log("Open course", course);
    // TODO : navigate to course detail page
  }
}
