import { Routes } from '@angular/router';
import { projectDetailsResolver } from './core/resolver/project-details.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent), title: 'Home' },
  { path: 'project', loadComponent: () => import('./pages/projects/projects.component').then(c => c.ProjectsComponent), title: ' Projects' },
  {path : 'project/details/:id' , resolve : {  data :projectDetailsResolver}  , loadComponent: ()=> import('./pages/project-details/project-details.component').then(c=>c.ProjectDetailsComponent) , title : 'Project Details'} ,
  { path: 'contact-us', loadComponent: () => import('./pages/contact-us/contact-us.component').then(c => c.ContactUsComponent), title: ' Contact Us' },
  { path: '**', loadComponent: () => import('./pages/notfound/notfound.component').then(c => c.NotfoundComponent), title: ' Not Found' }
];
