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
                this.maxSnake(this.snakeLastX) // Me llevo a una función el añadir más cuadrados a una snake
            }
        }
    }

    start () {
        this.firstSnake() 
        this.intervalId = setInterval(() => {
        this.clear()
        this.move()
        this.draw()
        }, 1000 / 60)

    }

    draw () {
    this.snake.forEach((snake) => {
        snake.draw()
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

    // Función para darle una celda más al array de snake
    maxSnake (lastX) {
        this.snake.push(new Snake (this.ctx, lastX + CELL_SIZE, SNAKE_Y, SNAKE_W, SNAKE_H)) // las siguientes la x varia según donde acabó la x anterior + el tamaño de la celda
        this.snakeLastX = this.snake[this.snake.length - 1].x // actualizamos el valor de la última X a la última celda de snake creada
    }
}