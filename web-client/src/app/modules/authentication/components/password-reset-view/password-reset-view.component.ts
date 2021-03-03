import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-reset-view',
  templateUrl: './password-reset-view.component.html',
  styleUrls: ['./password-reset-view.component.scss']
})
export class PasswordResetViewComponent implements OnInit {

  public visible: boolean = false;
  public password: string;

  constructor(
    private readonly _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this._route);
  }

  public togglePaswordVisibility(): void {
    this.visible = !this.visible;
  }

}
