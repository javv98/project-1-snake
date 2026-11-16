class Apple {
    constructor (ctx, w, h) {
        this.ctx = ctx
        this.x = null
        this.y = null
        this.w = w
        this.h = h

        this.position = [{x: this.x, y: this.y}] // We need it for check the collisions

        this.skin = new Image ()
        this.skin.src = "imgs/apple.png"

    }

    draw () {
        this.ctx.drawImage(this.skin, this.x, this.y, this.w, this.h)
    }

    randomPosition (xyArray, xEnemy = null, yEnemy = null, xHeart = null, yHeart = null) {

        let randomX = Math.floor(Math.random() * (GAME_W - CELL_SIZE))
        let randomY = Math.floor(Math.random() * (GAME_H - CELL_SIZE))

        while ((xyArray.some((xy) => xy[0] === randomX && xy[1] === randomY)) || (randomX % CELL_SIZE !== 0 || randomY % CELL_SIZE !== 0) || (randomX === xEnemy || randomY === yEnemy) || (randomX === xHeart || randomY === yHeart)) {
            randomX = Math.floor(Math.random() * (GAME_W - CELL_SIZE))
            randomY = Math.floor(Math.random() * (GAME_H - CELL_SIZE))
        }

        this.x = randomX
        this.y = randomY
        this.position = [{x: this.x, y: this.y}]
    }

    // Method to make the snake's body grow and the apple disappear when the snake eats it.
    getBigger (ctx, positions, body) {
        let newPosition = null
        let newDirection = null
        let color = null

        let sumX = 0
        let sumY = 0
        positions.forEach((position, index) => {
            if (index === positions.length - 1) {
                newPosition = position
            }
        }) 

        body.forEach((part, index, arr) => {
            if (index === arr.length - 1) {
                if (part.direction === "up") {
                    sumX = 0
                    sumY = CELL_SIZE
                } else if (part.direction === "down") {
                    sumX = 0
                    sumY = -CELL_SIZE
                } else if (part.direction === "right") {
                    sumX = -CELL_SIZE
                    sumY = 0
                } else if (part.direction === "left") {
                    sumX = CELL_SIZE
                    sumY = 0
                }
                newDirection = part.direction
                color = part.color
            }
        })

        return new Body (ctx, newPosition[0] + sumX, newPosition[1] + sumY, SNAKE_W, SNAKE_H, true, newDirection, color)
    }

}