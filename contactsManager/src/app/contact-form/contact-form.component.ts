import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';

/** @title Simple form field */
@Component({
  selector: 'app-contact-form',
  templateUrl: 'contact-form.component.html',
  styleUrl: 'contact-form.component.css',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  constructor(private router: Router){}

  closeForm() {
    this.router.navigate(['/']);
  }
}
