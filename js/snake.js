class Snake {
    constructor (ctx, x, y, w, h) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.w = w
        this.h = h

        this.vx = -CELL_SIZE // Siempre inicia yéndose para la derecha, en dirección a la cabeza
        this.vy = 0

        this.body = [] // El cuerpo se gestiona como un array
        this.bodyLastX = 0 // variable para almacenar la x de la última celda del cuerpo

    }

    draw () {
            this.ctx.fillStyle = "red" 
            this.ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    move () {
        this.x += this.vx
    }

     /* Editarlo
    firstSnake () { // Función que se ejecuta al principio para llenar el array inicial de serpiente con las celdas establecidas
        for (let i = 0; i < SNAKE_CELLS; i++) { // Hacemos un bucle para insertar las celdas
            if (i === 0) {
                this.snake.push(new Snake (this.ctx, SNAKE_X, SNAKE_Y, SNAKE_W, SNAKE_H)) // la primera se hace con los valores de las constantes
                this.bodyLastX = this.snake[this.snake.length - 1].x
            } else {
                this.maxSnakeH() // Me llevo a una función el añadir más cuadrados a una snake
            }
        }
    } 
      
        // Función para darle una celda más al array de snake en línea recta
    maxSnakeH () {
        this.snake.push(new Snake (this.ctx, this.snakeLastX + CELL_SIZE, SNAKE_Y, SNAKE_W, SNAKE_H)) // las siguientes la x varia según donde acabó la x anterior + el tamaño de la celda
        this.snakeLastX = this.snake[this.snake.length - 1].x // actualizamos el valor de la última X a la última celda de snake creada
    }
    */

}