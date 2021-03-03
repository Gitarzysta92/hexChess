import { Component, OnInit } from '@angular/core';
import { MenuLocations } from 'src/app/constants/menu-locations.enum';
import { MenuItem } from '../../models/menu';
import { MenuService } from '../../services/menu-service/menu.service';
import { RoutingService } from '../../services/routing-service/routing.service';

@Component({
  selector: 'secondary-menu',
  template: `
  <ul class="options-menu">
    <li *ngFor="let item of data;" [class.active]="item.isActive">
      <button class="blank-btn" (click)="routing.navigate(item.fragments)">
        <i [name]="item.icon"></i> {{ item.label }}
      </button>
    </li>
  </ul>
  `,
  styleUrls: ['./secondary-menu.component.scss']
})
export class SecondaryMenuComponent implements OnInit {

  public data: MenuItem[];

  constructor(
    public readonly routing: RoutingService,
    private readonly _menuService: MenuService
  ) { 
    this._menuService.getMenuData(MenuLocations.SecondaryMenu)
      .subscribe(menu => {
        this.data = menu.items;
      })
  }

  ngOnInit(): void {
  }

}
