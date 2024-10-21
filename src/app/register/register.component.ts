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

export interface RegisterDialogData {
  email: string;
  password: string;
  repassword: string;
};
@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})


export class RegisterDialogComponent {
  
  @Inject(MAT_DIALOG_DATA) public data: RegisterDialogData = {} as RegisterDialogData;
  constructor(public dialogRef: MatDialogRef<RegisterDialogComponent>) { }

}
