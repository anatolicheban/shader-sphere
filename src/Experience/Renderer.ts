import { Canvas } from "../models/models";
import { Experience } from "./Experience";
import { Sizes } from "./Utils/Sizes";
import {
  CineonToneMapping,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  WebGLRenderer,
} from "three";
import Stats from "three/examples/jsm/libs/stats.module";

export class Renderer {
  experience: Experience;
  canvas: Canvas;
  sizes: Sizes;
  instance: WebGLRenderer & { useLegacyLights?: boolean };
  camera: PerspectiveCamera;
  scene: Scene;
  stats: Stats;

  constructor() {
    this.experience = new Experience();
    this.sizes = new Sizes();
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera.instance;
    this.scene = this.experience.scene;

    this.stats = Stats();
    // this.stats.setMode(1);
    document.body.appendChild(this.stats.dom)

    this.setInstance();
  }

  setInstance() {
    this.instance = new WebGLRenderer({
      canvas: this.canvas as HTMLElement,
      antialias: true,
      preserveDrawingBuffer: true,
    });

    this.instance.useLegacyLights = true;
    this.instance.outputEncoding = sRGBEncoding;
    this.instance.toneMapping = CineonToneMapping;
    this.instance.toneMappingExposure = 1.1;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = PCFSoftShadowMap;
    this.instance.setClearColor(0x223843);
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
  }

  update() {
    this.instance.render(this.scene, this.camera);
    this.stats.update();
  }
}
