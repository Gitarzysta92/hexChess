import { publishBehavior, fromEvent, Subject, takeUntil, map } from "rxjs";
import { GameView } from "./core/game-view";
import { MainLoop } from "./core/main-loop";
import { TasksQueue } from "./core/tasks-queue";
import { dirLight1, dirLight2, hemisphereLight, ambientLight } from "./lights/lights";
import { PassiveObject, CointainerObject, TokenObject } from "./objects/game-object";
import { ObjectFactory } from "./objects/objects";
import { AnimationManager } from "./services/animation-manager";
import { CollisionsManager, Collidable } from "./services/collider";
import { DragManager } from "./services/drag-manager";
import { Vector3, Quaternion, Vector2, Intersection } from "three";
import { Coords2, generate2dCoordinates, translateMatrix } from "./utils/utils";



export function init(): Scene {
  const view = new GameView();
  const tasksQueue = new TasksQueue();
  const animationManager = new AnimationManager(tasksQueue);
  const dragManager =  new DragManager(view, tasksQueue);
  const collisionsManager = new CollisionsManager(view, tasksQueue);
  return new Scene(view, tasksQueue, animationManager, dragManager, collisionsManager);
}


export class Scene {

  mousemove$: any;
  
  constructor(
    public view: GameView,
    public tasksQueue: TasksQueue,
    public animationManager: AnimationManager,
    public dragManager: DragManager,
    public collisionsManager: CollisionsManager,
  ) { }


  public createScene(nativeElement: HTMLElement, mapCoordinates: Coords2[]): GameView {
    this.view.initialize({
      domElement: nativeElement, 
      aspect: innerWidth/innerHeight,
      cameraPosition: new Vector3(-120, 130,  0)
    });

    this.mousemove$ = publishBehavior<MouseEvent | Vector3>(null as any)(fromEvent<MouseEvent>(window, 'mousemove'));
    this.mousemove$.connect();

    const mainLoop = new MainLoop(window);
    mainLoop.onTick(() => this.tasksQueue.perform());
    mainLoop.onTick(() => this.view.render());


    // ###############
    // Lights
    // ###############
    this.view.integrate(dirLight1);
    this.view.integrate(dirLight2);
    this.view.integrate(hemisphereLight);
    this.view.integrate(ambientLight);

    // ###############
    // Plane
    // ###############
    const plane = ObjectFactory.createTerrainPlane();
    this.view.attach(plane);


    // ###############
    // Fields
    // ###############
    console.log(mapCoordinates);
    translateMatrix(mapCoordinates, -4, -3).forEach(coords => {
      const v = new Vector3(coords.x * 5, 0, coords.y * 9);
      const field = ObjectFactory.createHexField(v);
      return this.view?.attach(field);
    });

    mainLoop.init();

    //this.createToken("assets/img/sniper.jpg");

    return this.view;
  }

  public adjustRendererSize() {
    this.view.adjustRendererSize();
  }


  public async createToken(img: string, id: string) {
    const camera = this.view['_camera'];

    const ddd = new Vector3()
    camera.getWorldPosition(ddd)
    var forward = new Vector3(0, 1, 0);
    var right = ddd.clone().cross(forward).normalize();
    const d = new Quaternion().setFromAxisAngle(right, -0.85);
    const g = new Quaternion().setFromAxisAngle(new Vector3(0,1,0).normalize(), 3.55)
    let asd = camera.position.clone();
    asd.multiplyScalar(0.5)

    const token = ObjectFactory.createHexToken(img, asd, g, id);

    this.view.attach(token);
    token.mesh.applyQuaternion(d);

    
    const gg = new Quaternion().setFromAxisAngle(new Vector3(0,3,0).normalize(),-0.4)
    const h = new Quaternion().setFromAxisAngle(right, 0.02);
    const xx = gg.multiply(h);


    const l = new Vector3(0,5,0);
    const destroy$ = new Subject<void>();
    const v = new Vector2();

    const mousemove$ = this.mousemove$  
      .pipe(takeUntil(destroy$))
      .pipe(map((x: MouseEvent) => {
        this._mapToNormalized2dCoords(x, v);
        const found = this.view.intersect(v).filter(x => x.object instanceof PassiveObject)[0];

        l.setX(found?.point?.x || l.x);
        l.setZ(found?.point?.z || l.z);
        return l;
      }));

    await this.animationManager.transition(token, mousemove$, xx);
    destroy$.next()

    this._registerTokenCollider(token);
    this.dragManager.startDragging(token);
  }

