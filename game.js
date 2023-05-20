class Stage1 extends Phaser.Scene {
  constructor() {
    super('stage1', 'Stage1');
  }

  preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('bow', 'assets/bow.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('arrow', 'assets/arrow.png');
    this.load.image('bird', 'assets/bird.png');
  }

  create() {
    this.add.image(320, 256, 'background');

    const bow = this.add.image(130, 416, 'bow').setDepth(1);
    const player = this.add.image(90, 434, 'player').setDepth(1);
    const arrow = this.physics.add.sprite(player.x, player.y - 50, 'arrow').setScale(0.2);
    const bird1 = this.physics.add.sprite(30, 50, 'bird');

    arrow.disableBody(true, true);

    let angle = 0;

    this.input.on('pointermove', (pointer) => {
      angle = Phaser.Math.Angle.BetweenPoints(player, pointer);
      bow.rotation = angle;
    });

    this.input.on('pointerup', () => {
      arrow.rotation = angle;
      arrow.enableBody(true, bow.x, bow.y - 50, true, true);
      this.physics.velocityFromRotation(angle, 600, arrow.body.velocity);
    });

    this.physics.add.collider(arrow, bird1, function (arrow, bird1) {
      this.scene.start('win');
    });
  }
}

class Win extends Phaser.Scene {
  constructor() {
    super('win', 'Win');
  }
  create() {
    this.add.text(50, 50, "Victory!").setFontSize(50);
    this.add.text(50, 100, "Click to restart.").setFontSize(20);
    this.input.on('pointerdown', () => this.scene.start('stage1'));
  }
}

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 512,
  parent: 'd3-physics',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 }
    }
  },
  scene: [Stage1, Win]
};

const game = new Phaser.Game(config);
