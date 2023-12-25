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
        holdFrames = 1,
        scale = 1,
    }) {
        this.loaded = false;
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.image.onload = () => {
            this.width = (this.image.width / maxFrames) * this.scale;
            this.height = this.image.height * this.scale;
            this.loaded = true;
        }
        this.frames = {
            max: maxFrames,
            current: 0,
            hold: holdFrames,
            elapsed: 0,
        }
        this.scale = scale;
    }

    draw() {
        if (this.image) {
            const cropBox = {
                position: {
                    x: (this.image.width / this.frames.max) * this.frames.current,
                    y: 0,
                },
                width: this.image.width / this.frames.max,
                height: this.image.height,
            };

            context.drawImage(
                this.image,
                cropBox.position.x,
                cropBox.position.y,
                cropBox.width,
                cropBox.height,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            );
        }
    }

    update() {
        this.draw();
        this.updateFrames();
    }

    updateFrames() {
        if (this.frames.elapsed % this.frames.hold === 0) {
            if (this.frames.current + 1 < this.frames.max) {
                this.frames.current++;
            }
            else {
                this.frames.current = 0;
            }

            this.frames.elapsed = 1;
        }

        this.frames.elapsed++;
    }
};