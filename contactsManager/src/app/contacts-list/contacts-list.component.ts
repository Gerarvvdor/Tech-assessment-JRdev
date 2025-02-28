import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ContactCardComponent } from "../contact-card/contact-card.component";
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  imports: [MatListModule, MatDividerModule, ContactCardComponent, ContactFormComponent],
  styleUrl: './contacts-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsListComponent {
  contacts = [{
    name: 'John',
    lastName: 'Doe',
    phoneNumber: '',
    email: ''
  }
];

  constructor(private router: Router) { }

  openForm() {
    this.router.navigate(['/contact form']);
  }

  closeForm() {
    console.log('Form closed');
  }
}
