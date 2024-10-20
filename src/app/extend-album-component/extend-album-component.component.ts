import { Component } from '@angular/core';
import { AlbumDetails } from '../models/albums';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-extend-album-component',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './extend-album-component.component.html',
  styleUrl: './extend-album-component.component.scss'
})
export class ExtendAlbumComponentComponent {
  album: AlbumDetails | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Method 1: Retrieve state data
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.album = navigation.extras.state['album'];
    }
  }
}
