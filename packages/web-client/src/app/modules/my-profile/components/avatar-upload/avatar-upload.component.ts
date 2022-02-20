import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { ConfigurationService } from 'src/app/core/services/configuration/configuration.service';
import { MyProfileStore } from '../../stores/my-profile.store';


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
  public newFileName: string;

  constructor(
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
    this.newFileName = event.target.files[0];
    this.newFile.next(this.newFileName);
  }

  public onFormHover(event: MouseEvent) {
    event.preventDefault();
    this.hovered = event.type === "mouseenter"; 
    this._changeDetectorRef.detectChanges();
  }
}
