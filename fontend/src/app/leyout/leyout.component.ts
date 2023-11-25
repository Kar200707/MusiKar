import { Component } from '@angular/core';
import {MenuListComponent} from "../componets/menu-list/menu-list.component";
import {GlobalBlockComponent} from "../global-block/global-block.component";
import {PlayerComponent} from "../componets/player/player.component";
import {PlayerControllerService} from "../services/player-controller/player-controller.service";

@Component({
  selector: 'app-leyout',
  templateUrl: './leyout.component.html',
  styleUrls: ['./leyout.component.css'],
  standalone: true,
  imports: [
    MenuListComponent,
    GlobalBlockComponent,
    PlayerComponent,
  ]
})
export class LeyoutComponent {
    constructor(public audioController: PlayerControllerService) {
    }

    protected readonly isNaN = isNaN;
}
