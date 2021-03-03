import { Component, OnInit } from '@angular/core';
import { MenuLocations } from 'src/app/constants/menu-locations.enum';
import { ExpandableListItem } from 'src/app/shared/components/expandable-list/expandable-list.component';
import { MenuItem } from '../../models/menu';
import { MenuService } from '../../services/menu-service/menu.service';
import { RoutingService } from '../../services/routing-service/routing.service';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  public data: Array<MenuItem>;

  constructor(
    private readonly routing: RoutingService,
    private readonly menuService: MenuService
  ) { 

    

   this.menuService.getMenuData(MenuLocations.MainMenu)
    .subscribe(data => {
      this.data = data.items.map(i => new MainMenuItem(Object.assign(i, { expanded: false, settled: false })));
    })
  }

  ngOnInit(): void {
  }

  public navigateTo(url): void {
    this.routing.navigate(url);
  }

}


class MainMenuItem extends MenuItem implements ExpandableListItem {
  expanded: boolean;
  settled: boolean;

  constructor(data: MainMenuItem) {
    super(data);
    this.expanded = data.expanded;
    this.settled = data.settled;
  }
}





// this.data = [
//   {
//     text: 'Lobby',
//     expanded: false,
//     settled: false,
//     isActive: true,
//     url: ['/lobby']
//   },
//   {
//     text: 'Matchmaking',
//     expanded: false,
//     settled: false,
//     isActive: false,
//     url: ['/matchmaking/modes']
//   }
// ]
