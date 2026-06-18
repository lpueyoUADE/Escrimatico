import TextButton from '../components/TextButton.js';

export default class BaseScene extends Phaser.Scene {
    constructor(key) {
        super(key);
    }

    goToScene(nextScene, data = null) {
        this.cameras.main.fadeOut(400);

        this.time.delayedCall(400, () => {
            this.scene.start(nextScene, data);
        });
    }

    createButton(x, y, text, callback, color='#ffffff') {
        const button = this.add.text(x, y, text, {
            fontFamily: 'LuckiestGuy',
            fontSize: '36px',
            color: color,
            stroke: '#000000',
            strokeThickness: 10
        })
            .setOrigin(0.5)
            .setInteractive();

        button.enabled = true;

        // Hover
        button.on('pointerover', () => {
            if(!button.enabled)
                return;

            button.setColor('#ffff00');
            this.tweens.add({
                targets: button,
                scale: 1.1,
                duration: 100,
            });
        });

        button.on('pointerout', () => {
            this.tweens.add({
                targets: button,
                scale: 1,
                duration: 100,
            });
            button.setColor(color);
        });

        // Click
        button.on('pointerdown', () => {
            if(!button.enabled)
                return;

            this.tweens.add({
                targets: button,
                scale: 0.95,
                duration: 100,
                yoyo: true
            });

            callback();
        });

        return button;
    }

    createBackButton(nextScene, text = "Volver") {
        const { width, height } = this.cameras.main;

        const backButton = new TextButton(this, 100, 100, text, () => { this.goToScene(nextScene); })
            .setFontSize("24px");
    }

    setTitle(title) {
        const centerX = this.cameras.main.centerX;

        this.add.text(centerX, 100, title, {
            fontFamily: 'LuckiestGuy',
            fontSize: '60px',
            stroke: '#000000',
            strokeThickness: 6,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000',
                blur: 4,
                fill: true
            }
        }).setOrigin(0.5, 0.5)
        .setDepth(100);
    }

    setDevBuildText() {
        const centerX = this.cameras.main.centerX;
        const { width, height } = this.cameras.main;
        
        this.add.text(width - 150, 10, "Development Build", {
            fontSize: '14px',
            stroke: '#000000',
        }).setDepth(100);
    }

    addTeamFooter() {
        const { width, height } = this.cameras.main;
        this.team = this.add.text(10, height - 10, 'Cooperativa de trabajo EduJuegos Ltda\n' +
            'v0.1.0 © 2026', {
            // fontFamily: 'Fredoka',
            fontSize: '16px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        })
            .setOrigin(0, 1)
            .setDepth(20);
    }

    addYae(yaeImageName, x, y, scale, origin, bubbleInnerText) {
        // Yae
        const yae = this.add.image(x, y, yaeImageName)
            .setOrigin(...origin)
            .setScale(scale)
            .setDepth(10)
            .setInteractive();

        const yaeGlow = yae.postFX.addGlow(0xffffff, 2, 0);
        yaeGlow.outerStrength = 0;

        // Dialogo
        const bubbleContainer = this.add.container(yae.x, yae.y)
            .setDepth(200)
            .setAlpha(0);

        // Bubble centrado en el container
        const bubble = this.add.image(0, 0, 'dialogoIzq')
            .setOrigin(0.5)
            .setScale(0.25);

        // Texto centrado
        const bubbleText = this.add.text(0, 0, bubbleInnerText, {
            fontFamily:'Fredoka',
            fontSize: '18px',
            color: '#000000',
            wordWrap: { width: 220 },
            align: 'center'
        })
            .setOrigin(0.5);

        bubbleText.y -= 10;

        // Agregar al container
        bubbleContainer.add([bubble, bubbleText]);

        const padding = 100;
        const textWidth = bubbleText.width + padding;
        const textHeight = bubbleText.height + padding;
        bubble.setDisplaySize(textWidth, textHeight);

        // Posicionar el container relativo a Yae
        bubbleContainer.setPosition(
            yae.x - yae.displayWidth - 50,
            yae.y - yae.displayHeight - 50
        );

        let bubbleTween = null;

        yae.on('pointerover', () => {
            if (bubbleTween) bubbleTween.stop();

            bubbleTween = this.tweens.add({
                targets: bubbleContainer,
                alpha: 1,
                duration: 300
            });

            this.tweens.add({
                targets: yaeGlow,
                outerStrength: 4,
                duration: 200,
                ease: 'Sine.easeOut'
            });
        });

        yae.on('pointerout', () => {
            if (bubbleTween) bubbleTween.stop();

            bubbleTween = this.tweens.add({
                targets: bubbleContainer,
                alpha: 0,
                duration: 300
            });

            this.tweens.add({
                targets: yaeGlow,
                outerStrength: 0,
                duration: 200,
                ease: 'Sine.easeIn'
            });
        });

        this.tweens.add({
            targets: bubbleContainer,
            y: bubbleContainer.y - 5,
            duration: 700,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    create() {
        this.setDevBuildText();
    }
}