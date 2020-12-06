import * as Phaser from 'phaser';
import { assetKeys, dimensions, scenes } from '../utils/constants';

export default class MainMenu extends Phaser.Scene {
  private won = false;
  private lost = false;

  constructor() {
    super(scenes.mainMenu);
  }

  init(data: { won?: boolean; lost?: boolean }) {
    this.lost = data.lost ?? false;
    this.won = data.won ?? false;
  }

  create() {
    const background = this.add.image(dimensions.width / 2, dimensions.height / 2, assetKeys.table);
    background.scale = 0.5;
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
      this.scene.start(scenes.gameScene);
    });

    if (this.won) {
      this.add.text(160, dimensions.height / 2 + 90, 'You won!');
      this.add.image(200, dimensions.height / 2, assetKeys.happyGingerbread);
      this.renderPlayAgainButton();
    }

    if (this.lost) {
      this.add.text(160, dimensions.height / 2 + 90, 'You lost!');
      this.add.image(200, dimensions.height / 2, assetKeys.angryGingerbread);
      this.renderPlayAgainButton();
    }
  }

  renderPlayAgainButton() {
    const playButton = this.add.image(
      this.game.renderer.width / 2,
      this.game.renderer.height / 2,
      assetKeys.menu.playButton
    );
    const replay = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, assetKeys.menu.repeat);
    replay.scale = 0.08;
    playButton.setInteractive();
    playButton.scale = 0.1;
    playButton.on('pointerdown', () => {
      playButton.setTint(0x808080);
    });
    playButton.on('pointerup', () => {
      this.scene.start(scenes.gameScene);
    });
  }
}
