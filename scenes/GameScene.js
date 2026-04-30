import BaseScene from './BaseScene.js';
import { Palabra } from '../components/Word.js';

export default class GameScene extends BaseScene{
    constructor() {
        super('GameScene');
    }

    createExplosion(x, y, color) {
        const lifespan = 500;
        const particles = this.add.particles(0, 0, 'explosion', {
            x: x,
            y: y,

            speed: { min: 200, max: 300 },
            angle: { min: 0, max: 360 },

            scale: { start: 0.2, end: 0 },

            alpha: { start: 0.7, end: 0 },

            lifespan: lifespan,

            tint: 0xaaffaa,
            blendMode: 'ADD',

            quantity: 20,
            frequency: 200
        });

        this.time.delayedCall(lifespan, () => {
            particles.destroy();
        });
    }

    create() {
        super.create();

        const centerX = this.cameras.main.centerX;
        const startY = this.cameras.main.centerY;
        const { width, height } = this.cameras.main;

        this.vidas = 3;
        this.score = 0;
        this.isGameOver = false;

        this.vidasText = this.add.text(10, 40, 'Vidas: 3', {
            fontSize: '20px',
            color: '#ff0000'
        });

        this.scoreText = this.add.text(10, 70, 'Puntos: 0', {
            fontSize: '20px',
            color: '#00ff00'
        });

        this.words = ["agua", "bosque", "rio"];
        this.palabras = [];

        this.inputText = '';
        this.currentTarget = null;

        this.inputDisplay = this.add.text(centerX, 700, '', {
            fontSize: '28px',
            color: '#ffff00'
        }).setOrigin(0.5);

        this.add.text(10, 10, 'ESC: Volver al menú', {
            fontSize: '16px',
            color: '#ffffff'
        }).setOrigin(0);

        this.input.keyboard.on('keydown-ESC', () => {
            this.input.keyboard.removeAllListeners(); // limpieza
            this.scene.start('MainMenuScene');
        });

        this.time.addEvent({
            delay: 2000,
            loop: true,
            callback: this.spawnPalabra,
            callbackScope: this
        });

        this.input.keyboard.on('keydown', (event) => {
            this.handleInput(event);
        });

        // 🔴 Definir límite lógico
        this.limiteY = height - 100;

        // 🟥 Zona de peligro (guardar referencia)
        this.zonaPeligro = this.add.rectangle(
            0,
            this.limiteY,
            width,
            height - this.limiteY,
            0xff0000
        )
            .setOrigin(0)
            .setAlpha(0.2)
            .setDepth(0);

        // 🟥 Línea superior
        this.add.line(0, 0, 0, this.limiteY, width, this.limiteY, 0xff0000)
            .setOrigin(0)
            .setLineWidth(3)
            .setAlpha(0.8)
            .setDepth(1);

        // 🟥 Texto
        this.add.text(width - 10, this.limiteY - 5, 'PELIGRO', {
            fontSize: '14px',
            color: '#ff0000'
        })
            .setOrigin(1, 1)
            .setDepth(1);

        // 🔥 MEJORA PRO → animación
        this.tweens.add({
            targets: this.zonaPeligro,
            alpha: { from: 0.15, to: 0.3 },
            duration: 800,
            yoyo: true,
            repeat: -1
        });
    }

    update() {
        const bottomLimit = this.limiteY;

        for (let i = this.palabras.length - 1; i >= 0; i--) {
            const palabra = this.palabras[i];

            palabra.update();

            if (palabra.isOutOfBounds(bottomLimit)) {
                const x = palabra.container.x;
                const y = palabra.container.y;
                this.createExplosion(x, y, "0xffaaaa");
                palabra.destroy();
                this.palabras.splice(i, 1);

                this.perderVida();
            }
        }
    }

    spawnPalabra() {
        const texto = Phaser.Utils.Array.GetRandom(this.words);
        const x = Phaser.Math.Between(100, 700);

        const palabra = new Palabra(this, texto, x, 0, texto);

        this.palabras.push(palabra);
    }

