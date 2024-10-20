import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BasicAlbumComponentComponent } from '../basic-album-component/basic-album-component.component';
import { AuthService } from '../services/auth.service';
import { AlbumsService } from '../services/albums.service';

@Component({
  selector: 'app-search-component',
  standalone: true,
  imports: [FormsModule, CommonModule, BasicAlbumComponentComponent],
  providers: [HttpClientModule],
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private spotifyService: SpotifyService, private albumsService: AlbumsService, private authToken: AuthService){}

  onSearchKeyUp(event: KeyboardEvent){
    const searchQuery = (event.target as HTMLInputElement).value;
    this.albumsService.resetOffset();
    this.albumsService.searchQuery = searchQuery;
    this.albumsService.loadMoreAlbums()
  }

  ngOnInit() {
    this.spotifyService.getAccessToken().subscribe((data: any) => {
      this.authToken.setToken(data.access_token)
    })
  }
}