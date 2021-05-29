import { ComponentType } from "@angular/cdk/portal";
import { Route } from "@angular/router";
import { Observable } from "rxjs";
import { Icons } from "src/app/constants/icons";
import { MenuLocations } from "src/app/constants/menu-locations.enum";
import { StoreService } from "../services/store-service/store.service";


export type Appendix = { component?: ComponentType<{ number: number }>, data?: (store: StoreService) => Observable<any> } 

export interface SystemRouteData {
  menu?: { location: MenuLocations, label: string;  icon?: keyof Icons; };
  appendix?: Appendix;
}


export interface SystemRoute extends Route {
  data?: SystemRouteData
}


export type SystemRoutes = SystemRoute[];

