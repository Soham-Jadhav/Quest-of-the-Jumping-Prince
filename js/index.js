const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;
const speed = 5;
const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4,
};
let keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
}
let animationId;

let background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './../../assets/background.png',
    maxFrames: 1,
});

let player = new Player({
    position: {
        x: 200,
        y: 100
    },
    width: 100,
    height: 100,
});

function animate() {
    animationId = requestAnimationFrame(animate);

    context.fillStyle = 'rgba(225, 225, 225, 1)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Scale & translate background image 
    context.save()
    context.scale(4, 4);
    context.translate(0, -background.image.height + scaledCanvas.height);
    background.update();
    context.restore();

    player.velocity.x = 0;
    if (keys.a.pressed) {
        player.velocity.x = -speed;
    }
    else if (keys.d.pressed) {
        player.velocity.x = speed;
    }
    else {
        player.velocity.x = 0;
    }

    player.update();
}

animate();