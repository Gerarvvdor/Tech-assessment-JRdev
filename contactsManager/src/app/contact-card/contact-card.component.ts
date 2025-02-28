import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {Router} from '@angular/router';


/**
 * @title Basic cards
 */
@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.css',
  imports: [MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactCardComponent {
  constructor(private router: Router) {}
  openForm() {
    this.router.navigate(['/contact form']);
  }
}
