import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,map,switchMap,forkJoin } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class Moodle {
  private http = inject(HttpClient);
  //Moodle base URL
  private baseUrl = "https://lms.aaludradevelopers.com/webservice/rest/server.php";
  private token = "ebefc8da31d60e88355709ecd3f7fafb";

  //Get user Enrolled Courses
  getUserCourses(userId:number):Observable<any> {
    const url = `${this.baseUrl}?wstoken=${this.token}&wsfunction=core_enrol_get_users_courses&moodlewsrestformat=json&userid=${userId}`;
    return this.http.get(url);
  }
  // 1. Get all categories
  getCategories(): Observable<any[]> {
    const url = `${this.baseUrl}?wstoken=${this.token}&wsfunction=core_course_get_categories&moodlewsrestformat=json`;
    return this.http.get<any[]>(url);
  }

  // 2. Get courses inside a category (with courseimage)
  getCoursesByCategory(categoryId: number): Observable<any[]> {
    const url = `${this.baseUrl}?wstoken=${this.token}&wsfunction=core_course_get_courses_by_field&moodlewsrestformat=json&field=category&value=${categoryId}`;
    return this.http.get<any>(url).pipe(
      map(res => res.courses || [])
    );
  }

    // 3. Get ALL courses across categories (merged into one array)
  getAllCoursesWithImages(): Observable<any[]> {
    return this.getCategories().pipe(
      switchMap(categories => {
        const requests = categories.map(cat => this.getCoursesByCategory(cat.id));
        return forkJoin(requests);
      }),
      map(results => results.flat()) // merge arrays into one
    );
  }


  

  //Get User Profile
  getUserProfile(userId: number):Observable<any>{
    const url = `${this.baseUrl}?wstoken=${this.token}&wsfunction=core_user_get_users_by_field&moodlewsrestformat=json&field=id&values[0]=${userId}`;
    return this.http.get(url);
  }

  getSiteInfo(): Observable<any> {
  const url = `${this.baseUrl}?wstoken=${this.token}&wsfunction=core_webservice_get_site_info&moodlewsrestformat=json`;
  return this.http.get(url);
}
updateUser(user: any): Observable<any> {
  const url = `${this.baseUrl}?wstoken=${this.token}&wsfunction=core_user_update_users&moodlewsrestformat=json`;

  const body = new URLSearchParams();
  body.set('users[0][id]', user.id);
  if (user.firstname) body.set('users[0][firstname]', user.firstname);
  if (user.lastname) body.set('users[0][lastname]', user.lastname);
  if (user.email) body.set('users[0][email]', user.email);
  if (user.city) body.set('users[0][city]', user.city);
  if (user.country) body.set('users[0][country]', user.country);
  if (user.phone1) body.set('users[0][phone1]', user.phone1);
  if (user.phone2) body.set('users[0][phone2]', user.phone2);
  if (user.institution) body.set('users[0][institution]', user.institution);
  if (user.department) body.set('users[0][department]', user.department);
  if (user.description) body.set('users[0][description]', user.description);
  if (user.lang) body.set('users[0][lang]', user.lang);

  return this.http.post(url, body.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
}

}
