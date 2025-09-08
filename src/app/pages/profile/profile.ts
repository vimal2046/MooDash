import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Moodle } from '../../services/moodle';
import { User } from '../../services/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [DatePipe,FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  user: any = null;
  loading = true;
  error: string | null = null;

  constructor(private moodle: Moodle, private userService: User) {}

  ngOnInit() {
    // Load immediately if a userId already exists
    const currentUserId = this.userService.getUserId();
    if (currentUserId) {
      this.loadProfile(currentUserId);
    }

    // Subscribe to userId changes for future updates
    this.userService.userId$.subscribe(userId => {
      if (userId) {
        this.loadProfile(userId);
      }
    });
  }

  private loadProfile(userId: number) {
    this.loading = true;
    this.error = null;

    this.moodle.getUserProfile(userId).subscribe({
      next: (data) => {
        this.user = Array.isArray(data) ? data[0] : data;
        this.userService.setProfileImage(this.user?.profileimageurl || null); // update service
        this.loading = false;
      },
      error: (err) => {
        console.error("Profile API error:", err);
        this.error = "Failed to load profile";
        this.loading = false;
      }
    });
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'images/profile.jpg';
  }

  enableEdit = false; // default view-only mode

toggleEdit() {
  this.enableEdit = !this.enableEdit;
}

  
}
