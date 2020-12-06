import * as Phaser from 'phaser';
import {assetKeys, scenes} from '../utils/constants';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(scenes.preloader);
  }

  preload() {
    // load assets
    this.load.image(assetKeys.tiles.floor, 'assets/floor.png');
  }

  create() {
    // creating preloader
  }
}
