class Player {
    constructor({
        position = {
            x: 0,
            y: 0
        },
        width = 100,
        height = 100,
        color = 'rgba(225, 0, 0, 1)'
    }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocity = {
            x: 0,
            y: 2
        }
    }

    draw() {
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();

        this.position.x += this.velocity.x;

        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y < canvas.height) {
            this.velocity.y += gravity;
        }
        else {
            this.velocity.y = 0;
        }
    }
};