export class Word {

    constructor(scene, texto, x, y, speed) {

        this.scene = scene;
        this.texto = texto;

        this.isSelected = false;
        this.speed = speed;

        // =========================
        // TEXTO BASE (GRIS)
        // =========================

        this.baseText = scene.add.text(0, 0, texto, {
            fontFamily: 'LuckiestGuy',
            fontSize: '32px',
            color: '#fff',

            stroke: '#000000',
            strokeThickness: 7
        })
            .setOrigin(0.5);

        // =========================
        // TEXTO PROGRESO (VERDE)
        // =========================

        this.progressText = scene.add.text(0, 0, texto, {
            fontFamily: 'LuckiestGuy',
            fontSize: '32px',

            color: '#00ff00',

            stroke: '#000000',
            strokeThickness: 7
        })
            .setOrigin(0.5);

        this.progressText.postFX.addGlow(
            0x00ff00,
            2,      // distancia
            0,      // outer strength
            false,  // knockout
            0.08,   // inner strength
            8       // quality
        );

        // =========================
        // MÁSCARA
        // =========================

        this.maskGraphics = scene.make.graphics();

        this.mask = this.maskGraphics.createGeometryMask();

        this.progressText.setMask(this.mask);

        // =========================
        // PADDING
        // =========================

        this.paddingX = 32;
        this.paddingY = 20;

        const width =
            this.baseText.width + this.paddingX;

        const height =
            this.baseText.height + this.paddingY;

        // =========================
        // BACKGROUND
        // =========================

        this.background = scene.add.nineslice(
            0,
            3,
            'button',
            0,
            width,
            height,
            1,
            1,
            1,
            1
        )
            .setOrigin(0.5);

        this.backgroundGlow =
            this.background.postFX.addGlow(
                0xffff99,
                0,
                0,
                false,
                0.08,
                8
            );

        this.backgroundGlow.setActive(false);

        // =========================
        // CONTAINER
        // =========================

        this.container = scene.add.container(x, y, [
            this.background,
            this.baseText,
            this.progressText
        ]);

        this.updateVisual("");
    }

    update() {

        this.container.y += this.speed;
        this.updateMask();
    }

    updateMask() {

        const progress =
            Phaser.Math.Clamp(
                this.currentProgress || 0,
                0,
                1
            );

        const revealWidth =
            this.baseText.width * progress;

        this.maskGraphics.clear();

        this.maskGraphics.fillStyle(0xffffff);

        this.maskGraphics.fillRect(
            this.container.x - this.baseText.width / 2,
            this.container.y - this.baseText.height / 2,
            revealWidth,
            this.baseText.height
        );
    }

    updateVisual(inputText) {

        if (!this.isSelected) {

            this.currentProgress = 0;
            return;
        }

        this.currentProgress =
            inputText.length / this.texto.length;
    }

    isOutOfBounds(limitY) {
        return this.container.y > limitY;
    }

    setSelected(value) {
        if (this.isSelected === value)
            return;

        this.isSelected = value;

        this.scene.tweens.killTweensOf(this.container);

        this.scene.tweens.killTweensOf(this.backgroundGlow);

        if (value) {

            // =====================
            // GLOW ON
            // =====================

            this.backgroundGlow.setActive(true);

            this.backgroundGlow.outerStrength = 0;

            this.selectTween = this.scene.tweens.add({

                targets: this.backgroundGlow,

                outerStrength: 5,

                yoyo: true,

                repeat: -1,

                duration: 350
            });

        } else {

            // =====================
            // GLOW OFF
            // =====================

            this.scene.tweens.add({

                targets: this.backgroundGlow,

                outerStrength: 0,

                duration: 120,

                ease: 'Sine.Out',

                onComplete: () => {

                    this.backgroundGlow.setActive(false);
                }
            });

            // =====================
            // RESET SCALE
            // =====================

            this.scene.tweens.add({

                targets: this.container,

                scaleX: 1,
                scaleY: 1,

                duration: 100
            });
        }
    }

    refreshBackgroundSize() {

        const width =
            this.baseText.width + this.paddingX;

        const height =
            this.baseText.height + this.paddingY;

        this.background.resize(width, height);
    }

    getCorrectCharacterCount(inputText) {

        let count = 0;

        for (let i = 0; i < inputText.length; i++) {

            if (inputText[i] !== this.texto[i]) {
                break;
            }

            count++;
        }

        return count;
    }

    destroy() {

        this.maskGraphics.destroy();
        this.container.destroy();
    }
}