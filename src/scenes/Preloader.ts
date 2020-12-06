import * as Phaser from 'phaser';
import { assetKeys, scenes } from '../utils/constants';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(scenes.preloader);
  }

  preload() {
    // game
    this.load.image(assetKeys.hands.whiteHand, 'assets/hands/whiteHand.png');
    this.load.image(assetKeys.hands.coloredHand, 'assets/hands/coloredHand.png');
    this.load.image(assetKeys.hands.coloredNailsHand, 'assets/hands/coloredNailsHand.png');

    this.load.image(assetKeys.cookieHands.chocolateChip, 'assets/cookieHands/chocolateChip.png');
    this.load.image(assetKeys.cookieHands.macaroon, 'assets/cookieHands/macaroon.png');
    this.load.image(assetKeys.cookieHands.softCookie, 'assets/cookieHands/softCookie.png');
    this.load.image(assetKeys.cookieHands.crescent, 'assets/cookieHands/crescent.png');

    this.load.image(assetKeys.table, 'assets/table.png');
    this.load.image(assetKeys.spatula, 'assets/spatula.png');

    // menu
    this.load.image(assetKeys.menu.playButton, 'assets/playButton.png');

    // cookies
    this.load.image(assetKeys.cookies.chocolateChip, 'assets/cookies/chocolateChip.png');
    this.load.image(assetKeys.cookies.macaroon, 'assets/cookies/macaroon.png');
    this.load.image(assetKeys.cookies.softCookie, 'assets/cookies/softCookie.png');
    this.load.image(assetKeys.cookies.crescent, 'assets/cookies/crescent.png');
  }

  create() {
    this.scene.start(scenes.mainMenu);
  }
}
