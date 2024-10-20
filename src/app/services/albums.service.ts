import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject
} from 'rxjs';
import {
  AlbumDetails
} from '../models/albums';
import {
  SpotifyService
} from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private spotifyService: SpotifyService) {}

  searchQuery: string = '';
  limit: number = 5;
  offset: number = 0
  albums$: BehaviorSubject < AlbumDetails[] > = new BehaviorSubject < AlbumDetails[] > ([]);
  currentAlbums: AlbumDetails[] = [];
  isLoading$ = new BehaviorSubject < boolean > (false);
  setSearchQuery(query: string) {
    this.searchQuery = query;
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
    }) => {

      if (albums.next) {
        this.loadAlbums(albums.items);
      }
      this.isLoading$.next(false);
    })
  }
}
