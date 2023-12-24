class Player {
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
    }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocity = {
            x: 0,
            y: 2
        },
            this.floorCollusionBlocks = floorCollusionBlocks;
        this.platformCollusionBlocks = platformCollusionBlocks;
    }

    draw() {
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();

        this.position.x += this.velocity.x;

        this.checkHorizontalCollusions();

        this.applyGravity();
        // this.position.y += this.velocity.y;
        // if (this.position.y + this.height + this.velocity.y < canvas.height) {
        //     this.velocity.y += gravity;
        // }
        // else {
        //     this.velocity.y = 0;
        // }

        this.checkVerticalCollusions();
    }

    applyGravity() {
        this.position.y += this.velocity.y;
        this.velocity.y += gravity;
    }

    checkHorizontalCollusions() {
        for (let i = 0; i < this.floorCollusionBlocks.length; i++) {
            const floorCollusionBlock = this.floorCollusionBlocks[i];

            if (
                collusion({
                    object1: this,
                    object2: floorCollusionBlock,
                })
            ) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                    this.position.x = floorCollusionBlock.position.x - this.width - 0.05;
                    break;
                }

                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                    this.position.x = floorCollusionBlock.position.x + floorCollusionBlock.width + 0.05;
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
                    object1: this,
                    object2: floorCollusionBlock,
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.position.y = floorCollusionBlock.position.y - this.height - 0.05;
                    break;
                }

                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    this.position.y = floorCollusionBlock.position.y + floorCollusionBlock.height + 0.05;
                    break
                }
            }
        }
    }
};