import { Component, HostListener } from '@angular/core';
import { SearchComponent } from '../search-component/search-component.component';
import { BasicAlbumComponentComponent } from '../basic-album-component/basic-album-component.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlbumsService } from '../services/albums.service';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { AlbumDetails } from '../models/albums';

@Component({
  selector: 'app-music-app',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    SearchComponent,
    BasicAlbumComponentComponent,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule 
  ],
  templateUrl: './music-app.component.html',
  styleUrl: './music-app.component.scss'
})
export class MusicAppComponent {
  private readonly SCROLL_THRESHOLD = 50; // Defined magic number as a constant

  get albums$(): Observable<AlbumDetails[]> {
    return this.albumsService.albums$;
  }

  get isLoading$(): Observable<boolean> {
    return this.albumsService.isLoading$;
  }
  constructor(private albumsService: AlbumsService){}
  
  onScroll(event: Event): void {
    console.log(event)
    const target = event.target as HTMLElement;
    if (this.isScrolledToBottom(target)){
      this.loadMoreAlbums();
      
    }
  }

  private loadMoreAlbums(): void {
    this.albumsService.incrementOffset();
    this.albumsService.loadMoreAlbums();
  }
  private isScrolledToBottom(element: HTMLElement): boolean {
    return element.scrollHeight - element.scrollTop - element.clientHeight < this.SCROLL_THRESHOLD;
  }

}