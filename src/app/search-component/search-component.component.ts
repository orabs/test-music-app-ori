import { Component, OnInit } from '@angular/core';
import { SpotifySearchService } from '../services/spotify-service.service';
import * as Albums from '../models/Albums';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AlbumDetails } from '../models/Albums';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-search-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [HttpClientModule],
  templateUrl: './search-component.component.html',
  styleUrl: './search-component.component.scss'
})
export class SearchComponentComponent implements OnInit {


  albums$: Subject<AlbumDetails[]> = new Subject();
  searchQuery: string = '';
  constructor(private spotifyService: SpotifySearchService){}
  
  ngOnInit() {
    this.spotifyService.getAccessToken().subscribe((data: any) => {
      this.spotifyService.setToken(data.access_token)
    })
  }
  
  searchAlbum(): void {
    this.spotifyService.searchAlbums(this.searchQuery).subscribe(({albums}) =>{
      this.albums$.next(albums.items);
    })
  }
  
  
}
