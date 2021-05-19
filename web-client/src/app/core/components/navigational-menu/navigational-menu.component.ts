import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExpandableListItem } from 'src/app/shared/components/expandable-list/expandable-list.component';
import { Menu, MenuItem } from '../../models/menu';
import { RoutingService } from '../../services/routing-service/routing.service';


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

  constructor(
    private readonly routing: RoutingService,
  ) {}

  ngOnInit(): void {

    if (!!this.locations && !Array.isArray(this.locations)) {
      this.locations = [this.locations]
    };

    combineLatest(this.locations || [of(null)])
    .pipe(map(menus => menus.reduce((acc, curr) => curr?.items ? acc.concat(curr?.items) : [] ,[])))
      .subscribe(items => {
        this.data = items.map(i => new ExpendableMenuItem(i));
      });
  }

  public navigateTo(url): void {
    this.routing.navigate(url);
  }

}


export class ExpendableMenuItem extends MenuItem implements ExpandableListItem {
  expanded: boolean;
  settled: boolean;
  childrens: ExpendableMenuItem[];

  constructor(data: Partial<ExpendableMenuItem>) {
    super(data as MenuItem);
    this.expanded = !!data.expanded;
    this.settled = !!data.settled;
    this.childrens = data.childrens || [];
  }
}
