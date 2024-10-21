import { inject,Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlbumDetails, AlbumResponse } from '../models/albums';
import { SpotifyService } from './spotify.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private spotifyService: SpotifyService) {}
  private _snackBar = inject(MatSnackBar);
  isBottom: boolean = false;
  searchQuery: string = '';
  limit: number = 8;
  offset: number = 0;
  totalResults: number = 0;
  albums$: BehaviorSubject < AlbumDetails[] > = new BehaviorSubject < AlbumDetails[] > ([]);
  currentAlbums: AlbumDetails[] = [];
  isLoading$ = new BehaviorSubject < boolean > (false);
  recentAlbumsSearch$: BehaviorSubject < string[] > = new BehaviorSubject < string[] > ([]);
  readonly MAX_RECENT_ALBUMS: number = 5;

  onSearchQuery(query: string) {
    this.resetOffset();
    this.searchQuery = query;
    this.loadMoreAlbums();
  }

  loadAlbums(albums: AlbumDetails[]) {
    this.currentAlbums = this.currentAlbums ? [...this.currentAlbums, ...albums] : albums;
    this.albums$.next(this.currentAlbums);
  }

  resetAlbums() {
    this.searchQuery = '';
    this.currentAlbums = [];
    this.albums$.next([]);
    this.isLoading$.next(false);
  }

  incrementOffset() {

    this.offset += this.limit;
    if (this.offset > this.totalResults) {
      this.offset = this.totalResults;
    }
    if (this.offset == this.totalResults) {
      this.isBottom = true;
      this.showErrorNotification("No More Results");
    }
  }

  resetOffset() {
    this.offset = 0;
    this.resetAlbums();
  }

  loadMoreAlbums(): void {
    if (!this.searchQuery) {
      this.albums$.next([]);
      return
    }

    this.isLoading$.next(true);
    this.spotifyService.getAlbumsApi(this.searchQuery, this.limit, this.offset).subscribe(({
      albums
    }: AlbumResponse) => {

      if (albums.next) {
        this.loadAlbums(albums.items);
      }
      this.isLoading$.next(false);
      this.totalResults = albums.total;
    })
  }

  pushItemInQueue(item: string) {
    this.recentAlbumsSearch$.next([item, ...this.recentAlbumsSearch$.getValue()].slice(0, this.MAX_RECENT_ALBUMS))
    const recentAlbumsStorage = this.recentAlbumsSearch$.getValue();
    localStorage.setItem('recentAlbumsStorage', JSON.stringify(recentAlbumsStorage))
  }

  loadRecentResult() {
    const recentAlbumsStorage = localStorage.getItem('recentAlbumsStorage');
    if (recentAlbumsStorage) {
      this.recentAlbumsSearch$.next(JSON.parse(recentAlbumsStorage))
    }
  }

  removeRecentResult(index: number) {
    const recentAlbumsStorage = localStorage.getItem('recentAlbumsStorage');
    if (recentAlbumsStorage) {
      const recentAlbumsStorageParse: [] = JSON.parse(recentAlbumsStorage);
      recentAlbumsStorageParse.splice(index, 1);
      this.recentAlbumsSearch$.next(recentAlbumsStorageParse)
      localStorage.setItem('recentAlbumsStorage', JSON.stringify(recentAlbumsStorageParse))
    }
  }

  private showErrorNotification(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['info-snackbar']
    });
  }
}