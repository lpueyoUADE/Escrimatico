export function goToScene(scene, nextScene) {
    scene.cameras.main.fadeOut(400);

    scene.time.delayedCall(400, () => {
        scene.scene.start(nextScene);
    });
}