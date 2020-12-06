import * as Phaser from 'phaser';
import { assetKeys, dimensions, scenes } from '../utils/constants';

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super(scenes.mainMenu);
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
  }
}
