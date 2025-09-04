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
  private testUserId = 2;
  constructor (private moodle:Moodle, private userService:User){}
  ngOnInit(){
      this.moodle.getSiteInfo().subscribe({
        next: (info) => {
          console.log("Site Info", info);
          this.userService.setUserId(this.testUserId);//set global userId
        },
        error:(err)=>{
          console.error("Failed to fetch site info:", err);
        }
      })
  }
  protected readonly title = signal('MooDash');
}
