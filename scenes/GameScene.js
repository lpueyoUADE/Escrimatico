import BaseScene from './BaseScene.js';
import GameDatabase from '../data/GameDatabase.js';
import SaveManager from '../managers/SaveManager.js';
import { Word } from '../components/Word.js';

export default class GameScene extends BaseScene {
    constructor() {
        super('GameScene');
    }
    init(data) {
        this.region =
            data.region;

        this.level =
            data.level;
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

        this.cameras.main.fadeIn(500, 0, 0, 0);

        const centerX = this.cameras.main.centerX;
        const startY = this.cameras.main.centerY;
        const { width, height } = this.cameras.main;

        this.vidas = 3;
        this.score = 0;
        this.isGameOver = false;

        this.timeRemaining = 60;
        this.wordSpeed = 0.5;
        this.wordSpeedIncrement = 0.35;
        this.wordSpawnTime = 3000;
        this.minWordSpawnTime = 1000;
        this.wordSpawnTimeDecrement = 450;

        this.words = GameDatabase.regions[this.region].levels[this.level].words;

        // Musica
        this.playMusicWithFadeIn('bgMusic2');

        // HUD
        this.add.rectangle(
            15,
            15,
            250,
            120,
            0x000000,
            0.5
        )
            .setOrigin(0)
            .setStrokeStyle(2, 0xffffff, 0.2);


        this.vidasText = this.add.text(
            45,
            55,
            'Vidas: 3',
            {
                fontSize: '32px',
                fontFamily: 'LuckiestGuy',
                color: '#ff5555'
            }
        );

        this.scoreText = this.add.text(
            45,
            95,
            'Puntos: 0 / ' + SaveManager.scoreToNextLevel,
            {
                fontSize: '32px',
                fontFamily: 'LuckiestGuy',
                color: '#55ff55'
            }
        );

        this.timerText = this.add.text(
            75,
            150,
            '01:00',
            {
                fontFamily: 'LuckiestGuy',
                fontSize: '42px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 7
            }
        ).setOrigin(0);

        this.timerText.setText(
            '01:00'
        );

        this.add.image(
            width / 2,
            height / 2,
            'background'
        )
            .setDisplaySize(width, height)
            .setDepth(-100);

        this.columnWidth = 800;

        this.columnX =
            width / 2 - this.columnWidth / 2;

        // Fondo de la columna
        this.add.rectangle(
            width / 2,
            height / 2,
            this.columnWidth,
            height,
            0x000000,
            0.35
        )
            .setStrokeStyle(4, 0xffffff, 0.25)
            .setDepth(-50);

        this.add.line(
            this.columnX,
            0,
            0,
            0,
            0,
            height,
            0xffffff,
            0.3
        )
            .setOrigin(0)
            .setLineWidth(3);

        this.add.line(
            this.columnX + this.columnWidth,
            0,
            0,
            0,
            0,
            height,
            0xffffff,
            0.3
        )
            .setOrigin(0)
            .setLineWidth(3);

        this.palabras = [];

        this.inputText = '';
        this.currentTarget = null;

        this.add.rectangle(
            width / 2,
            height - 50,
            this.columnWidth,
            60,
            0x000000,
            0.6
        )
            .setStrokeStyle(2, 0xffff00, 0.5)
            .setDepth(100);

        this.inputDisplay = this.add.text(
            width / 2,
            height - 50,
            '',
            {
                fontSize: '32px',
                fontFamily: 'LuckiestGuy',
                color: '#ffff00',
                stroke: '#000000',
                strokeThickness: 3
            }
        )
            .setOrigin(0.5)
            .setDepth(101);

        this.add.text(25, 25, 'ESC: Volver al menú', {
            fontFamily: 'LuckiestGuy',
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0);

        this.input.keyboard.on('keydown-ESC', () => {
            this.input.keyboard.removeAllListeners(); // limpieza
            this.goToScene('MainMenuScene');
        });

        this.spawnEvent = this.time.addEvent({
            delay: this.wordSpawnTime,
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
            color: '#ff0000',
            stroke: '#dc0000',
            strokeThickness: 1
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

        // Yae
        this.addYae(
            'yae1',
            width - 50,
            height - 65,
            0.3,
            [1, 1],
            '¡Ojo con las tildes!'
        );

        this.timerEvent = this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {

                if (this.isGameOver) {
                    return;
                }

                this.timeRemaining--;

                const minutes = Math.floor(
                    this.timeRemaining / 60
                );

                const seconds =
                    this.timeRemaining % 60;

                this.timerText.setText(
                    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
                );

                if (this.timeRemaining <= 0) {

                    this.timerEvent.remove();

                    this.gameOver();
                }
            }
        });

        this.difficultyEvent = this.time.addEvent({
            delay: 10000,
            loop: true,
            callback: () => {

                this.wordSpeed += this.wordSpeedIncrement;

                this.wordSpawnTime = Math.max(
                    this.minWordSpawnTime,
                    this.wordSpawnTime - this.wordSpawnTimeDecrement
                );

                this.spawnEvent.remove();

                this.spawnEvent = this.time.addEvent({
                    delay: this.wordSpawnTime,
                    loop: true,
                    callback: this.spawnPalabra,
                    callbackScope: this
                });

                console.log(
                    "Velocidad:", this.wordSpeed,
                    "Spawn:", this.wordSpawnTime
                );
            }
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
        const padding = 40;

        const x = Phaser.Math.Between(
            this.columnX + padding,
            this.columnX + this.columnWidth - padding
        );

        const palabra = new Word(this, texto, x, 0, this.wordSpeed);

        this.palabras.push(palabra);
    }

    handleInput(event) {

        if (event.key.length === 1) {

            this.inputText += event.key.toLowerCase();
        }

        if (event.key === 'Backspace') {

            this.inputText =
                this.inputText.slice(0, -1);
        }

        if (event.key === 'Enter') {

            this.tryCompleteWord();
            return;
        }

        this.inputDisplay.setText(this.inputText);

        this.updateTarget();

        this.updateVisuals();
    }
    updateTarget() {

        // =========================
        // YA HAY TARGET
        // =========================

        if (this.currentTarget) {

            // liberar si borró todo
            if (this.inputText.length === 0) {

                this.currentTarget.setSelected(false);

                this.currentTarget = null;
            }

            return;
        }

        // =========================
        // BUSCAR NUEVO TARGET
        // =========================

        for (let palabra of this.palabras) {

            if (
                palabra.texto.startsWith(
                    this.inputText
                )
            ) {

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

        if (!this.currentTarget) {

            this.hasError = false;
            return;
        }

        const hasMismatch =
            !this.currentTarget.texto.startsWith(
                this.inputText
            );

        // Nuevo error
        if (hasMismatch && !this.hasError) {

            this.hasError = true;

            this.perderVida();

            this.cameras.main.shake(80, 0.002);
        }

        // Volvió a ser válido
        else if (!hasMismatch) {

            this.hasError = false;
        }
    }

    tryCompleteWord() {

        if (!this.currentTarget) {

            this.cameras.main.shake(80, 0.003);
            this.sound.play('error', {
                volume: 1
            });
            return;
        }

        // =========================
        // CORRECTO
        // =========================

        if (
            this.inputText ===
            this.currentTarget.texto
        ) {

            const x =
                this.currentTarget.container.x;

            const y =
                this.currentTarget.container.y;

            this.createExplosion(
                x,
                y,
                "0xaaffaa"
            );

            this.sound.play('correct', {
                volume: 1
            })

            this.currentTarget.destroy();

            const index =
                this.palabras.indexOf(
                    this.currentTarget
                );

            if (index !== -1) {

                this.palabras.splice(index, 1);
            }

            this.score++;

            this.scoreText.setText(
                'Puntos: ' + this.score + ' / ' + SaveManager.scoreToNextLevel
            );
        }

        // =========================
        // INCORRECTO
        // =========================

        else {

            this.perderVida();

            this.cameras.main.shake(
                120,
                0.004
            );
        }

        // =========================
        // RESET
        // =========================

        this.inputText = '';

        this.inputDisplay.setText('');

        if (this.currentTarget) {

            this.currentTarget.setSelected(false);
        }

        this.currentTarget = null;

        this.updateVisuals();
    }

    gameOver() {
        if (this.isGameOver) return;

        this.isGameOver = true;

        const unlockedLevel =
            SaveManager.completeLevel(
                this.region,
                this.level,
                this.score
            );

        if (this.timerEvent) {
            this.timerEvent.remove();
        }

        if (this.difficultyEvent) {
            this.difficultyEvent.remove();
        }

        this.input.keyboard.removeAllListeners();

        const { width, height } = this.cameras.main;

        const overlay = this.add.rectangle(0, 0, width, height, 0x000000)
            .setOrigin(0)
            .setAlpha(1)
            .setDepth(500);

        const gameOverText = this.add.text(width / 2, height / 2 - 20,
            '¡Excelente!\n' +
            'Sumaste:\n\n' +
            '¡ ' + this.score + ' punto' + (this.score == 1 ? '' : 's') + ' !',
            {
                fontSize: '40px',
                align: 'center',
                color: '#ffffff'
            }).setOrigin(0.5).setDepth(501);

        const subText = this.add.text(width / 2, height / 2 + 125, 'A ver cuantos haces la próxima...', {
            fontSize: '20px',
            color: '#cccccc',
            align: 'center'
        }).setOrigin(0.5).setDepth(501);

        // ⏱ Delay real
        this.time.delayedCall(4000, () => {
            this.goToScene('HighScoreScene');
        });
    }
}