import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class User {

    // BehaviorSubject stores the current user ID and emits updates
  private userIdSource = new BehaviorSubject<number | null>(null);
  userId$ = this.userIdSource.asObservable();
 // private _userId: number | null = null;

  // setUserId(id: number) {
  //   this._userId = id;
  // }

    // Set the user ID
  setUserId(id: number) {
    this.userIdSource.next(id);
  }

  // getUserId(): number | null {
  //   return this._userId;
  // }

   // Get the current value (optional)
  getUserId(): number | null {
    return this.userIdSource.value;
  }

}


