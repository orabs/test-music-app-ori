import { Component, Input } from '@angular/core';
import { AlbumDetails } from '../models/albums';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-album-component',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './basic-album-component.component.html',
  styleUrl: './basic-album-component.component.scss'
})
export class BasicAlbumComponentComponent {

  constructor(private router: Router){}
  @Input() album!: AlbumDetails;

  navigateToDetails(album: AlbumDetails){
    this.router.navigate(['/album', album.id], {
      state: { album: album }
    });
  }
}
