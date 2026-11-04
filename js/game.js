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
        this.snake.firstBody()
        this.intervalId = setInterval(() => {
        this.clear()
        this.move()
        this.draw()
        this.endGame()
        }, 1000 / 5)

    }

    draw () {
        this.snake.draw()
        this.snake.body.forEach((part) => {
            part.draw()
        })
    }

    move () { // El move guarda primero la posición original de la serpiente y su cuerpo y luego mueve al resto del cuerpo en base a los valores anteriores
        let snakeXPosition = this.snake.x
        let snakeYPosition = this.snake.y
        let bodyXPositions = this.snake.body.map((part) => part.x) // POR AQUÍ, estoy intentando guardar las x e y iniciales para luego ponerlas 
        let bodyYPositions = this.snake.body.map((part) => part.y)
        this.snake.move()
        this.snake.body.forEach((part, index) => {
            if (index === 0) {
                part.move(snakeXPosition, snakeYPosition)
            } else {
                part.move(bodyXPositions[index -1], bodyYPositions[index -1])
            }
        })
    }

    clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    // El juego termina cuando la serpiente se choca con la pared o cuando su array es cero (me falta añadir cuando se come a si misma o )
    endGame () {
        if (this.snake.x <= 0 || this.snake.x >= GAME_W - SNAKE_W || this.snake.y <= 0 || this.snake.y >= GAME_H - SNAKE_H) { // Cuando se choca con una pared
            clearInterval(this.intervalId)
        }

        /* ACTIVAR MÁS ADELANTE CUANDO TENGA EL BODY CONFIGURADO, SI NO NO VA EL JUEGO
        if (this.snake.body.length === 0) { // Cuando se queda sin elementos en el array body
            clearInterval(this.intervalId)
        } */
    }
}