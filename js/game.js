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
        this.clear()
        this.move()
        this.draw()
        this.endGame()
        }, 1000 / 10)

    }

    draw () {
    this.snake.draw()
    }

    move () {
    this.snake.move()
    }

    clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    // El juego termina cuando la serpiente se choca con la pared o cuando su array es cero (me falta añadir cuando se come a si misma o )
    endGame () {
        if (this.snake.x <= 0 || this.snake.x >= GAME_W + SNAKE_W || this.snake.y <= 0 || this.snake.y >= GAME_H - SNAKE_H) { // Cuando se choca con una pared
            clearInterval(this.intervalId)
        }

        /* ACTIVAR MÁS ADELANTE CUANDO TENGA EL BODY CONFIGURADO, SI NO NO VA EL JUEGO
        if (this.snake.body.length === 0) { // Cuando se queda sin elementos en el array body
            clearInterval(this.intervalId)
        } */
    }
}