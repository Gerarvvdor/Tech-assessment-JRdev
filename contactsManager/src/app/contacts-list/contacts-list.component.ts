import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Contacts } from "../../Data/Contacts";

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css'],
  imports: [MatListModule, MatDividerModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatCardModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsListComponent implements OnInit {

  contacts = Contacts;

  readonly dialog = inject(MatDialog);
  readonly cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loadContacts();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { name: '', lastName: '', phoneNumber: '', email: '' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.id = this.contacts.length ? Math.max(...this.contacts.map(c => c.id)) + 1 : 1;
        this.contacts.push(result);
        this.saveContacts();
        this.cdr.markForCheck();
      }
    });
  }

  deleteContact(id: number): void {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    this.saveContacts();
    this.cdr.markForCheck();
  }

  loadContacts() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.contacts = JSON.parse(contacts);
    }
  }

  saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  searchContact(Contacts: any, searchText: string): any {
    if (!searchText) {
      return Contacts;
    }
    return Contacts.filter((contact: any) => {
      return contact.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });

  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
    <div mat-dialog-content id="dialog-content">
      <p>Información de contacto</p>
      <div class="contact-info">
        <mat-form-field>
          <input matInput [(ngModel)]="name" placeholder="Nombre">
        </mat-form-field>
        <mat-form-field>
          <input matInput [(ngModel)]="lastName" placeholder="Apellido">
        </mat-form-field>
        <mat-form-field>
          <input matInput [(ngModel)]="phoneNumber" placeholder="Número de teléfono">
        </mat-form-field>
        <mat-form-field>
          <input matInput [(ngModel)]="email" placeholder="Email (opcional)">
        </mat-form-field>
      </div>
    </div>
    <div mat-dialog-actions id="dialog-actions">
      <button mat-button (click)="onNoClick()" id="cancelButton">Cancelar</button>
      <button mat-button [mat-dialog-close]="{ name: name, lastName: lastName, phoneNumber: phoneNumber, email: email }" id="saveButton">Guardar</button>
    </div>
  `,
  styles: `
    #dialog-content {
      display: flex;
      flex-direction: column;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .contact-info {
      display: flex;
      flex-direction: column;
    }
    #dialog-actions {
      display: flex;
      justify-content: space-between;
      background-color: #3674B5;
    }
    button {
      border-radius: 5px;      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

    }
    #cancelButton {
      background-color: #F44336;
      color: white;
    }
    #saveButton {
      background-color: #4CAF50;
      color: white;
    }
  `,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogOverviewExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject(MAT_DIALOG_DATA);
  name = this.data.name;
  lastName = this.data.lastName;
  phoneNumber = this.data.phoneNumber;
  email = this.data.email;

  onNoClick(): void {
    this.dialogRef.close();
  }
}
