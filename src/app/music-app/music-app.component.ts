import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BasicAlbumComponentComponent } from '../basic-album-component/basic-album-component.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlbumsService } from '../services/albums.service';
import { debounceTime, fromEvent, Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { AlbumDetails } from '../models/albums';
import { SpotifyService } from '../services/spotify.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-music-app',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    BasicAlbumComponentComponent,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './music-app.component.html',
  styleUrl: './music-app.component.scss'
})
export class MusicAppComponent implements OnInit {

  @ViewChild('ResultsContainer') ResultsContainer!: ElementRef;
  private readonly SCROLL_THRESHOLD = 50; // Defined magic number as a constant
  get albums$(): Observable < AlbumDetails[] > {
    return this.albumsService.albums$;
  }

  get isLoading$(): Observable < boolean > {
    return this.albumsService.isLoading$;
  }
  constructor(private authToken: AuthService, private spotifyService: SpotifyService, private albumsService: AlbumsService) {}

  ngOnInit() {
    this.spotifyService.getAccessToken().subscribe((data: any) => {
      this.authToken.setToken(data.access_token);
    })
  }

  ngAfterViewInit(): void {
    fromEvent(this.ResultsContainer.nativeElement, 'scroll').pipe(
      debounceTime(1000)
    ).subscribe(() => {
      const target = this.ResultsContainer.nativeElement;
      if (this.isScrolledToBottom(target)) {
        this.loadMoreAlbums();
      }
    });
  }

  private loadMoreAlbums(): void {

    if (!this.albumsService.isBottom) {
      this.albumsService.incrementOffset();
      this.albumsService.loadMoreAlbums();
    }
  }
  private isScrolledToBottom(element: HTMLElement): boolean {
    return element.scrollHeight - element.scrollTop - element.clientHeight < this.SCROLL_THRESHOLD;
  }
}