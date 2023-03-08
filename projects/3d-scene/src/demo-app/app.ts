import { merge, fromEvent, connectable, ReplaySubject } from "rxjs";
import { Vector3 } from "three";
import { bootstrapScene } from "../index";
import { SceneComposerSetup, TileDeclaration } from "../scene/interfaces/scene-composer";
import { sceneSetup, tileGraphicalData } from "./scene-setup";
import { TileGenerator } from 'hexchess-tile-generator';

var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const events = merge(
  fromEvent<PointerEvent>(window, 'mousemove'),
  fromEvent<PointerEvent>(window, 'click')
);
const inputs = { pointerEvent$: connectable(events, { connector: () => new ReplaySubject() })}
inputs.pointerEvent$.connect();
const { sceneManager, dialogComponent } = bootstrapScene(inputs);
init();



async function init() {
  const setup = {
    canvasRef: canvas,
    height: innerHeight,
    width: innerWidth,
    pixelRatio: innerWidth / innerHeight,
    bgColor: 0xa07966,
    fogColor: 0xea5c3b,
    initialCameraPosition: new Vector3(-130, 130, 0),
  };
  sceneManager.createScene(setup);
  await mapUrls(sceneSetup, (url: string) => downloadImage(url));

  //   sceneSetup.board.fields = generateHexagonalMapCoords().map((c, i) => Object.assign(c, ));

  generateTilesTextures(sceneSetup);

  await sceneManager.createSceneObjects(sceneSetup);
  dialogComponent.openDialog();
  sceneManager.startRendering();

  window.addEventListener('resize', () => sceneManager.adjustRendererSize(innerWidth, innerHeight));
}



async function downloadImage(url: string) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const fileReader = new FileReader();
      return new Promise((resolve, reject) => {
        fileReader.onloadend = () => {
          const base64Url = fileReader.result;
          resolve(base64Url);
        };
        fileReader.onerror = reject;
        fileReader.readAsDataURL(new Blob([arrayBuffer]));
      });
    } else {
      console.error("Error downloading image");
    }
  } catch (error) {
    console.error(error);
  }
};


async function mapUrls(json: any, cb: Function): Promise<void> {
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      const value = json[key];
      if (typeof value === 'object') {
        await mapUrls(value, cb)
      } else if (key.toLowerCase().includes("url")) {
       json[key] = await cb(json[key])
      }
    }
  }
}

function generateHexagonalMapCoords(): Vector3[] {
  const matrix: Vector3[] = [];
  [
    [0,0,1,0,1,0,1,0,0],
    [0,1,0,1,0,1,0,1,0],
    [1,0,1,0,1,0,1,0,1],
    [0,1,0,1,0,1,0,1,0],
    [0,0,1,0,1,0,1,0,0],    
  ].forEach((row, y) => {
    let i = 0;
    row.forEach((bit, x) => {
      if (!bit) {
        return;
      }
      matrix.push(new Vector3(x, 3, y));
    })
  });
  return matrix;
}

async function generateTilesTextures(composerData: SceneComposerSetup): Promise<void> {
  const tileGenerator = new TileGenerator({ tileSize: 1000 });

  const img = new Image();
  img.src = "art1.png" as string;
  const result = new Promise((resolve, reject) => {
    img.onload = (e) => { 
      const tileImg = tileGenerator.generate(tileGraphicalData as any, { artwork: img }); 
      resolve(tileImg);
    }
  });
  composerData.objects.forEach(async o => {
    if (o.type === 'tile-on-field' || o.type === 'tile-in-dialog' || o.type === 'tile-in-staging') {
      (o as TileDeclaration).mapTexture.url = await result as any;
    }
  });
}
