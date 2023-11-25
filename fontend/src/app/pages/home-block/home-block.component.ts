import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RequestPlaylistsService} from "../../services/request/request-playlists.service";
import {Playlist} from "../../models/playlist";
import {PlayerControllerService} from "../../services/player-controller/player-controller.service";

@Component({
  selector: 'app-home-block',
  templateUrl: './home-block.component.html',
  styleUrls: ['./home-block.component.css'],
  imports: [
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class HomeBlockComponent {
  data!: Playlist;

  constructor(private reqServ: RequestPlaylistsService, private audioCortroller: PlayerControllerService) {
    this.reqServ.get<Playlist>('https://api.jsonstorage.net/v1/json/3ff0aeb0-3882-45af-b246-783f4d0d619b/bf2e0b28-8302-4b1d-a490-5b775c7dc200')
      .subscribe((item: Playlist):void =>{
        this.data = item;
      })
  }

  selectTrack(index: number):void {
    this.audioCortroller.audioSrc = this.data.playlists[0].tracks[index].src
    this.audioCortroller.audioName = this.data.playlists[0].tracks[index].name
    this.audioCortroller.audioArtist = this.data.playlists[0].tracks[index].artist
    this.audioCortroller.audioImg = this.data.playlists[0].tracks[index].image

    this.audioCortroller.loadTrack(this.audioCortroller.audioSrc);
    this.audioCortroller.playAudio();
  }
}
