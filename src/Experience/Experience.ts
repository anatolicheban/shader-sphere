import { Scene } from "three";
import { Canvas } from "../models/models";
import { Camera } from "./Camera";
import { Renderer } from "./Renderer";
import { Sizes } from "./Utils/Sizes";
import { Time } from "./Utils/Time";
import { World } from "./World/World";

let instance: Experience;

export class Experience {
  canvas: Canvas;
  sizes: Sizes;
  time: Time;
  scene: Scene;
  camera: Camera;
  world: World;
  renderer: Renderer;

  constructor(element?: Canvas) {
    if (instance) {
      return instance;
    }

    instance = this;

    //Options
    this.canvas = element || null;

    //Setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new Scene();

    this.camera = new Camera();
    this.world = new World();
    this.renderer = new Renderer();

    this.sizes.addHandler("resize", () => {
      this.resize();
    });
    this.time.addHandler("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.renderer.update();
    this.camera.update();
  }
}
