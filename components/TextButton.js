export default class TextButton extends Phaser.GameObjects.Text {
    constructor(
        scene,
        x,
        y,
        text,
        callback,
        color = '#ffffff'
    ) {

        super(scene, x, y, text, {

            fontFamily: 'LuckiestGuy',
            fontSize: '36px',
            color: color,
            stroke: '#000000',
            strokeThickness: 10
        });

        scene.add.existing(this);

        // =========================
        // STATE
        // =========================

        this.scene = scene;
        this.callback = callback;

        this.baseColor = color;
        this.disabledColor = '#777777';
        this.hoverColor = '#ffff00';

        this.enabled = true;

        // =========================
        // SETUP
        // =========================

        this.setOrigin(0.5);
        this.setInteractive();

        // =========================
        // EVENTS
        // =========================

        this.on('pointerover', () => {

            if (!this.enabled)
                return;

            this.setColor(this.hoverColor);

            this.scene.tweens.killTweensOf(this);

            this.scene.tweens.add({
                targets: this,
                scale: 1.1,
                duration: 100,
                ease: 'Sine.easeOut'
            });
        });

        this.on('pointerout', () => {

            if (!this.enabled)
                return;

            this.setColor(this.baseColor);

            this.scene.tweens.killTweensOf(this);

            this.scene.tweens.add({
                targets: this,
                scale: 1,
                duration: 100,
                ease: 'Sine.easeOut'
            });
        });

        this.on('pointerdown', () => {

            if (!this.enabled)
                return;

            this.scene.tweens.killTweensOf(this);

            this.scene.tweens.add({
                targets: this,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                ease: 'Sine.easeOut'
            });

            if (this.callback) {
                this.callback();
            }
        });

        this.setEnabled(true);
    }

    // =====================================================
    // ENABLE / DISABLE
    // =====================================================

    setEnabled(enabled) {

        this.enabled = enabled;

        if (enabled) {

            this.setColor(this.baseColor);

            this.setAlpha(1);

            this.setInteractive({
                useHandCursor: true
            });
        }
        else {

            this.setColor(this.disabledColor);

            this.setAlpha(0.7);

            this.disableInteractive();

            // reset visual
            this.scene.tweens.killTweensOf(this);

            this.setScale(1);
        }

        return this;
    }
}