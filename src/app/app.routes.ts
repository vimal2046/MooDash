import { Routes } from '@angular/router';



export const routes: Routes = [
    {path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home)},
    {path:'all-courses', loadComponent : () => import('./pages/all-courses/all-courses').then(m=> m.AllCourses)},
    {path:'courses', loadComponent:()=> import('./pages/courses/courses').then(m=>m.Courses)},
    {path:'profile', loadComponent:()=>import('./pages/profile/profile').then(m=>m.Profile)},
    
    { path: '**', redirectTo: '' }
];
