import * as Phaser from 'phaser';
import { assetKeys, dimensions, events, scenes } from '../utils/constants';
import Vector2 = Phaser.Math.Vector2;
import { sceneEvents } from '../events/EventCenter';

export class GameScene extends Phaser.Scene {
  private readonly handOffset = new Vector2(400, 0);
  private readonly spatulaOffset = new Vector2(0, 150);
  private spatula!: Phaser.GameObjects.Image;
  private spatulaTween?: Phaser.Tweens.Tween;
  private readonly plate = new Vector2(dimensions.width / 2, dimensions.height / 2);
  private hand?: Phaser.GameObjects.Image;
  private cookieHand?: Phaser.GameObjects.Image;
  private cookieHandTween?: Phaser.Tweens.Tween;
  private cookieToGive: string = assetKeys.cookies.chocolateChip;
  private handTween?: Phaser.Tweens.Tween;
  private readonly cookies: Phaser.GameObjects.Image[] = [];
  private score = 0;
  private readonly wonAt = 25;

  constructor() {
    super(scenes.gameScene);
  }

  init() {
    this.score = 5;
    this.hand = undefined;
    this.cookieHand = undefined;
    const background = this.add.image(dimensions.width / 2, dimensions.height / 2, assetKeys.table);
    background.scale = 0.5;
    this.spatula = this.add.image(dimensions.width / 2, dimensions.height / 2, assetKeys.spatula);
    this.spatula.alpha = 0;
    this.spatula.setRotation(Math.PI / 2);
    this.scene.run(scenes.gameHud, { score: this.score });

    for (let i = 0; i < this.score; i++) {
      this.selectRandomCookieHand();
      this.displayCookieToGive();
    }

    this.input.on('pointerdown', (pointer: { x: number; y: number }) => {
      this.spawnSpatula(pointer.x + this.spatulaOffset.x, pointer.y + this.spatulaOffset.y);
    });
  }

  update() {
    if (this.hand === undefined && Math.random() > 0.96) {
      let startPoint = this.getRandomStartPoint();
      let angle = this.plate.clone().subtract(startPoint).angle();
      if (this.cookieHand !== undefined) {
        let angleHand = angle < 0 ? angle + 2 * Math.PI : angle;
        const angleCookieHand =
          this.cookieHand.rotation < 0 ? this.cookieHand.rotation + 2 * Math.PI : this.cookieHand.rotation;

        while (Math.abs(angleCookieHand - angleHand) < Math.PI / 2) {
          startPoint = this.getRandomStartPoint();
          angle = this.plate.clone().subtract(startPoint).angle();
          angleHand = angle < 0 ? angle + 2 * Math.PI : angle;
        }
      }
      const offset = this.handOffset.clone().rotate(angle);
      const dist = this.plate.clone().subtract(startPoint.clone().add(offset));
      this.hand = this.add.image(startPoint.x - offset.x, startPoint.y - offset.y, this.getRandomHandKey());
      this.hand.setRotation(angle);
      this.hand.setInteractive();
      this.hand.on('pointerdown', (pointer: { x: number; y: number }) => {
        this.spawnSpatula(pointer.x + this.spatulaOffset.x, pointer.y + this.spatulaOffset.y);
        this.hand?.destroy();
        this.hand = undefined;
        this.handTween?.stop();
        this.handTween = undefined;
      });
      this.handTween = this.add.tween({
        targets: this.hand,
        y: startPoint.y + dist.y,
        x: startPoint.x + dist.x,
        duration: 1000,
        // eslint-disable-next-line no-console
        onComplete: () => {
          this.score -= 1;
          if (Math.random() < 0.5) {
            this.sound.play(assetKeys.sounds.crunchOne);
          } else {
            this.sound.play(assetKeys.sounds.crunchTwo);
          }
          if (this.score < 1) {
            sceneEvents.emit(events.gameOver);
            this.scene.start(scenes.mainMenu, { lost: true });
          }
          this.takeCookie();
          sceneEvents.emit(events.updateScore, this.score);
          this.hand?.destroy();
          this.hand = undefined;
        }
      });
    }
    if (this.cookieHand === undefined && Math.random() > 0.995) {
      let startPoint = this.getRandomStartPoint();
      let angle = this.plate.clone().subtract(startPoint).angle();
      if (this.hand !== undefined) {
        let angleCookieHand = angle < 0 ? angle + 2 * Math.PI : angle;
        const angleHand = this.hand.rotation < 0 ? this.hand.rotation + 2 * Math.PI : this.hand.rotation;

        while (Math.abs(angleCookieHand - angleHand) < Math.PI / 2) {
          startPoint = this.getRandomStartPoint();
          angle = this.plate.clone().subtract(startPoint).angle();
          angleCookieHand = angle < 0 ? angle + 2 * Math.PI : angle;
        }
      }
      const offset = this.handOffset.clone().rotate(angle);
      const dist = this.plate.clone().subtract(startPoint.clone().add(offset));
      this.cookieHand = this.add.image(startPoint.x - offset.x, startPoint.y - offset.y, this.selectRandomCookieHand());
      this.cookieHand.setRotation(angle);
      this.cookieHand.setInteractive();
      this.cookieHand.on('pointerdown', (pointer: { x: number; y: number }) => {
        this.spawnSpatula(pointer.x + this.spatulaOffset.x, pointer.y + this.spatulaOffset.y);
        this.cookieHand?.destroy();
        this.cookieHand = undefined;
        this.cookieHandTween?.stop();
        this.cookieHandTween = undefined;
      });
      this.cookieHandTween = this.add.tween({
        targets: this.cookieHand,
        y: startPoint.y + dist.y,
        x: startPoint.x + dist.x,
        duration: 1000,
        // eslint-disable-next-line no-console
        onComplete: () => {
          this.score += 1;
          if (this.score >= this.wonAt) {
            sceneEvents.emit(events.gameOver);
            this.scene.start(scenes.mainMenu, { won: true });
          }
          this.displayCookieToGive();
          sceneEvents.emit(events.updateScore, this.score);
          this.cookieHand?.destroy();
          this.cookieHand = undefined;
        }
      });
    }
  }

