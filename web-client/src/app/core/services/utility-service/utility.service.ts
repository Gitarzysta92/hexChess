import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Army } from '../../models/army';


const armies = [
  {
    id: 1,
    colors: {
      primary: '#30c2ff',
      secondary: '#1a406b',
      tertiary: '#0578fa'
    },
    icon: 'borgo'
  },
  {
    id: 2,
    colors: {
      primary: '#edb316',
      secondary: '#ab4a03',
      tertiary: '#ff7404'
    },
    icon: 'hegemony'
  },
  {
    id: 3,
    colors: {
      primary: "#bababa",
      secondary: "#3d3d3d",
      tertiary: "#767676"
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
