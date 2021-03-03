 import { Component, OnInit, ContentChild, TemplateRef, Input } from '@angular/core';
 import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'expandable-list',
  templateUrl: './expandable-list.component.html',
  styleUrls: ['./expandable-list.component.scss'],
  animations: [
    trigger('expandHeight', [
      state('expanded', style({ height: '*' })),
      state('collapsed', style({ height: '0' })),
      transition('expanded => collapsed', [ animate('0.1s ease-in-out') ]),
      transition('collapsed => expanded', [ animate('0.1s ease-in-out') ]), 
    ])
  ]
})
export class ExpandableListComponent implements OnInit {

  @ContentChild('listItem', { static: true}) listItem: TemplateRef<any>;

  @Input() data: Array<ExpandableListItem>;

  public expandOnHover: boolean = false;
  @Input('onHover') set onHover(value) {
    this.expandOnHover = coerceBooleanProperty(value);
  } 

  public dataForView: Array<ExpandableListItem> = [];

  constructor() { }

  ngOnInit() {
    if (Array.isArray(this.data)) this.dataForView = this.data;
  }

  ngOnChanges() {
    if (Array.isArray(this.data)) this.dataForView = this.data;
  }

  public toggleItem(event: Event, item: ExpandableListItem, state?: boolean): void {
    event.preventDefault();
    if (item.settled === true) return;
    item.expanded = state || !item.expanded;
  } 

}


export interface ExpandableListItem {
  expanded: boolean;
  settled: boolean;
  childrens?: Array<ExpandableListItem>;
}