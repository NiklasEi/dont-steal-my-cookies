import * as Phaser from 'phaser';

import { dimensions, events, scenes } from '../utils/constants';
import { sceneEvents } from '../events/EventCenter';

export default class GameHud extends Phaser.Scene {
  private score!: Phaser.GameObjects.Text;
  constructor() {
    super(scenes.gameHud);
  }

  update() {
    // updating game hud
  }

  create() {
    this.score = this.add.text(dimensions.width - 150, 20, 'cookies: 100');
    sceneEvents.on(
      events.updateScore,
      (score: number) => {
        this.score.text = `cookies: ${score}`;
      },
      this
    );
  }
}
