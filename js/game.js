class Game {
    constructor () {
        this.canvas = document.getElementById("canvas")
        this.canvas.width = GAME_W
        this.canvas.height = GAME_H
        this.ctx = this.canvas.getContext("2d")

        this.snake = []
        this.snakeLastX = 0 // variable para almacenar la x de la última celda añadida 

        this.intervalId = null
    }

    firstSnake () { // Función que se ejecuta al principio para llenar el array inicial de serpiente con las celdas establecidas
        for (let i = 0; i < SNAKE_CELLS; i++) { // Hacemos un bucle para insertar las celdas
            if (i === 0) {
                this.snake.push(new Snake (this.ctx, SNAKE_X, SNAKE_Y, SNAKE_W, SNAKE_H)) // la primera se hace con los valores de las constantes
                this.snakeLastX = this.snake[this.snake.length - 1].x
            } else {
                this.maxSnakeH() // Me llevo a una función el añadir más cuadrados a una snake
            }
        }
    }

    start () {
        this.firstSnake() 
        this.intervalId = setInterval(() => {
        this.clear()
        this.move()
        this.draw()
        this.endGame()
        }, 1000 / 10)

    }

    draw () {
    this.snake.forEach((snake, index) => {
        snake.draw(index)
    })
    }

    move () {
    this.snake.forEach((snake) => {
        snake.move()
    })
    }

    clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    // Función para darle una celda más al array de snake en línea recta
    maxSnakeH () {
        this.snake.push(new Snake (this.ctx, this.snakeLastX + CELL_SIZE, SNAKE_Y, SNAKE_W, SNAKE_H)) // las siguientes la x varia según donde acabó la x anterior + el tamaño de la celda
        this.snakeLastX = this.snake[this.snake.length - 1].x // actualizamos el valor de la última X a la última celda de snake creada
    }

    endGame () {
        if (this.snake[0].x <= 0 || this.snake[0].x >= GAME_W + SNAKE_W || this.snake[0].y <= 0 || this.snake[0].y >= GAME_H - SNAKE_H) {
            clearInterval(this.intervalId)
        }
    }
}