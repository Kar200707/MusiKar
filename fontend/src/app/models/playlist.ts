export interface Playlist {
  playlists: [
    {
      id?: string;
      playlist_name: string;
      tracks: [
        {
          image: string;
          name: string;
          artist: string;
          src: string;
        }
      ]
    }
  ]
}
