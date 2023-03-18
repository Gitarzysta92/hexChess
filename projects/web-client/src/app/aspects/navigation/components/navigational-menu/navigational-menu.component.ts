import { ComponentPortal } from '@angular/cdk/portal';
import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreService } from 'src/app/infrastructure/data-store/api';
import { IExpandableListItem } from 'src/app/shared/commons/api';
import { Menu, MenuItem } from '../../models/menu';
import { RoutingService } from '../../services/routing/routing.service';

@Component({
  selector: 'navigational-menu',
  templateUrl: './navigational-menu.component.html',
  styleUrls: ['./navigational-menu.component.scss'],
  host: {
    '[class]': 'type'
  }
})
export class NavigationalMenuComponent implements OnInit {

  @Input() locations: Observable<Menu>[];

  @Input('vertical') set listType(_) { this.type = 'vertical' }
  @Input('horizontal') set inlineType(_) { this.type = 'horizontal' }
  @Input('showIcons') set showIcons(_) { this.icons = true }

  public data: Array<MenuItem>;
  public type: 'vertical' | 'horizontal' = 'horizontal';
  public icons: boolean = false;

  private _destroyed: Subject<void> = new Subject()

  constructor(
    private readonly routing: RoutingService,
    private readonly _store: StoreService
  ) {}

  ngOnInit(): void {

    if (!!this.locations && !Array.isArray(this.locations)) {
      this.locations = [this.locations]
    };

    combineLatest(this.locations || [of(null)])
    .pipe(map(menus => menus.reduce((acc, curr) => curr?.items ? acc.concat(curr?.items) : [] ,[])))
      .subscribe(items => {
        this.data = items.map(i => this._createMenuItem(i));
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  public navigateTo(url): void {
    this.routing.navigate(url);
  }

  // public bindCounterValue(componentRef, menuItem: MenuItem): void { 
  //   if (menuItem.counterDataProvider) {
  //     const data = menuItem.counterDataProvider(this._store);
  //     data.pipe(takeUntil(this._destroyed))
  //       .subscribe(value => {
  //         console.log(value)
  //         componentRef.instance.number = value;
  //       });
  //   }
  // }

  private _createMenuItem(item: MenuItem): ExpendableMenuItem {
    const expendableItem = new ExpendableMenuItem({
      ...item,
      // portal: !!item.counterComponent ? new ComponentPortal(item.counterComponent): new ComponentPortal(CounterBadgeComponent),
      counterData: !!item.counterDataProvider ? item.counterDataProvider(this._store) : null
    });

    return expendableItem
  }
}


export class ExpendableMenuItem extends MenuItem implements IExpandableListItem {
  expanded: boolean;
  settled: boolean;
  childrens: ExpendableMenuItem[];
  portal: ComponentPortal<any>;
  counterData: Observable<number>;

  constructor(data: Partial<ExpendableMenuItem>) {
    super(data as MenuItem);
    this.expanded = !!data.expanded;
    this.settled = !!data.settled;
    this.childrens = data.childrens || [];
    this.portal = data.portal;
    this.counterData = data.counterData;
  }

}
