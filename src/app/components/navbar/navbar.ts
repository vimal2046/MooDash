import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../services/user';


@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {
     profileImage = 'images/profile.jpg';

  constructor(private userService: User) {}

  ngOnInit() {
    // subscribe to profile image updates
    this.userService.profileImage$.subscribe(img => {
      this.profileImage = img || 'images/profile.jpg';
    });
  }
}
