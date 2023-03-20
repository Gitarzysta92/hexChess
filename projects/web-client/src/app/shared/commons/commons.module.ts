import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CounterBadgeComponent } from "./components/counter-badge/counter-badge.component";
import { ExpandableListComponent } from "./components/expandable-list/expandable-list.component";
import { NotificationComponent } from "./components/notification/notification.component";
import { TooltipComponent } from "./components/tooltip/tooltip.component";

@NgModule({
  declarations: [
    CounterBadgeComponent,
    ExpandableListComponent,
    NotificationComponent,
    TooltipComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CounterBadgeComponent,
    ExpandableListComponent,
    NotificationComponent,
    TooltipComponent
  ]
})
export class CommonsModule { }
