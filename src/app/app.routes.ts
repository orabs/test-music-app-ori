import { Routes } from '@angular/router';
import { MusicAppComponent } from './music-app/music-app.component';
import { ExtendAlbumComponentComponent } from './extend-album-component/extend-album-component.component';

export const routes: Routes = [
 { path: 'albums', component: MusicAppComponent },
 { path: '', component: MusicAppComponent },
 { path: 'album/:id', component: ExtendAlbumComponentComponent },
];
