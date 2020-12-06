import * as Phaser from 'phaser';

import { assetKeys, dimensions, events, scenes } from '../utils/constants';
import { sceneEvents } from '../events/EventCenter';
import { GameScene } from './GameScene';

export default class GameHud extends Phaser.Scene {
  private score!: number;
  private scoreText!: Phaser.GameObjects.Text;
  constructor() {
    super(scenes.gameHud);
  }

  init(data: { score: number }) {
    this.score = data.score;
  }

  create() {
    const cookieCounter = this.add.image(dimensions.width - 60, 60, assetKeys.cookieCounter);
    cookieCounter.scale = 0.33;

    this.scoreText = this.add.text(dimensions.width - 70, 50, `${this.score}`);
    sceneEvents.on(
      events.updateScore,
      (score: number) => {
        this.scoreText.text = `${score}`;
      },
      this
    );
    sceneEvents.on(
      events.won,
      (gameScene: GameScene) => {
        const text = this.add.text(160, dimensions.height / 2 + 90, 'You won!');
        const playButton = this.add.image(
          this.game.renderer.width / 2,
          this.game.renderer.height / 2,
          assetKeys.menu.playButton
        );
        playButton.setInteractive();
        playButton.scale = 0.1;
        playButton.on('pointerdown', () => {
          playButton.setTint(0x808080);
        });
        playButton.on('pointerup', () => {
          text.destroy();
          gameScene.scene.remove();
          this.scene.run(scenes.gameScene);
          this.scene.remove();
        });
      },
      this
    );
    sceneEvents.on(
      events.lost,
      (gameScene: GameScene) => {
        const text = this.add.text(160, dimensions.height / 2 + 90, 'You lost!');
        const ginger = this.add.image(200, dimensions.height / 2, assetKeys.angryGingerbread);
        const playButton = this.add.image(
          this.game.renderer.width / 2,
          this.game.renderer.height / 2,
          assetKeys.menu.playButton
        );
        playButton.setInteractive();
        playButton.scale = 0.1;
        playButton.on('pointerdown', () => {
          playButton.setTint(0x808080);
        });
        playButton.on('pointerup', () => {
          text.destroy();
          ginger.destroy();
          gameScene.scene.remove();
          this.scene.run(scenes.gameScene);
          this.scene.remove();
        });
      },
      this
    );
  }
}
