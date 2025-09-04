import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
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

  

  //Get User Profile
  getUserProfile(userId: number):Observable<any>{
    const url = `${this.baseUrl}?wstoken=${this.token}&wsfunction=core_user_get_users_by_field&moodlewsrestformat=json&field=id&values[0]=${userId}`;
    return this.http.get(url);
  }

  getSiteInfo(): Observable<any> {
  const url = `${this.baseUrl}?wstoken=${this.token}&wsfunction=core_webservice_get_site_info&moodlewsrestformat=json`;
  return this.http.get(url);
}


}
