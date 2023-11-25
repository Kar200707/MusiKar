import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerControllerService {
  audio: HTMLAudioElement = new Audio();
  audioImg: string = './assets/images/diskLoadImage.png';
  audioName: string = '...';
  audioArtist: string = '...';
  audioSrc!: string;

  constructor() {  }

  loadTrack(audioSrc: string):void {
    this.audio.src = audioSrc;
    this.audio.load();
  }

  playAudio ():void {
    this.audio.play();
  }

  pauseAudio ():void {
    this.audio.pause();
  }
}
