import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlbumsService } from '../services/albums.service';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register/register.component';
import { LoginDialogComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    FormsModule,
    
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  searchQuery: string = '';
  username!: string;
  password!: string;
  constructor(public dialog: MatDialog, private router: Router, private albumService: AlbumsService,private albumsService: AlbumsService, private authToken: AuthService) { }


  ngOnInit() {
    this.albumService.loadRecentResult();
  }
  onSearch(searchForm: string) {
    this.albumsService.resetOffset();
    this.albumsService.onSearchQuery(searchForm);
    this.albumsService.pushItemInQueue(searchForm);
    this.router.navigate(['/albums']);
  }

  clearSearchInput(searchInputElement: any) {
    searchInputElement.value = '';
  }

  removeSearch(index: number){
    this.albumsService.removeRecentResult(index);
  }
  openRecentMenu() {
    this.menuTrigger.openMenu();
  }

  onRecentClick(value: string){
    this.albumService.onSearchQuery(value);
  }

  get recentAlbumsSearch$() {
    return this.albumService.recentAlbumsSearch$
  }

  openRegisterDialog(){
    const dialogRef = this.dialog.open(RegisterDialogComponent);
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent);
  }

  goHome(){
    this.albumsService.resetOffset();
    this.router.navigate(['/albums']);
  }
}