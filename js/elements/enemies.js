class Enemy {
    constructor (ctx, w, h, damage = 2) {
        this.ctx = ctx
        this.x = null
        this.y = null
        this.w = w
        this.h = h
        this.damage = damage
        this.position = [{x: this.x, y: this.y}] // We need it for check the collisions

        this.skin = new Image ()
        this.skin.src = "imgs/enemy.png"
    }

    draw () {
        this.ctx.drawImage(this.skin, this.x, this.y, this.w, this.h)
    }

    randomPosition (xyBodyArray, xApple, yApple, xHeart = null, yHeart = null) {

        let randomX = Math.floor(Math.random() * (GAME_W - CELL_SIZE))
        let randomY = Math.floor(Math.random() * (GAME_H - CELL_SIZE))

        while ((xyBodyArray.some((xy) => xy[0] === randomX && xy[1] === randomY)) || (randomX % CELL_SIZE !== 0 || randomY % CELL_SIZE !== 0) || (randomX === xApple || randomY === yApple) || (randomX === xHeart || randomY === yHeart)) {
            randomX = Math.floor(Math.random() * (GAME_W - CELL_SIZE))
            randomY = Math.floor(Math.random() * (GAME_H - CELL_SIZE))
        }

        this.x = randomX
        this.y = randomY
        this.position = [{x: this.x, y: this.y}]
    }

    // Function to remove part of the snake's body when it collides with an apple, based on the enemy's damage.
    deleteBody (body) {
        return body.filter((part, index) => index < body.length - this.damage)
    }
}