import * as Phaser from 'phaser';
import {assetKeys, scenes} from '../utils/constants';

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super(scenes.mainMenu);
  }

  create() {
    const playButton = this.add.image(
        this.game.renderer.width / 2,
        this.game.renderer.height / 2,
        assetKeys.menu.playButton
    );
    playButton.setInteractive();
    playButton.on('pointerdown', () => {
      playButton.setTint(0x808080);
    });
    playButton.on('pointerup', () => {
      this.scene.start(scenes.gameScene);
    });
  }
}
