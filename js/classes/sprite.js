class Sprite {
    constructor({
        position = {
            x: 0,
            y: 0,
        },
        width = 100,
        height = 100,
        imageSrc = './../../assets/background.png',
        maxFrames = 1,
        holdFrames = 1
    }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = imageSrc;
        this.frames = {
            max: maxFrames,
            current: 0,
            hold: holdFrames,
            elapsed: 0
        }
    }

    draw() {
        if (this.image) {
            context.drawImage(
                this.image,
                0,
                0
            );
        }
    }

    update() {
        this.draw();
    }
};