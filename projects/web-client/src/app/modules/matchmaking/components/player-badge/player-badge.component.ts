import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConfigurationService } from 'src/app/core';
import { fadeIn } from 'src/app/shared/animations/predefined-animations';
import { MatchedPlayer } from '../../models/matched-player';


@Component({
  selector: 'player-badge',
  templateUrl: './player-badge.component.html',
  styleUrls: ['./player-badge.component.scss'],
  animations: [
    fadeIn('fadeIn')
  ]
})
export class PlayerBadgeComponent implements OnInit, OnChanges {

  @Input() player: MatchedPlayer
  
  @Input() avatar: 'top' |  'right' | 'left' ;

  public avatarUrl: string;

  constructor(
    private readonly _configurationService: ConfigurationService
  ) { }

  ngOnInit(): void {
    if (this.player) {
      this.avatarUrl = this.player.avatarUrl ? 
        this._configurationService.avatarsBlobStorageUrl + '/' + this.player.avatarUrl : 
        this._configurationService.defaultAvatarUrl
    }
  } 

  ngOnChanges(changes: SimpleChanges): void {
    if (this.player) {
      this.avatarUrl = this.player.avatarUrl ? 
        this._configurationService.avatarsBlobStorageUrl + '/' + this.player.avatarUrl : 
        this._configurationService.defaultAvatarUrl
    }
  }

}