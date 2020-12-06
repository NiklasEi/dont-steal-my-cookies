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
    this.load.image(assetKeys.hands.orangeHand, 'assets/hands/orangeHand.png');

    this.load.image(assetKeys.cookieHands.whiteChocolateChip, 'assets/cookieHands/chocolateChip.png');
    this.load.image(assetKeys.cookieHands.whiteMacaroon, 'assets/cookieHands/macaroon.png');
    this.load.image(assetKeys.cookieHands.whiteSoftCookie, 'assets/cookieHands/softCookie.png');
    this.load.image(assetKeys.cookieHands.whiteCrescent, 'assets/cookieHands/crescent.png');
    this.load.image(assetKeys.cookieHands.orangeChocolateChip, 'assets/cookieHands/orangeChocolateChip.png');
    this.load.image(assetKeys.cookieHands.orangeMacaroon, 'assets/cookieHands/orangeMacaroon.png');
    this.load.image(assetKeys.cookieHands.orangeSoftCookie, 'assets/cookieHands/orangeSoftCookie.png');
    this.load.image(assetKeys.cookieHands.orangeCrescent, 'assets/cookieHands/orangeCrescent.png');
    this.load.image(assetKeys.cookieHands.coloredChocolateChip, 'assets/cookieHands/coloredChocolateChip.png');
    this.load.image(assetKeys.cookieHands.coloredMacaroon, 'assets/cookieHands/coloredMacaroon.png');
    this.load.image(assetKeys.cookieHands.coloredSoftCookie, 'assets/cookieHands/coloredSoftCookie.png');
    this.load.image(assetKeys.cookieHands.coloredCrescent, 'assets/cookieHands/coloredCrescent.png');

    this.load.image(assetKeys.table, 'assets/table.png');
    this.load.image(assetKeys.spatula, 'assets/spatula.png');
    this.load.image(assetKeys.angryGingerbread, 'assets/angryGingerbread.png');

    // menu
    this.load.image(assetKeys.menu.playButton, 'assets/playButton.png');

    // cookies
    this.load.image(assetKeys.cookies.chocolateChip, 'assets/cookies/chocolateChip.png');
    this.load.image(assetKeys.cookies.macaroon, 'assets/cookies/macaroon.png');
    this.load.image(assetKeys.cookies.softCookie, 'assets/cookies/softCookie.png');
    this.load.image(assetKeys.cookies.crescent, 'assets/cookies/crescent.png');

    // hud
    this.load.image(assetKeys.cookieCounter, 'assets/cookieCounter.png');
  }

  create() {
    this.scene.start(scenes.mainMenu);
  }
}
