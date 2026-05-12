export default class MapRegion extends Phaser.GameObjects.Container {
    constructor(scene, x, y, texture, name, onClick) {
        super(scene, x, y);

        // Estado
        this.scene = scene;
        this.name = name;
        this.selected = false;
        this.unlocked = false;

        // Imagen de la región (PNG con transparencia)
        this.image = scene.add.image(0, 0, texture)
            .setOrigin(0.5)
            .setInteractive({ pixelPerfect: true });

        // Glow
        this.glow = this.image.postFX.addGlow(0xffffaa, 4, 0);
        this.glow.outerStrength = 0;

        this.add(this.image);

        // Hover
        this.image.on('pointerover', () => {
            if (!this.unlocked) return;

            this.scene.tweens.killTweensOf(this.glow);

            this.parentContainer.bringToTop(this);

            this.scene.tweens.add({
                targets: this.glow,
                outerStrength: 4,
                duration: 250
            });
        });

        this.image.on('pointerout', () => {
            if (!this.selected) {
                scene.tweens.killTweensOf(this.glow);

                scene.tweens.add({
                    targets: this.glow,
                    outerStrength: 0,
                    duration: 250,
                    ease: 'Sine.easeIn'
                });
            }

            if (this.scene.selectedRegion) {
                this.parentContainer.bringToTop(this.scene.selectedRegion);
            }
        });

        this.image.on('pointerdown', () => {
            if (!this.unlocked) return;

            this.scene.selectRegion(this);
        });

        scene.add.existing(this);
    }

    setSelected(selected) {
        this.selected = selected;
        if (this.selected) {
            this.scene.tweens.add({
                targets: [this, this.glow],
                scale: 1.05,
                outerStrength: 5,
                duration: 150
            });
        } else {
            this.scene.tweens.add({
                targets: [this, this.glow],
                scale: 1,
                outerStrength: 0,
                duration: 150
            });
        }
    }

    setUnlocked(unlocked) {
        this.unlocked = unlocked;

        if (this.unlocked) {
            this.image.clearTint();
            this.image.setAlpha(1);
            this.image.setInteractive({ pixelPerfect: true });
        } else {
            // efecto blanco y negro (simulado)
            this.image.setTint(0x888888);
            this.image.setAlpha(0.6);
            this.image.disableInteractive();
        }
    }
}