import { Injectable } from '@angular/core';
import { TileGenerator } from '@hexchess-tile-generator/index';
import { ArtworkType } from '@hexchess-tile-generator/lib/constants/artwork-type';
import { forkJoin, from, map, Observable, of } from 'rxjs';
import * as localForage from "localforage";
import { ITileArtworkData } from '../models/tile-artwork-data';
import { ITileGraphicalData } from '../models/tile-graphical-data';
import { ITileImageBinding } from '../models/tile-image-binding';


@Injectable({
  providedIn: 'root'
})
export class TilesService {
  constructor() { }

  public getTileArtwork(tileId: string, artworkName: string): Observable<ITileArtworkData> {
    return new Observable(s => {
      const img = new Image();
      img.src = `assets/images/${artworkName}.png` as string;
      img.onload = (e) => {
        s.next({
          tileId: tileId,
          image: img
        });
        s.complete();
      }
    });
  }

  public getTileArtworks(graphicDeclarations: ITileGraphicalData[]): Observable<ITileArtworkData[]> {
    const artworkRequests = graphicDeclarations
      .filter(d => !!d?.artwork?.name && d.artwork.type === ArtworkType.Biptmap)
      .map(d => this.getTileArtwork(d.id, d.artwork.name as string))

    if (artworkRequests.length > 0) {
      return forkJoin(artworkRequests)
    } else {
      return of([]);
    }
  }

  public getTileImageUrls(graphicDeclarations: ITileGraphicalData[], tileSize: number = window.innerWidth): Observable<ITileImageBinding[]> {
    const tileGenerator = new TileGenerator({ tileSize: tileSize })

    // tileGenerator['_canvas'].width = tileSize * 2;
    // tileGenerator['_canvas'].height = tileSize * 2;
    
    return forkJoin({
      artworks: this.getTileArtworks(graphicDeclarations),
      cachedImageUrls: this._getCachedImageUrls(graphicDeclarations)
    }).pipe(map(result => {
      return graphicDeclarations.map(g => {
        const tileImageData = { tileId: g.id, imageUrl: null };

        if (g.id in result.cachedImageUrls && result.cachedImageUrls[g.id]) {
          tileImageData.imageUrl = result.cachedImageUrls[g.id];
          return tileImageData;
        }

        const artwork = result.artworks.find(a => a.tileId === g.id);
        tileImageData.imageUrl = tileGenerator.generate(g, { artwork: artwork?.image });
        localForage.setItem(tileImageData.tileId, tileImageData.imageUrl);
        return tileImageData;
      });
    }));
  }

  private _getCachedImageUrls(graphicDeclarations: ITileGraphicalData[]): Observable<{ [key: string]: string }> {
    return forkJoin(graphicDeclarations.reduce((acc, curr) =>
      Object.assign(acc, { [curr.id]: from(localForage.getItem(curr.id)) }),
      {} as { [key: string]: string }))
  }

}
