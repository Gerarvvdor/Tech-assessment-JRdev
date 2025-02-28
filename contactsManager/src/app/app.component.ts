import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { ContactsListComponent } from "./contacts-list/contacts-list.component";
import { ContactCardComponent } from "./contact-card/contact-card.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContactsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'contactsManager';
}
