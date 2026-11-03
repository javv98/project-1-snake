class Game {
    constructor () {
        this.canvas = document.getElementById("canvas")
        this.canvas.width = GAME_W
        this.canvas.height = GAME_H
        this.ctx = this.canvas.getContext("2d")

        this.snake = new Snake (this.ctx, SNAKE_X, SNAKE_Y, SNAKE_W, SNAKE_H)

        this.intervalId = null
    }

    start () {

        this.intervalId = setInterval(() => {
        this.snake.draw()
        }, 1000 / 60)

    }
}