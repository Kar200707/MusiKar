import { Component } from '@angular/core';
import {HomeBlockComponent} from "../pages/home-block/home-block.component";
import {PlayerControllerService} from "../services/player-controller/player-controller.service";

@Component({
  selector: 'app-global-block',
  templateUrl: './global-block.component.html',
  styleUrls: ['./global-block.component.css'],
  standalone: true,
  imports: [
    HomeBlockComponent
  ]
})
export class GlobalBlockComponent {
  constructor(public audioController: PlayerControllerService) {
  }
}
