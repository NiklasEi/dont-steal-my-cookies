import * as Phaser from 'phaser';
import {assetKeys, dimensions, scenes} from "../utils/constants";
import Vector2 = Phaser.Math.Vector2;

export class GameScene extends Phaser.Scene {
  private readonly handOffset = new Vector2(100, 0);
  private readonly plate = new Vector2(dimensions.width / 2, dimensions.height / 2);
  private hand?: Phaser.GameObjects.Image;

  constructor() {
    super(scenes.gameScene);
  }

  create() {
    this.scene.run(scenes.gameHud);
    const background = this.add.image(
        dimensions.width / 2,
        dimensions.height / 2,
        assetKeys.table)
    background.scale = 0.5;
  }

  update() {
    if (this.hand === undefined) {
      const startPoint = new Vector2(0, 0);
      const dist = this.plate.subtract(startPoint.add(this.handOffset));
      this.hand = this.add.image(
          0,
          0,
          assetKeys.hand)
      this.add.tween({targets: this.hand,
        y: dist.y,
        x: dist.x,
        duration: 2000,
        // eslint-disable-next-line no-console
        onComplete: () => console.log("done")});
    }
  }
}