  private getRandomStartPoint() {
    const rand = Math.random();
    if (rand < 0.25) {
      return new Vector2(Math.random() * dimensions.width, 0);
    } else if (rand < 0.5) {
      return new Vector2(Math.random() * dimensions.width, dimensions.height);
    } else if (rand < 0.75) {
      return new Vector2(0, Math.random() * dimensions.height);
    } else {
      return new Vector2(dimensions.width, Math.random() * dimensions.height);
    }
  }

  private spawnSpatula(x: number, y: number) {
    this.spatulaTween?.stop();
    this.spatula.setPosition(x, y);
    this.spatula.alpha = 1;
    this.sound.play(assetKeys.sounds.hit);
    this.spatulaTween = this.add.tween({ targets: this.spatula, alpha: 0, duration: 400 });
  }

  private getRandomHandKey() {
    const rand = Math.random();
    if (rand < 0.33) {
      return assetKeys.hands.coloredHand;
    } else if (rand < 0.66) {
      return assetKeys.hands.coloredNailsHand;
    } else {
      return assetKeys.hands.whiteHand;
    }
  }

  private selectRandomCookieHand() {
    const rand = Math.random();
    const randomColor = Math.random();
    if (rand < 0.25) {
      this.cookieToGive = assetKeys.cookies.softCookie;
      if (randomColor < 0.33) {
        return assetKeys.cookieHands.coloredSoftCookie;
      } else if (randomColor < 0.66) {
        return assetKeys.cookieHands.orangeSoftCookie;
      } else {
        return assetKeys.cookieHands.whiteSoftCookie;
      }
    } else if (rand < 0.5) {
      this.cookieToGive = assetKeys.cookies.chocolateChip;
      if (randomColor < 0.33) {
        return assetKeys.cookieHands.coloredChocolateChip;
      } else if (randomColor < 0.66) {
        return assetKeys.cookieHands.orangeChocolateChip;
      } else {
        return assetKeys.cookieHands.whiteChocolateChip;
      }
    } else if (rand < 0.75) {
      this.cookieToGive = assetKeys.cookies.macaroon;
      if (randomColor < 0.33) {
        return assetKeys.cookieHands.coloredMacaroon;
      } else if (randomColor < 0.66) {
        return assetKeys.cookieHands.orangeMacaroon;
      } else {
        return assetKeys.cookieHands.whiteMacaroon;
      }
    } else {
      this.cookieToGive = assetKeys.cookies.crescent;
      if (randomColor < 0.33) {
        return assetKeys.cookieHands.coloredCrescent;
      } else if (randomColor < 0.66) {
        return assetKeys.cookieHands.orangeCrescent;
      } else {
        return assetKeys.cookieHands.whiteCrescent;
      }
    }
  }

  private takeCookie() {
    if (this.cookies.length < 1) return;
    const cookie = this.cookies.pop();
    cookie?.destroy();
  }

  private displayCookieToGive() {
    const position = this.getRandomPositionOnPlate();
    const cookie = this.add.image(position.x, position.y, this.cookieToGive);
    cookie.scale = 0.25;
    cookie.setRotation(Math.random() * 2 * Math.PI);
    this.cookies.push(cookie);
  }

  private getRandomPositionOnPlate(): Vector2 {
    const vector = new Vector2(10, 0).rotate(Math.random() * 2 * Math.PI).scale(Math.random() + 2);
    return this.plate.clone().add(vector);
  }
}
