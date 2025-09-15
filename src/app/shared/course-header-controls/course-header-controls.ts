import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-course-header-controls',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelect, 
    MatOption
  ],
  templateUrl: './course-header-controls.html',
  styleUrl: './course-header-controls.scss'
})
export class CourseHeaderControls implements OnInit, OnDestroy{
    @Input() initialSort = 'relevance';
    @Input() sortOptions = [
      {value: 'relevance', label: "Relevance"},
      {value: 'newest', label: "Newest"},
      {value: 'oldest', label: "Oldest"},
      {value: 'az', label: "A -> Z"},
      {value:'za', label: "Z -> A"}
    ];

    @Output() searchChanged = new EventEmitter<string>();
    @Output() sortChanged = new EventEmitter<string>();


    searchControl = new FormControl('');
    private destroy$  = new Subject<void>();

    ngOnInit(){
      this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this.searchChanged.emit(value || '');
      });
    }

    onSortChange(value:string){
      this.sortChanged.emit(value);
    }

    clearSearch(){
      this.searchControl.setValue('');
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }



}
