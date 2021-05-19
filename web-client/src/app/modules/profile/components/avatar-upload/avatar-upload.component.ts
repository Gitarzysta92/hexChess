import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { ConfigurationService } from 'src/app/core/services/configuration/configuration.service';
import { MyProfileStore } from 'src/app/core/services/profile.store';

@Component({
  selector: 'avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarUploadComponent implements OnInit, OnChanges {

  @Input() fileName: string;
  @Output() newFile: EventEmitter<any> = new EventEmitter()

  public fileSrc: string;
  public hovered: boolean;

  constructor(
    private readonly _myProfileStore: MyProfileStore,
    private readonly _configService: ConfigurationService,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) { 
    this.fileSrc = 'assets/images/avatar.png';
    this.hovered = false;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.fileName.currentValue) {
      this.fileSrc = 'assets/images/avatar.png';
      return;
    };
    this.fileSrc = `${this._configService.avatarsBlobStorageUrl}/${this.fileName}`;
  }

  public updateAvatar(event): void {
    this.newFile.next(event.target.files[0]);
  }

  public onFormHover(event: MouseEvent) {
    event.preventDefault();
    this.hovered = event.type === "mouseenter"; 
    this._changeDetectorRef.detectChanges();
  }
}
