import * as Phaser from 'phaser';
import {assetKeys, scenes} from '../utils/constants';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(scenes.preloader);
  }

  preload() {
    // game
    this.load.image(assetKeys.hand, 'assets/hand.png');
    this.load.image(assetKeys.table, 'assets/table.png');

    // menu
    this.load.image(assetKeys.menu.playButton, 'assets/playButton.png');
  }

  create() {
    this.scene.start(scenes.mainMenu);
  }
}
