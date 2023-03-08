// import './style.css';
// import '../index.ts';
// import { initializeScene } from '..';
// import { boardCoords } from './board-coords';
// import { EventHandler } from '../lib/utils/events';
// import { from, fromEvent, Observable, tap, takeWhile, map, filter, lastValueFrom, switchMap } from 'rxjs';
// import { TileObject } from '../lib/objects/concrete/game-object';
// import { generateTexture, generateTexture2 } from '../lib/services/tile-generator';

// const events = merge(
//   fromEvent<MouseEvent>(window, 'mousemove')
// );
// this.mouseevent$ = connectable(events, {
//   connector: () => new ReplaySubject()
// });
// this.mouseevent$.connect();


// const { scene, dialogComponent, stagingComponent, boardComponent, rotateMenuComponent, dustParticlesComponent } = initializeScene();

// var canvas = document.createElement('canvas');
// scene.createScene(canvas, "");
// scene.createSceneObjects(boardCoords, "");
// document.body.appendChild(canvas);
// const eventHandler = new EventHandler(canvas);

// fromEvent<MouseEvent>(window, 'click').subscribe(e => dustParticlesComponent.animate(e.clientX, e.clientY))

// getImages()
//   .then(img => {
//     // selectTilesForStaging(img)
//     //   .pipe(switchMap(tiles => moveTilesToStaging(tiles)))
//     //   .pipe(switchMap(() => handleTilesDeploying()))
//     //   .subscribe();
//       // .subscribe(() => handleTileMoving())
//   })


// async function getImages() {
//   let img = new Image();
//   await new Promise(r => (img.onload = r, img.src = "./art1.png"));
//   return img;
// }


// function selectTilesForStaging(img: any): Observable<TileObject[]> {
//   dialogComponent.assignTile(scene.createTile("1", generateTexture(img), 0xff7404));
//   dialogComponent.assignTile(scene.createTile("2", generateTexture2(img), 0xff7404));
//   dialogComponent.assignTile(scene.createTile("3", generateTexture(img), 0xff7404));
//   dialogComponent.openDialog();

//   // setTimeout(() => dialogComponent.openDialog(), 1000);
//   // setTimeout(() => dialogComponent.closeDialog(), 2000);
//   // setTimeout(() => dialogComponent.openDialog(), 3000);
  
//   let tiles = new Map();
//   return fromEvent<MouseEvent>(window, 'click')
//     .pipe(
//       tap(e => {
//         const tile = dialogComponent.getTargetedTile(e.clientX, e.clientY);
//         if (!tile)
//           return;
                
//         if (tiles.has(tile)) {
//           tile.unselect();
//           tiles.delete(tile);
//         } else {
//           tile.select();
//           tiles.set(tile, tile);
//         }
      
//       }),
//       filter(t => tiles.size === 3),
//       takeWhile(() => tiles.size < 3, true),
//       map(() => [...tiles.values()]),
//       tap(() => tiles.forEach(t => t.unselect()))
//     );
// }

// function moveTilesToStaging(tiles: TileObject[]): Observable<void> {
//   return from(dialogComponent.moveTilesToStaging(tiles));
// }


// function handleTilesDeploying(): Observable<void> {
//   return new Observable(s => {
//     eventHandler.onClickAndRelease(async e => {
//       if (e.type === "mousedown") {
//         const tile = stagingComponent.getTargetedTile(e.clientX, e.clientY);
//         if (tile == null)
//           return;
//         stagingComponent.dragTile(tile);
//       } else {
//         const tile = boardComponent.getDraggedTile();
//         if (tile == null)
//           return;
//         const success = await boardComponent.attachDraggedTileToField();  
//         if (success) {
//           await lastValueFrom(handleTileRotate(tile))
//         } else {
//           await stagingComponent.bringBackTile(tile);
//         }
//         s.next();
//         s.complete();
//       }
//     });
//   });
// }


// function handleTileRotate(tile: TileObject): Observable<void> {
//   rotateMenuComponent.showMenu(tile, {
//     settled: 0xff7404,
//     hovered: 0xedb316
//   });

//   return new Observable(s => {
//     eventHandler.onClick(async e => {
//       rotateMenuComponent.rotateTile(e.clientX, e.clientY);
//       // s.next();
//       // s.complete();
//     });
//   });
// }






// function handleTileMoving() {
//   return new Observable(s => {
//     let tile: TileObject;
//     eventHandler.onClickAndRelease(async e => {
//       if (e.type === "mousedown") {
//         tile = stagingComponent.getTargetedTile(e.clientX, e.clientY);
//         if (tile == null)
//           return;
//         stagingComponent.dragTile(tile);
//       } else {
//         const success = await boardComponent.attachDraggedTileToField();
//         s.next();
//         s.complete();
  
//         if (!success) {
//           await stagingComponent.bringBackTile(tile);
//         }
//       }
//     });
//   });
// }