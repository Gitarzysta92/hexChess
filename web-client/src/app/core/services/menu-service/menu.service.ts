import { Injectable } from '@angular/core';
import { NavigationEnd, Router, Routes } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuLocations } from '../../../constants/menu-locations.enum';
import { AbstractModule } from '../../models/AbstractModule';
import { Menu, MenuItem } from '../../models/menu';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _locations: typeof MenuLocations;
  private _menus: { [key: string]: { data: Menu, provider: BehaviorSubject<Menu> } };
  private _items: StandaloneMenuItem[];

  constructor(
    private readonly _router: Router
  ) {
    this._menus = {};
    this._items = [];
    this._locations = MenuLocations;

    this._initializeMenus();
    this._startListeningForNavigationOccured();
  }

  public getMenuData(location: MenuLocations): Observable<Menu> {
    const menu = this._menus[location]
    if (!menu) throw new Error(`Menu for given location: ${this._locations[location]}, doesn't exists`);
    return this._menus[location].provider
  } 


  public register(declarations: Array<typeof AbstractModule>): void {
    declarations.forEach(d => {
      d.routes.forEach(r => {
        const menu = this._menus[r.data?.menu?.location];
        if (!menu) return;

        const item = this._createMenuItem(r, d.path);
        this._items.push(item);
        menu.data.items.push(item);
      });
    })
  }

  private _startListeningForNavigationOccured(): void {
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const items = this._matchItems(event.url);
        this._setItemsAsActive(items);
        this._emitChangesForItems(items);
      });
  }

  private _initializeMenus(): void {
    Object.keys(this._locations).forEach(key => {
      if (isNaN(Number(key))) return;
      const menu = new Menu({
        label: this._locations[key],
        location: key as unknown as MenuLocations,
        items: []
      })

      this._menus[key] = {
        data: menu, 
        provider: new BehaviorSubject(menu)
      }
    });
  }

  private _createMenuItem(route: any, rootPath: string = ''): StandaloneMenuItem {
    const url = `${rootPath?.length > 0 ? '/' + rootPath : ''}${route.path?.length > 0 ? '/' + route.path : '' }`

    return new StandaloneMenuItem({
      label: route.data.menu.label,
      url: url,
      fragments: [url],
      icon: route.data.menu.icon,
      location: route.data.menu.location,
      isActive: false
      // children: route.children?.map(ci => 
      //   this._createMenuItem(Object.assign(ci, { rootPath: route.rootPath })))
    });
  }

  private _matchItems(url: string): StandaloneMenuItem[] {
    return this._items.filter(i => i.url === url);
  }

  private _setItemsAsActive(matchedItems: StandaloneMenuItem[]): void {
    this._items.forEach(i => i.isActive = matchedItems.some(mi => mi === i));
  }

  private _emitChangesForItems(matchedItems: StandaloneMenuItem[]): void {
    // const locations = new Set<number>();
    // matchedItems.forEach(mi => locations.add(mi.location));

    // locations.forEach(location => {
    //   const menu = this._menus[location];
    //   if (!menu) return;
    //   menu.provider.next(menu.data);
    // });

    Object.keys(this._menus).forEach(location => {
      const menu = this._menus[location];
      if (!menu) return;
      menu.provider.next(menu.data);
    });


  };
}


class StandaloneMenuItem extends MenuItem {
  public location: number;

  constructor(data: StandaloneMenuItem) {
    super(data)
    this.location = data.location;
  }
}
