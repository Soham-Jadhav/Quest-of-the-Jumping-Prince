class Player extends Sprite {
    constructor({
        position = {
            x: 0,
            y: 0
        },
        width = 100,
        height = 100,
        color = 'rgba(225, 0, 0, 1)',
        floorCollusionBlocks,
        platformCollusionBlocks,
        imageSrc = './assets/warrior/Idle.png',
        maxFrames = 8,
        holdFrames = 5,
        scale = 0.6,
        animations,
    }) {
        super({
            position: position,
            imageSrc: imageSrc,
            maxFrames: maxFrames,
            holdFrames: holdFrames,
            scale: scale,
        });
        // this.position = position;
        // this.width = width;
        // this.height = height;
        this.color = color;
        this.lastDirection = 'right';
        this.velocity = {
            x: 0,
            y: 2
        },
            this.floorCollusionBlocks = floorCollusionBlocks;
        this.platformCollusionBlocks = platformCollusionBlocks;
        this.hitbox = {
            position: {
                x: this.position.x + 44,
                y: this.position.y + 32,
            },
            width: 10,
            height: 10,
        };
        this.animations = animations;

        for (let key in this.animations) {
            const image = new Image();
            image.src = this.animations[key].imageSrc;
            this.animations[key].image = image;
        }
    }

    // draw() {
    //     context.fillStyle = this.color;
    //     context.fillRect(this.position.x, this.position.y, this.width, this.height);
    // }

    update() {
        this.updateFrames();

        // // Draw Image
        // context.fillStyle = 'rgba(0, 0, 255, 0.2)';
        // context.fillRect(this.position.x, this.position.y, this.width, this.height);

        // // Draw hitbox
        // context.fillStyle = 'rgba(0, 255, 0, 0.2)';
        // context.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);

        this.draw();

        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkHorizontalCollusions();

        this.applyGravity();
        // this.position.y += this.velocity.y;
        // if (this.position.y + this.height + this.velocity.y < canvas.height) {
        //     this.velocity.y += gravity;
        // }
        // else {
        //     this.velocity.y = 0;
        // }

        this.updateHitbox();
        this.checkVerticalCollusions();
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 44,
                y: this.position.y + 32,
            },
            width: 14,
            height: 31,
        };
    }

    applyGravity() {
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;
    }

    checkHorizontalCollusions() {
        for (let i = 0; i < this.floorCollusionBlocks.length; i++) {
            const floorCollusionBlock = this.floorCollusionBlocks[i];

            if (
                collusion({
                    object1: this.hitbox,
                    object2: floorCollusionBlock,
                })
            ) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
                    this.position.x = floorCollusionBlock.position.x - offset - 0.05;
                    break;
                }

                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                    const offset = this.hitbox.position.x - this.position.x;
                    this.position.x = floorCollusionBlock.position.x + floorCollusionBlock.width - offset + 0.05;
                    break
                }
            }
        }
    }

    checkVerticalCollusions() {
        for (let i = 0; i < this.floorCollusionBlocks.length; i++) {
            const floorCollusionBlock = this.floorCollusionBlocks[i];

            if (
                collusion({
                    object1: this.hitbox,
                    object2: floorCollusionBlock,
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = floorCollusionBlock.position.y - offset - 0.05;
                    break;
                }

                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y;
                    this.position.y = floorCollusionBlock.position.y + floorCollusionBlock.height - offset + 0.05;
                    break
                }
            }
        }
    }

    switchSprite(key) {
        if (this.image !== this.animations[key].image && this.loaded) {
            this.image = this.animations[key].image;
            this.frames.current = 0;
            this.frames.elapsed = 1;
            this.frames.max = this.animations[key].maxFrames;
            this.frames.hold = this.animations[key].holdFrames;
        }
    }
};