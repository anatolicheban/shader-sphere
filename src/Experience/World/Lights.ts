import { AmbientLight, DirectionalLight } from "three";

export class Lights {
  ambLight = new AmbientLight(0xffffff, 0.3);
  dirLight = new DirectionalLight(0xffff00, 1);
  dir2Light = new DirectionalLight(0xff00ff, 0.7)
  constructor() {
    this.dirLight.position.set(4, 5, 2);
    this.dir2Light.position.set(-2, 3, -2);
  }
}
