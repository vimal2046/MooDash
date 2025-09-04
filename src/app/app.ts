import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Moodle } from './services/moodle';
import { User } from './services/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private testUserId = 3;
  constructor (private moodle:Moodle, private userService:User){}
  ngOnInit(){
      this.moodle.getSiteInfo().subscribe({
        next: (info) => {
          console.log("Site Info", info);
         // this.userService.setUserId(info.userid);//set global userId
         this.userService.setUserId(this.testUserId);
          this.userService.setProfileImage(info.userpictureurl); // set global image
        },
        error:(err)=>{
          console.error("Failed to fetch site info:", err);
        }
      })
  }
  protected readonly title = signal('MooDash');
}
