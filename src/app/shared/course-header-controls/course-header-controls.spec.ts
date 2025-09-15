import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseHeaderControls } from './course-header-controls';

describe('CourseHeaderControls', () => {
  let component: CourseHeaderControls;
  let fixture: ComponentFixture<CourseHeaderControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseHeaderControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseHeaderControls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
