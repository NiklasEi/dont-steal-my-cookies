import * as Phaser from 'phaser';

import { assetKeys, dimensions, events, scenes } from '../utils/constants';
import { sceneEvents } from '../events/EventCenter';

export default class GameHud extends Phaser.Scene {
  private scoreText!: Phaser.GameObjects.Text;
  private cookieCounter!: Phaser.GameObjects.Image;
  constructor() {
    super(scenes.gameHud);
  }

  init(data: { score: number }) {
    // eslint-disable-next-line no-console
    console.log('new hud');
    this.cookieCounter = this.add.image(dimensions.width - 60, 60, assetKeys.cookieCounter);
    this.cookieCounter.scale = 0.33;

    this.scoreText = this.add.text(dimensions.width - 70, 50, `${data.score}`);
    sceneEvents.on(events.updateScore, this.updateScore, this);
    sceneEvents.once(
      events.gameOver,
      () => {
        sceneEvents.off(events.updateScore, this.updateScore, this);
        this.cookieCounter.alpha = 0;
        this.scoreText.alpha = 0;
      },
      this
    );
  }

  updateScore(score: number) {
    this.cookieCounter.alpha = 1;
    this.scoreText.alpha = 1;
    this.scoreText.text = `${score}`;
  }
}
