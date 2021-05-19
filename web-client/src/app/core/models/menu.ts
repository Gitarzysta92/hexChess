import { Icons } from "src/app/constants/icons";
import { MenuLocations } from "src/app/constants/menu-locations.enum";
import { ExpandableListItem } from "src/app/shared/components/expandable-list/expandable-list.component";

export class Menu {
  public location: MenuLocations;
  public label: string;
  public items: MenuItem[];
  constructor(data: Menu) {
    this.location = data.location;
    this.label = data.label;
    this.items = data.items;
  }
}


export class MenuItem {
  public label: string;
  public url: string;
  public fragments?: string[];
  public icon: keyof Icons;
  public isActive: boolean;
  public children?: MenuItem[];
  constructor(data: MenuItem) {
    this.label = data.label;
    this.url = data.url;
    this.fragments = data.fragments || [];
    this.icon = data.icon;
    this.isActive = data.isActive;
    this.children = data.children || [];
  }
}