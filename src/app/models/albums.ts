export interface AlbumResponse {
    href: string;
    items: AlbumDetails[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
}

export interface AlbumDetails {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    href: string;
    id: string;
    images: Image[];
    name: string
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

export interface Artist {
   
    external_urls: string[];
    href: string
    id: string
    name: string
    type: string
    uri: string
}

export interface Image {
    
    url: string;
    height: number;
    width: number;
}      
        
    

