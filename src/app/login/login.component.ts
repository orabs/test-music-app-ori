import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

export interface LoginDialogData {
  email: string;
  password: string;
};
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginDialogComponent {

  @Inject(MAT_DIALOG_DATA) public data: LoginDialogData = {} as LoginDialogData;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>) {}
}