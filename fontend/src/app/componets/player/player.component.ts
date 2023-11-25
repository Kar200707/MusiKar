import { Component } from '@angular/core';
import {PlayerControllerService} from "../../services/player-controller/player-controller.service";
import {NgIf} from "@angular/common";
import {RequestPlaylistsService} from "../../services/request/request-playlists.service";
import {Playlist} from "../../models/playlist";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  standalone: true,
  imports: [
    NgIf
  ]
})
export class PlayerComponent {
  isPlayed:boolean = false;
  audioCurrentTime:string = '0:00';
  audioDuration:string = '0:00';
  sliderAudioCurrentTime:number = 1;
  volumeIcon: string = './assets/images/icons/player-icons/volume-high.svg';


  constructor(public audioController: PlayerControllerService) {
    document.addEventListener('keyup', (e: KeyboardEvent):void =>{
      if (e.code == 'Space') {
        this.audioController.audio.paused
          ? this.play()
          : this.pause();
      }
    })

    setInterval(():void =>{
      let CurrS:number = parseInt((this.audioController.audio.currentTime % 60).toString());
      let CurrM:number = parseInt(((this.audioController.audio.currentTime / 60) % 60).toString());

      this.audioCurrentTime = CurrM + ':' + (CurrS.toString().length == 1 ? '0' + CurrS : CurrS);

      let DurS:number = parseInt((this.audioController.audio.duration % 60).toString());
      let DurM:number = parseInt(((this.audioController.audio.duration / 60) % 60).toString());

      this.audioDuration = DurM + ':' + (DurS.toString().length == 1 ? '0' + DurS : DurS);

      if (!isNaN(this.audioController.audio.duration)) {
        this.sliderAudioCurrentTime = this.audioController.audio.currentTime / this.audioController.audio.duration * 1000;
      }
    }, 1000)

    setInterval(():void =>{
        navigator.mediaSession.setActionHandler('play', () => {
          this.play();
        });

        navigator.mediaSession.setActionHandler('pause', () => {
          this.pause();
        });
    }, 100)

    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: "Podcast Episode Title",
        artist: "Podcast Host",
        album: "Podcast Name",
        // artwork: [{ src: "podcast.jpg" }],
      });
    }
  }

  play ():void {
    this.audioController.playAudio();
    this.isPlayed = true;
  }

  pause():void {
    this.audioController.pauseAudio();
    this.isPlayed = false;
  }

  audioSliderChange (e: Event):void {
    let targetElement: any = e.target;

    if (!isNaN(this.audioController.audio.duration)) {
      let seekto: number = this.audioController.audio.duration * (targetElement.value / 1000);

      this.audioController.audio.currentTime = seekto;
    }
  }

  muteAudio():void {
    if (this.audioController.audio.volume === 0) {
      this.audioController.audio.volume = 1;
      this.volumeIcon = './assets/images/icons/player-icons/volume-high.svg';
    } else {
      this.audioController.audio.volume = 0;
      this.volumeIcon = './assets/images/icons/player-icons/volume-mute.svg';
    }
  }

  audioVolumeChnage(e:any):void {
    this.audioController.audio.volume = e.value / 100;

    if (this.audioController.audio.volume > 0.5) {
      this.volumeIcon = './assets/images/icons/player-icons/volume-high.svg';
    } else if (this.audioController.audio.volume < 0.5 && this.audioController.audio.volume > 0.0) {
      this.volumeIcon = './assets/images/icons/player-icons/volume-low.svg';
    } else {
      this.volumeIcon = './assets/images/icons/player-icons/volume-mute.svg';
    }
  }

  protected readonly NaN = NaN;
  protected readonly isNaN = isNaN;
}
