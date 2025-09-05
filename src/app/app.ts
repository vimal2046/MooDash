import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Moodle } from './services/moodle';
import { User } from './services/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar], // Root component includes RouterOutlet and Navbar
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  // Temporary hardcoded user ID for testing
  private testUserId = 4;

  constructor(private moodle: Moodle, private userService: User) {}

  ngOnInit() {
    // Fetch site information from Moodle when the app starts
    this.moodle.getSiteInfo().subscribe({
      next: (info) => {
        console.log("Site Info", info);

        // Normally, we would set the logged-in user's ID
        // this.userService.setUserId(info.userid);

        // For testing purposes, override with fixed ID (2)
        this.userService.setUserId(this.testUserId);

        // Store the profile image globally so other components can access it
        this.userService.setProfileImage(info.userpictureurl);
      },
      error: (err) => {
        console.error("Failed to fetch site info:", err);
      }
    });
  }

  // Angular signal for reactivity (used here for the application title)
  protected readonly title = signal('MooDash');
}
