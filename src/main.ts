import { dimensions } from './utils/constants';
import Preloader from './scenes/Preloader';
import MainMenu from './scenes/MainMenu';
import { GameScene } from './scenes/GameScene';
import GameHud from './scenes/GameHud';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: "Don't steal my cookies",
  type: Phaser.WEBGL,
  scene: [Preloader, MainMenu, GameScene, GameHud],
  backgroundColor: '#000000',
  parent: 'content',

  width: dimensions.width,
  height: dimensions.height
};

export const game = new Phaser.Game(gameConfig);
