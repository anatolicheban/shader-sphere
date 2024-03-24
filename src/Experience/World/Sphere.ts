import {
  BufferGeometry,
  IcosahedronGeometry,
  Mesh,
  MeshStandardMaterial,
  ShaderMaterial,
  SphereGeometry,
  TextureLoader,
} from "three";

import vertexShader from "../../shaders/vertex.glsl";
import fragmentShader from "../../shaders/fragment.glsl";
import vertexPars from "../../shaders/vertexPars.glsl";
import vertexMain from "../../shaders/vertexMain.glsl";
import fragmentMain from "../../shaders/fragmentMain.glsl";
import fragmentPars from "../../shaders/fragmentPars.glsl";
import { Experience } from "../Experience";

export class Sphere extends Mesh<BufferGeometry, MeshStandardMaterial> {
  experience = new Experience();
  constructor() {
    super(new IcosahedronGeometry(1, 150), new MeshStandardMaterial({}));

    this.material.onBeforeCompile = (shader) => {
      this.material.userData.shader = shader;
      shader.uniforms.uTime = { value: 0 };
      const parsVertexStr = "#include <displacementmap_pars_vertex>";
      shader.vertexShader = shader.vertexShader.replace(
        parsVertexStr,
        parsVertexStr + "\n" + vertexPars,
      );

      const mainVertexStr = "#include <displacementmap_vertex>";

      shader.vertexShader = shader.vertexShader.replace(
        mainVertexStr,
        mainVertexStr + "\n" + vertexMain,
      );

      const mainFragmentStr = "#include <normal_fragment_maps>";
      const parsFragmentStr = "#include <bumpmap_pars_fragment>";

      shader.fragmentShader = shader.fragmentShader.replace(
        parsFragmentStr,
        parsFragmentStr + "\n" + fragmentPars,
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        mainFragmentStr,
        mainFragmentStr + "\n" + fragmentMain,
      );

      console.log(shader.fragmentShader);
    };
    this.experience.time.addHandler("tick", () => {
      this.material.userData.shader &&
        (this.material.userData.shader.uniforms.uTime = {
          value: Math.sin(this.experience.time.elapsed / 1000),
        });
    });
  }
}
