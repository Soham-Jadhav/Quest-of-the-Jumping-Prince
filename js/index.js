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
let floorCollusionBlocks = [];
let platformCollusionBlocks = [];
let animationId;

let floorCollusions2D = [];
for (let i = 0; i < floorCollusions.length; i += 36) {
    floorCollusions2D.push(floorCollusions.slice(i, i + 36));
}

floorCollusions2D.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
        if (column === 202) {
            floorCollusionBlocks.push(new CollusionsBlock({
                position: {
                    x: columnIndex * 16,
                    y: rowIndex * 16,
                }
            }));
        }
    });
});

let platformCollusions2D = [];
for (let i = 0; i < platformCollisions.length; i += 36) {
    platformCollusions2D.push(platformCollisions.slice(i, i + 36));
}

platformCollusions2D.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
        if (column === 202) {
            platformCollusionBlocks.push(new CollusionsBlock({
                position: {
                    x: columnIndex * 16,
                    y: rowIndex * 16,
                }
            }));
        }
    });
});

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
        x: 50,
        y: 300
    },
    width: 25,
    height: 25,
    floorCollusionBlocks: floorCollusionBlocks,
    platformCollusionBlocks: platformCollusionBlocks,
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

    floorCollusionBlocks.forEach(floorCollusionBlock => {
        floorCollusionBlock.update();
    });
    platformCollusionBlocks.forEach(platformCollusionBlock => {
        platformCollusionBlock.update();
    });

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
    context.restore();
}

animate();