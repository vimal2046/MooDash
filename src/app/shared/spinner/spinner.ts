import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  imports: [MatProgressSpinnerModule],
  template: `
       <div class="spinner-container">
        <mat-spinner diameter="50"></mat-spinner>
       </div>
  `,
  styles: `
     .spinner-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
    }
  `
})
export class Spinner {

}