    handleInput(event) {
        if (event.key.length === 1) {
            this.inputText += event.key.toLowerCase();
        }

        if (event.key === 'Backspace') {
            this.inputText = this.inputText.slice(0, -1);
        }

        // 🟢 ENTER → intentar completar
        if (event.key === 'Enter') {
            this.tryCompleteWord();
            return;
        }

        this.inputDisplay.setText(this.inputText);

        this.updateTarget();
        this.updateVisuals();
        this.checkError();
    }

    updateTarget() {
        // Mantener target si sigue siendo válido
        if (
            this.currentTarget &&
            this.currentTarget.texto.startsWith(this.inputText)
        ) {
            return;
        }

        // Reset selección
        this.currentTarget = null;
        this.palabras.forEach(p => p.setSelected(false));

        // Buscar nuevo target
        for (let palabra of this.palabras) {
            if (palabra.texto.startsWith(this.inputText)) {
                this.currentTarget = palabra;
                palabra.setSelected(true);
                break;
            }
        }
    }

    updateVisuals() {
        this.palabras.forEach(p => {
            p.updateVisual(this.inputText);
        });
    }

    perderVida() {
        if (this.isGameOver) return;

        this.vidas--;

        this.vidasText.setText('Vidas: ' + this.vidas);

        // this.cameras.main.flash(200, 60, 0, 0);

        if (this.vidas <= 0) {
            this.gameOver();
        }
    }

    checkError() {
        if (this.inputText.length === 0) return;

        // 🟢 Si no hay target activo → NO castigar
        if (!this.currentTarget) {
            return;
        }

        // 🔴 Si hay target pero ya no coincide → error
        if (!this.currentTarget.texto.startsWith(this.inputText)) {
            this.perderVida();

            this.inputText = '';
            this.inputDisplay.setText('');

            this.currentTarget = null;
            this.palabras.forEach(p => p.setSelected(false));
        }
    }

    tryCompleteWord() {
        if (!this.currentTarget) {
            this.cameras.main.shake(80, 0.003);
            return;
        }

        if (this.inputText === this.currentTarget.texto) {
            // ✔ Correcto
            const x = this.currentTarget.container.x;
            const y = this.currentTarget.container.y;
            this.createExplosion(x, y, "0xaaffaa");
            this.currentTarget.destroy();

            const index = this.palabras.indexOf(this.currentTarget);
            if (index !== -1) {
                this.palabras.splice(index, 1);
            }

            this.score++;
            this.scoreText.setText('Puntos: ' + this.score);

            // this.cameras.main.flash(100, 0, 60, 0);
        } else {
            // ❌ Incorrecto
            this.perderVida();
        }

        // Reset
        this.inputText = '';
        this.inputDisplay.setText('');
        this.currentTarget = null;
        this.palabras.forEach(p => p.setSelected(false));
    }

    gameOver() {
        if (this.isGameOver) return;

        this.isGameOver = true;

        this.input.keyboard.removeAllListeners();

        const { width, height } = this.cameras.main;

        const overlay = this.add.rectangle(0, 0, width, height, 0x000000)
            .setOrigin(0)
            .setAlpha(1)
            .setDepth(100);

        const gameOverText = this.add.text(width / 2, height / 2 - 20, 
            '¡Excelente!\n'+
            'Sumaste:\n\n'+
            '¡ ' + this.score + ' punto' + (this.score == 1? '' : 's') + ' !', 
            {
            fontSize: '40px',
            align: 'center',
            color: '#ffffff'
        }).setOrigin(0.5).setDepth(101);

        const subText = this.add.text(width / 2, height / 2 + 125, 'A ver cuantos haces la próxima...', {
            fontSize: '20px',
            color: '#cccccc',
            align: 'center'
        }).setOrigin(0.5).setDepth(101);

        // ⏱ Delay real
        this.time.delayedCall(4000, () => {
            this.scene.start('HighScoreScene', { score: this.score });
        });
    }
}