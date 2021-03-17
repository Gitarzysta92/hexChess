import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Army } from '../../models/army';


export const armies = [
  {
    id: 1,
    colors: {
      outer: '#30c2ff',
      inner: '#1a406b',
      stroke: '#0578fa'
    },
    icon: 'borgo'
  },
  {
    id: 2,
    colors: {
      outer: '#edb316',
      inner: '#ab4a03',
      stroke: '#ff7404'
    },
    icon: 'hegemony'
  },
  {
    id: 3,
    colors: {
      outer: "#bababa",
      inner: "#3d3d3d",
      stroke: "#767676"
    },
    icon: 'random'
  }
];


@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor() { }

  getArmies(): Observable<Army[]> {
    return of(armies);
  }
}
