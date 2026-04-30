export class Palabra {
    constructor(scene, texto, x, y, textureKey) {
        this.scene = scene;
        this.texto = texto;
        this.isSelected = false;

        this.speed = 1;

        // 🔲 Fondo tipo polaroid
        const fondo = scene.add.rectangle(0, 0, 120, 125, 0xffffff)
            .setStrokeStyle(2, 0x000000);

        // 🖼 Imagen (arriba)
        const imagen = scene.add.image(0, -10, textureKey)
            .setDisplaySize(100, 80);

        // 🔤 Texto (abajo)
        this.textObj = scene.add.rexBBCodeText(0, 45, texto, {
            fontSize: '18px',
            color: '#000000',
            align: 'center',
            wordWrap: { width: 100 }
        }).setOrigin(0.5);

        // 📦 Contenedor
        this.container = scene.add.container(x, y, [
            fondo,
            imagen,
            this.textObj
        ]);
    }

    update() {
        this.container.y += this.speed;
        this.container.y = Math.round(this.container.y);
    }

    isOutOfBounds(limitY) {
        return this.container.y > limitY;
    }

    setSelected(value) {
        this.isSelected = value;
    }

    updateVisual(inputText) {
        if (this.isSelected && inputText.length > 0) {
            const correctPart = this.texto.substring(0, inputText.length);
            const restPart = this.texto.substring(inputText.length);

            const formatted = `[color=#00aa00]${correctPart}[/color]${restPart}`;
            this.textObj.setText(formatted);
        } else {
            this.textObj.setText(this.texto);
        }
    }

    destroy() {
        this.container.destroy();
    }
}
