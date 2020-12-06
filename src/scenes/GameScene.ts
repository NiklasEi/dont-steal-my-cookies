import * as Phaser from 'phaser';
import { assetKeys, dimensions, events, scenes } from '../utils/constants';
import Vector2 = Phaser.Math.Vector2;
import { sceneEvents } from '../events/EventCenter';

export class GameScene extends Phaser.Scene {
  private readonly handOffset = new Vector2(120, 0);
  private readonly spatulaOffset = new Vector2(0, 150);
  private spatula!: Phaser.GameObjects.Image;
  private spatulaTween?: Phaser.Tweens.Tween;
  private readonly plate = new Vector2(dimensions.width / 2, dimensions.height / 2);
  private hand?: Phaser.GameObjects.Image;
  private handTween?: Phaser.Tweens.Tween;
  private score = 100;

  constructor() {
    super(scenes.gameScene);
  }

  create() {
    this.scene.run(scenes.gameHud);
    const background = this.add.image(dimensions.width / 2, dimensions.height / 2, assetKeys.table);
    background.scale = 0.5;
    this.spatula = this.add.image(dimensions.width / 2, dimensions.height / 2, assetKeys.spatula);
    this.spatula.alpha = 0;
    this.spatula.setRotation(Math.PI / 2);

    this.input.on('pointerdown', (pointer: { x: number; y: number }) => {
      this.spawnSpatula(pointer.x + this.spatulaOffset.x, pointer.y + this.spatulaOffset.y);
    });
  }

  update() {
    if (this.hand === undefined) {
      const startPoint = this.getRandomStartPoint();
      const angle = this.plate.clone().subtract(startPoint).angle();
      const dist = this.plate.clone().subtract(startPoint.clone().add(this.handOffset.clone().rotate(angle)));
      this.hand = this.add.image(startPoint.x, startPoint.y, assetKeys.hand);
      this.hand.setRotation(angle);
      this.hand.setInteractive();
      this.hand.on('pointerdown', (pointer: { x: number; y: number }) => {
        this.spawnSpatula(pointer.x + this.spatulaOffset.x, pointer.y + this.spatulaOffset.y);
        this.hand?.destroy();
        this.hand = undefined;
        this.handTween?.stop();
        this.handTween = undefined;
      });
      this.handTween = this.add.tween({
        targets: this.hand,
        y: startPoint.y + dist.y,
        x: startPoint.x + dist.x,
        duration: 1000,
        // eslint-disable-next-line no-console
        onComplete: () => {
          this.score -= 1;
          sceneEvents.emit(events.updateScore, this.score);
          this.hand?.destroy();
          this.hand = undefined;
        }
      });
    }
  }

  private getRandomStartPoint() {
    const rand = Math.random();
    if (rand < 0.25) {
      return new Vector2(Math.random() * dimensions.width, 0);
    } else if (rand < 0.5) {
      return new Vector2(Math.random() * dimensions.width, dimensions.height);
    } else if (rand < 0.75) {
      return new Vector2(0, Math.random() * dimensions.height);
    } else {
      return new Vector2(dimensions.width, Math.random() * dimensions.height);
    }
  }

  private spawnSpatula(x: number, y: number) {
    this.spatulaTween?.stop();
    this.spatula.setPosition(x, y);
    this.spatula.alpha = 1;
    this.spatulaTween = this.add.tween({ targets: this.spatula, alpha: 0, duration: 400 });
  }
}
