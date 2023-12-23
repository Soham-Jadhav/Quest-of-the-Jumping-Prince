addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = true;
            if (player.velocity.y === 0) {
                player.velocity.y = -15;
            }

            break;

        case 'a':
            keys.a.pressed = true;

            break;

        case 's':
            keys.s.pressed = true;

            break;

        case 'd':
            keys.d.pressed = true;

            break;

        default:
            break;
    }
});

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = false;

            break;

        case 'a':
            keys.a.pressed = false;

            break;

        case 's':
            keys.s.pressed = false;

            break;

        case 'd':
            keys.d.pressed = false;

            break;

        default:
            break;
    }
});