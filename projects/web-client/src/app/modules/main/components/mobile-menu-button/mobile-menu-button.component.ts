import { Component, Input, OnInit } from '@angular/core';
import { Observable, combineLatest, of, Subject } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { StoreService } from 'src/app/core';
import { Menu, MenuItem } from '../../models/menu';

export interface CountNumberEmiter {
  countNumber: Subject<number>;
}

@Component({
  selector: 'mobile-menu-button',
  templateUrl: './mobile-menu-button.component.html',
  styleUrls: ['./mobile-menu-button.component.scss']
})
export class MobileMenuButtonComponent implements OnInit {

  @Input() locations: Observable<Menu>[];

  public count: Observable<number>;

  constructor(
    private readonly _store: StoreService
  ) { }

  ngOnInit(): void {
    if (!!this.locations && !Array.isArray(this.locations)) {
      this.locations = [this.locations]
    };

    this.count = combineLatest(this.locations || [of(null)])
      .pipe(map(menus => menus.reduce((acc, curr) => curr?.items ? acc.concat(curr?.items) : [] ,[]) as MenuItem[]))
      .pipe(map(items => items.filter(i => !!i.counterDataProvider).map(i => i.counterDataProvider(this._store))))
      .pipe(switchMap(items => combineLatest(items)))
      .pipe(map(items => items.reduce((acc, curr) => acc += curr , 0)))
  }
}

