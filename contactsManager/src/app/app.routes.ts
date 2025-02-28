import { Routes } from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'contact form',
    component: ContactFormComponent
  },{
    path: 'root',
    component: AppComponent
  }
];
