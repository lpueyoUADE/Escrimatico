export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.plugin(
            'rexbbcodetextplugin',
            'https://cdn.jsdelivr.net/npm/phaser3-rex-plugins/dist/rexbbcodetextplugin.min.js',
            true
        );

        // Fonts
        const fredokaFont = new FontFace(
            'Fredoka',
            'url(assets/fonts/Fredoka/Fredoka-VariableFont_wdth,wght.ttf)'
        ).load().then(font => {
            document.fonts.add(font);
        });

        const luckiestGuyFont = new FontFace(
            'LuckiestGuy',
            'url(assets/fonts/Luckiest_Guy/LuckiestGuy-Regular.ttf)'
        ).load().then(font => {
            document.fonts.add(font);
        });

        const googleSansCodeFont = new FontFace(
            'GoogleSansCode',
            'url(assets/fonts/GoogleSansCode/GoogleSansCode-VariableFont_wght.ttf)'
        ).load().then(font => {
            document.fonts.add(font);
        });

        // Palabras
        this.load.image('agua', 'assets/images/stuff/texture2.png');
        this.load.image('bosque', 'assets/images/stuff/texture2.png');
        this.load.image('rio', 'assets/images/stuff/texture2.png');

        // Background
        this.load.image('background', 'assets/images/background/BG.png');
        this.load.image('backgroundNight', 'assets/images/background/BGNight.png');
        this.load.image('backgroundSunset', 'assets/images/background/BGSunset.png');
        this.load.image('mapa', 'assets/images/background/Mapa.png');
        this.load.image('mapa2', 'assets/images/background/Mapa2.png');

        // Mapas
        this.load.image('argentina', 'assets/images/maps/Argentina.png');
        this.load.image('cuyo', 'assets/images/maps/Cuyo.png');
        this.load.image('litoral', 'assets/images/maps/Litoral.png');
        this.load.image('malvinas', 'assets/images/maps/Malvinas.png');
        this.load.image('noroeste', 'assets/images/maps/Noroeste.png');
        this.load.image('pampa', 'assets/images/maps/Pampa.png');
        this.load.image('patagonia', 'assets/images/maps/Patagonia.png');

        // Main Menu
        this.load.image('title', 'assets/images/mainmenu/title.png');
        this.load.image('water', 'https://labs.phaser.io/assets/particles/blue.png');
        this.load.image('firefly', 'https://labs.phaser.io/assets/particles/yellow.png');
        this.load.image('explosion', 'https://labs.phaser.io/assets/particles/red.png');

        // Level Select
        this.load.image('noroeste_flora', 'assets/images/regions/noroeste/noroeste_flora.jpg');
        this.load.image('noroeste_fauna', 'assets/images/regions/noroeste/noroeste_fauna.jpg');
        this.load.image('noroeste_folclore', 'assets/images/regions/noroeste/noroeste_folclore.jpg');

        // Yae
        this.load.image('yae1', 'assets/images/Yae/YaeFullBody.png');
        this.load.image('yaeLogo', 'assets/images/Yae/YaeLogo.png');
        this.load.image('yaePointing', 'assets/images/Yae/YaePointing.png');

        // Dialogo
        this.load.image('dialogoIzq', 'assets/images/dialog/dialogoIzq.png');
        this.load.image('dialogoDer', 'assets/images/dialog/dialogoDer.png');

        // Boton
        this.load.image('button', 'assets/images/button/button.png');
    }

    create() {
        this.input.setDefaultCursor('url(assets/images/cursor/cursor2.png) 16 16, pointer');
        this.scene.start('MainMenuScene');
    }
}