  public getField(targetFieldId: string): CointainerObject | undefined {
    return this.view.gameObjects[targetFieldId] as CointainerObject;
  }

  public getTile(tileId: any): TokenObject | undefined {
    const obj = this.view.gameObjects as unknown as TokenObject[];
    return Object.values(obj).find(o => o.auxId === tileId);
  }

  public getAssignedTile(fieldId: string): TokenObject | undefined {
    const obj = this.view.gameObjects as unknown as TokenObject[];
    return Object.values(obj).find(o => o.takesField === fieldId);
  }

  public getTargetedElements(pointerCords: Coords2): Intersection[] {
    const v = new Vector2(pointerCords.x, pointerCords.y);
    this._mapToNormalized2dCoords2(v);
    return this.view.intersect(v);
  }

  public getTargetedField(pointerCords: Coords2): CointainerObject | undefined {
    const v = new Vector2(pointerCords.x, pointerCords.y);
    this._mapToNormalized2dCoords2(v);
    return this.view.intersect(v).find(i => i.object instanceof CointainerObject)?.object as any;
  }

  public getTargetedFieldId(pointerCords: Coords2): string | undefined {
    const v = new Vector2(pointerCords.x, pointerCords.y);
    this._mapToNormalized2dCoords2(v);
    return this.view.intersect(v).find(i => i.object instanceof CointainerObject)?.object.uuid;
  }


  public removeToken(token: TokenObject) {
    token.destroy();
  }


  public async attachDraggedTileToField(hexField: any): Promise<void> {
    const tile = this.dragManager.currentObject;
    this.dragManager.stopDragging();
    const { coords, quat } = hexField.takeBy(tile);
    await this.animationManager.transition(tile, coords, quat);
    this.collisionsManager.stop(tile);
  }

  public async attachTileToField(tile: any, hexField: any): Promise<void> {
    const { coords, quat } = hexField.takeBy(tile);
    await this.animationManager.transition(tile, coords, quat);
    this.collisionsManager.stop(tile);
  }

  public async detachTileFromField(tile: TokenObject): Promise<void> {
    tile.takesField = null as unknown as string;

    this._registerTokenCollider(tile);
    const coords = tile.coords.clone();
    coords.y = 5;
    await this.animationManager.transition(tile, coords);


    const destroy$ = new Subject<void>();
    const v = new Vector2();

    const mousemove$ = this.mousemove$  
      .pipe(takeUntil(destroy$))
      .pipe(map((x: MouseEvent) => {
        this._mapToNormalized2dCoords(x, v);
        const found = this.view.intersect(v).filter(x => x.object instanceof PassiveObject)[0];

        coords.setX(found?.point?.x || coords.x);
        coords.setZ(found?.point?.z || coords.z);
        return coords;
      }));

    await this.animationManager.transition(tile, mousemove$);
    destroy$.next();
    this.dragManager.startDragging(tile);
  }


  public async rotateToken(token: any, clockwise: boolean = true) {
    const prev = token.coords.clone();
    const elevated = token.coords.clone();
    elevated.y = 5
    await this.animationManager.transition(token, elevated);

    const angle = clockwise ? 1.3 : -1.3

    //const asd = new Euler().setFromVector3(token.coords);
    const asd = new Quaternion().setFromAxisAngle(new Vector3(0,1,0), angle).multiply(token.mesh.quaternion);
    token.mesh.worldToLocal
    await this.animationManager.transition(token, prev, asd);
  }


  private _mapToNormalized2dCoords(e: MouseEvent, target: Vector2): void {
    target.set(
      ((e.clientX / window.innerWidth) * 2 - 1),
      (-(e.clientY / window.innerHeight) * 2 + 1)
    );
  }

  private _mapToNormalized2dCoords2(target: Vector2) {
    target.set(
      ((target.x / window.innerWidth) * 2 - 1),
      (-(target.y / window.innerHeight) * 2 + 1)
    );
  }

  private _registerTokenCollider(token: TokenObject): void {
    this.collisionsManager.handle(token, (collider, collisions) => {
      const released = collider.prev.filter(pc => !collisions.some(c => c.object === pc.object));
      released.forEach(c => {
        const gameObject = this.view.gameObjects[c.object.uuid] as unknown as Collidable;
        if (gameObject != null && "release" in gameObject) 
          gameObject.release();
      });

      collisions.forEach(c => {
        const gameObject = this.view.gameObjects[c.object.uuid] as unknown as Collidable;
        if (gameObject != null && "collide" in gameObject) 
          gameObject.collide();
      });
    });  
  }
}