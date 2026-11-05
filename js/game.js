class Game {
    constructor () {
        this.canvas = document.getElementById("canvas")
        this.canvas.width = GAME_W
        this.canvas.height = GAME_H
        this.ctx = this.canvas.getContext("2d")

        this.snake = new Snake (this.ctx, SNAKE_X, SNAKE_Y, SNAKE_W, SNAKE_H)
        this.intervalId = null
        
        this.apple = new Apple (this.ctx, APPLE_W, APPLE_H)

        this.positions = [] // array con las posiciones actualizadas de todos los elementos, tanto snake [0] como el body (resto de índices)

        this.counter = 0
    }

    start () {
        this.snake.firstBody()
        this.intervalId = setInterval(() => {
        this.clear()
        this.move()
        this.draw()
        this.checkCollisions()
        this.endGame()
        this.counter++
        }, 1000 / 5)

    }

    draw () {
        this.snake.draw()
        this.snake.body.forEach((part) => {
            part.draw()
        })
        this.apple.draw()
    }

    move () { //(ACTUALIZAR CON EL NUEVO this.positions)
        // MOVE DE LA SNAKE 
        // El move guarda primero la posición original de la serpiente y su cuerpo y luego mueve al resto del cuerpo en base a los valores anteriores
        let snakeXPosition = this.snake.x
        let snakeYPosition = this.snake.y
        let bodyXPositions = this.snake.body.map((part) => part.x)
        let bodyYPositions = this.snake.body.map((part) => part.y)
        this.snake.move()
        this.snake.body.forEach((part, index) => {
            if (index === 0) {
                part.move(snakeXPosition, snakeYPosition)
            } else {
                part.move(bodyXPositions[index -1], bodyYPositions[index -1]) // Pongo -1 porque en el array "snake.body" el elemento 0 tiene que seguir la posición de la cabeza, que está en otra variable, entonces cuando llega a la posición 1, empezamos a compararnos con el array bodyXPositions que el valor al que tiene que igualar es el de la posición 0, por eso es el index - 1, para igualar al valor que necesito
            }
        })
        this.updatedPositions() // Cada vez que se mueva actualiza las posiciones en el array

        if (this.counter % APPLE_TIME === 0) {
          this.apple.randomPosition(this.positions) 
          this.counter = 0 
        }
    }

    clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    // Función para crear un array de arrays con las posiciones de la serpiente y su cuerpo
    updatedPositions () {
        let snakeXY = [this.snake.x, this.snake.y]
        this.positions = [snakeXY]
        this.snake.body.forEach((part) => {
             this.positions.push([part.x, part.y])
        })

    }

    checkCollisions () {
        // Checkea si se choca la cabeza con una manzana y la elimina para crear otra
        if (this.snake.collisions(this.apple.position)) {
            delete this.apple
            this.apple = new Apple (this.ctx, APPLE_W, APPLE_H)
            this.apple.randomPosition(this.positions) 
            this.counter = 0 
        }
    }

    // El juego termina cuando la serpiente se choca con la pared o cuando su array es cero o cuando se choca con una parte de su body
    endGame () {
        if (this.snake.x < 0 || this.snake.x > GAME_W - SNAKE_W || this.snake.y < 0 || this.snake.y > GAME_H - SNAKE_H) { // Cuando se choca con una pared
            clearInterval(this.intervalId)
        }

        if (this.snake.body.length === 0) { // Cuando se queda sin elementos en el array body
            clearInterval(this.intervalId)
        }

        if (this.snake.collisions(this.snake.body)) {
            clearInterval(this.intervalId)
        }
    }
}