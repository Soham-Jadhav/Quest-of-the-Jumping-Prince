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

        this.cameraBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 200,
            height: 80,
        };
    }

    update() {
        this.updateFrames();
        this.updateCamerabox();
        this.draw();

        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkHorizontalCollusions();
        this.applyGravity();
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

    updateCamerabox() {
        this.cameraBox = {
            position: {
                x: this.position.x - 50,
                y: this.position.y,
            },
            width: 200,
            height: 80,
        };
    }

    shouldPanCameraLeft({ scaledCanvas, camera }) {
        const cameraBoxRight = this.cameraBox.position.x + this.cameraBox.width;

        if (cameraBoxRight + this.velocity.x < 576) {
            if (cameraBoxRight >= scaledCanvas.width + Math.abs(camera.position.x)) {
                camera.position.x -= this.velocity.x;
            }
        }
    }

    shouldPanCameraRight({ scaledCanvas, camera }) {
        const cameraBoxLeft = this.cameraBox.position.x;

        if (cameraBoxLeft + this.velocity.x > 0) {
            if (cameraBoxLeft <= Math.abs(camera.position.x)) {
                camera.position.x -= this.velocity.x;
            }
        }
    }

    shouldPanCameraDown({ scaledCanvas, camera }) {
        const cameraBoxTop = this.cameraBox.position.y;

        if (cameraBoxTop + this.velocity.y > 0) {
            if (cameraBoxTop <= Math.abs(camera.position.y)) {
                camera.position.y -= this.velocity.y;
            }
        }
    }

    shouldPanCameraUp({ scaledCanvas, camera }) {
        const cameraBoxBottom = this.cameraBox.position.y + this.cameraBox.height;

        if (cameraBoxBottom + this.velocity.y < 432) {
            if (cameraBoxBottom >= scaledCanvas.height + Math.abs(camera.position.y)) {
                camera.position.y -= this.velocity.y;
            }
        }
    }

    checkHorizontalCanvasCollusions() {
        if (
            this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 576 ||
            this.hitbox.position.x + this.velocity.x <= 0
        ) {
            this.velocity.x = 0;
        }
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

        // Platform collusions
        for (let i = 0; i < this.platformCollusionBlocks.length; i++) {
            const platformCollusionBlock = this.platformCollusionBlocks[i];

            if (
                platformCollusion({
                    object1: this.hitbox,
                    object2: platformCollusionBlock,
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = platformCollusionBlock.position.y - offset - 0.05;
                    break;
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