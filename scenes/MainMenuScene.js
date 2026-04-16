class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
  }

  addImageWithShadow(image, x, y, scale, depth, shadowXOffset, shadowYOffset, alpha) {
    this.add.image(x, y, image)
      .setOrigin(1, 1)
      .setScale(scale)
      .setDepth(depth);

    this.add.image(x + shadowXOffset, y + shadowYOffset, image)
      .setOrigin(1, 1)
      .setScale(scale + 0.01)
      .setDepth(depth - 1)
      .setTint(0x000000)
      .setAlpha(alpha);
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // Fondo
    const { width, height } = this.cameras.main;
    this.background = this.add.image(0, 0, 'background')
      .setOrigin(0)
      .setDisplaySize(width, height)
      .setDepth(-10);

    // Yae
    this.addImageWithShadow('yae1', width - 25, height - 10, 0.3, 10, 10, 13, 0.7);

    // Título
    this.add.text(centerX, centerY - 120, 'ESCRIBÍ PALABRAS', {
      fontSize: '40px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Opciones
    this.options = ['Jugar', 'High Scores'];
    this.selectedIndex = 0;
    this.menuTexts = [];

    this.startY = centerY;

    this.renderMenu();

    // Input
    this.input.keyboard.on('keydown-UP', () => {
      this.selectedIndex =
        (this.selectedIndex - 1 + this.options.length) % this.options.length;
      this.renderMenu();
    });

    this.input.keyboard.on('keydown-DOWN', () => {
      this.selectedIndex =
        (this.selectedIndex + 1) % this.options.length;
      this.renderMenu();
    });

    this.input.keyboard.on('keydown-ENTER', () => {
      this.handleSelection();
    });
  }

  renderMenu() {
    const centerX = this.cameras.main.centerX;

    // Limpiar
    this.menuTexts.forEach(t => t.destroy());
    this.menuTexts = [];

    for (let i = 0; i < this.options.length; i++) {
      const isSelected = i === this.selectedIndex;

      const text = this.add.text(
        centerX,
        this.startY + i * 50,
        this.options[i],
        {
          fontSize: '28px',
          color: isSelected ? '#ffff00' : '#ffffff'
        }
      )
        .setOrigin(0.5);

      text.setScale(isSelected ? 1.2 : 1);

      this.menuTexts.push(text);
    }
  }

  handleSelection() {
    const option = this.options[this.selectedIndex];

    if (option === 'Jugar') {
      this.scene.start('LevelSelectScene');
    }

    if (option === 'High Scores') {
      this.scene.start('HighScoreScene');
    }
  }
}