import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Moodle } from '../../services/moodle';
import { User } from '../../services/user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

import { CommonModule, NgIf } from '@angular/common';
import { InvalidHighlightDirective } from "../../directives/invalid-highlight";


@Component({
  selector: 'app-profile',
  imports: [DatePipe, FormsModule, ReactiveFormsModule, NgIf, InvalidHighlightDirective],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {

  profileForm!: FormGroup; //Declared Form Group here

  user: any = null;
  loading = true;
  error: string | null = null;

  constructor(
    private moodle: Moodle,
    private userService: User,
    private fb: FormBuilder
  ) {}

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

      // initialize form with the loaded data
    this.profileForm = this.fb.group({
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      phone1: [this.user?.phone1 || '', [Validators.pattern(/^[0-9]{10}$/)]],
      phone2: [this.user?.phone2 || '', [Validators.pattern(/^[0-9]{10}$/)]],
      address: [this.user?.address || '', Validators.required],
      city: [this.user?.city || '', Validators.required],
      country: [this.user?.country || '', Validators.required],
      institution: [this.user?.institution || '', Validators.required],
      department: [this.user?.department || '', Validators.required],
      description: [this.user?.description || '',Validators.required]
    });

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

updateProfile() {

if(this.profileForm.invalid){
  this.profileForm.markAllAsTouched();
  return;
}

const updatedUser = { ...this.user, ...this.profileForm.value };

  this.moodle.updateUser(updatedUser).subscribe({
    next: () => {
      // Success: fetch fresh profile from Moodle
      this.loadProfile(this.user.id); 
      this.enableEdit = false;
    },
    error: (err) => {
      console.error("Update failed:", err);
      this.error = "Failed to update profile";
    }
  });
}


  
}
