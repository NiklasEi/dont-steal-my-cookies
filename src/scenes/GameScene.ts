import * as Phaser from 'phaser';
import {assetKeys, scenes} from "../utils/constants";

export class GameScene extends Phaser.Scene {
  constructor() {
    super(scenes.gameScene);
  }

  create() {
    this.scene.run(scenes.gameHud);
    this.add.image(
        this.game.renderer.width / 2,
        this.game.renderer.height / 2,
        assetKeys.table)
  }

  update() {
    // updating game scene
  }
}
