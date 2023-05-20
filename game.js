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
    const arrow = this.physics.add.sprite(player.x, player.y - 50, 'arrow').setScale(0.2).setGravity(0, 300);
    const bird = this.physics.add.sprite(320, 120, 'bird').setScale(0.5);

    let angle = 0;

    arrow.disableBody(true, true);

    this.input.on('pointermove', (pointer) => {
      angle = Phaser.Math.Angle.BetweenPoints(player, pointer);
      bow.rotation = angle;
    });

    this.input.on('pointerup', () => {
      arrow.rotation = angle;
      arrow.enableBody(true, bow.x, bow.y - 50, true, true);
      this.physics.velocityFromRotation(angle, 600, arrow.body.velocity);
    });

    this.physics.add.collider(arrow, bird, function (arrow, bird) {
      game.scene.stop('stage1');
      game.scene.start('win');
    });
  }
}

class Stage2 extends Phaser.Scene {
  constructor() {
    super('stage2', 'Stage2');
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
    const arrow = this.physics.add.sprite(player.x, player.y - 50, 'arrow').setScale(0.2).setGravity(0, 300);
    const bird1 = this.physics.add.sprite(240, 80, 'bird').setScale(0.5);
    const bird2 = this.physics.add.sprite(410, 130, 'bird').setScale(0.5);

    let birds = this.add.group();
    birds.add(bird1);
    birds.add(bird2);

    let score = 0;
    let angle = 0;

    arrow.disableBody(true, true);

    this.input.on('pointermove', (pointer) => {
      angle = Phaser.Math.Angle.BetweenPoints(player, pointer);
      bow.rotation = angle;
    });

    this.input.on('pointerup', () => {
      arrow.rotation = angle;
      arrow.enableBody(true, bow.x, bow.y - 50, true, true);
      this.physics.velocityFromRotation(angle, 600, arrow.body.velocity);
    });

    this.physics.add.collider(arrow, birds, function (arrow, birds) {
      birds.destroy();
      score += 1;
      if (score >= 2) {
        game.scene.stop('stage2');
        game.scene.start('win');
      }
    });
  }
}

class Stage3 extends Phaser.Scene {
  constructor() {
    super('stage3', 'Stage3');
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
    const arrow = this.physics.add.sprite(player.x, player.y - 50, 'arrow').setScale(0.2).setGravity(0, 300);
    const bird1 = this.physics.add.sprite(140, 50, 'bird').setScale(0.5);
    const bird2 = this.physics.add.sprite(320, 120, 'bird').setScale(0.5);
    const bird3 = this.physics.add.sprite(500, 50, 'bird').setScale(0.5);

    let birds = this.add.group();
    birds.add(bird1);
    birds.add(bird2);
    birds.add(bird3);

    let score = 0;
    let angle = 0;

    arrow.disableBody(true, true);

    this.input.on('pointermove', (pointer) => {
      angle = Phaser.Math.Angle.BetweenPoints(player, pointer);
      bow.rotation = angle;
    });

    this.input.on('pointerup', () => {
      arrow.rotation = angle;
      arrow.enableBody(true, bow.x, bow.y - 50, true, true);
      this.physics.velocityFromRotation(angle, 600, arrow.body.velocity);
    });

    this.physics.add.collider(arrow, birds, function (arrow, birds) {
      birds.destroy();
      score += 1;
      if (score >= 3) {
        game.scene.stop('stage3');
        game.scene.start('win');
      }
    });
  }
}

class Win extends Phaser.Scene {
  constructor() {
    super('win', 'Win');
  }
  create() {
    this.add.text(200, 200, "Victory!").setFontSize(50);
    this.add.text(200, 400, "Click to go back.").setFontSize(20);
    this.input.on('pointerdown', () => this.scene.start('menu'));
  }
}

class Menu extends Phaser.Scene {
  constructor() {
    super('menu', 'Menu');
  }
  create() {
    this.add.text(60, 100, "Bird Hunt").setFontSize(100);
    this.add.text(200, 250, "Stage 1")
      .setFontSize(50)
      .setPadding(10)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('stage1'));
    this.add.text(200, 300, "Stage 2")
      .setFontSize(50)
      .setPadding(10)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('stage2'));
    this.add.text(200, 350, "Stage 3")
      .setFontSize(50)
      .setPadding(10)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('stage3'));
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
      gravity: { y: 0 }
    }
  },
  scene: [Win, Menu, Stage1, Stage2, Stage3]
};

const game = new Phaser.Game(config);
