class CollusionsBlock {
    constructor({
        position = {
            x: 0,
            y: 0,
        },
        width = 16,
        height = 16,
        color = 'rgba(255, 0, 0, 0.4)'
    }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
    }
};