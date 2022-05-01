import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { ConfigurationService } from 'src/app/core/services/configuration/configuration.service';
import { MyProfileStore } from '../../stores/my-profile.store';


@Component({
  selector: 'avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarUploadComponent implements OnInit {

  @Input() fileUrl: string | undefined;
  @Output() newFile: EventEmitter<any> = new EventEmitter()

  public hovered: boolean;
  public newFileName: string;

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _configurationService: ConfigurationService
  ) { 
    this.hovered = false;
  }

  ngOnInit(): void { }

  public updateAvatar(event): void {
    this.newFileName = event.target.files[0];
    this.newFile.next(this.newFileName);
  }

  public onFormHover(event: MouseEvent) {
    event.preventDefault();
    this.hovered = event.type === "mouseenter"; 
    this._changeDetectorRef.detectChanges();
  }

  public setDefaultAvatar(event: any) {
    event.target.src = this._configurationService.defaultAvatarUrl
  }
}
