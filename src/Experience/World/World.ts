import { Experience } from "../Experience";
import { Lights } from "./Lights";
import { Sphere } from "./Sphere";
import { AxesHelper } from "three";

export class World {
  experience = new Experience();
  lights = new Lights();
  sphere = new Sphere();

  constructor() {
    this.experience.scene.add(
      this.lights.ambLight,
      this.lights.dirLight,
      this.sphere,
      this.lights.dir2Light,
      new AxesHelper(3),
    );
  }
}
