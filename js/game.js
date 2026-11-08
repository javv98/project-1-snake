class Game {
    constructor () {
        this.canvas = document.getElementById("game")
        this.canvas.width = GAME_W
        this.canvas.height = GAME_H
        this.ctx = this.canvas.getContext("2d")

        this.snake = new Snake (this.ctx, SNAKE_X, SNAKE_Y, SNAKE_W, SNAKE_H)
        this.intervalId = null
        
        this.apple = new Apple (this.ctx, APPLE_W, APPLE_H)
        this.appleCount = 0

        this.enemy = null

        this.positions = [] // array con las posiciones actualizadas de todos los elementos, tanto snake [0] como el body (resto de índices)

        this.appleIndex = 0

        this.enemyCreated = false // Para controlar que salga más tarde
        this.enemyIndex = 1

        this.scoreboard = new Scoreboard (this.appleCount, this.snake.body.length)
    }

    start () {
        this.snake.firstBody()
        this.intervalId = setInterval(() => {
        this.clear()
        this.move()
        this.checkCollisions()
        this.draw()
        this.endGame()

        this.appleIndex++
        this.enemyIndex++
        }, 1000 / 5)

    }

    draw () {
        this.apple.draw()

        if (this.enemyCreated) {
            this.enemy.draw()
        }

        this.snake.draw()

        this.snake.body.forEach((part, index, arr) => {
            part.isTail(index, arr)
            part.draw()
        })

        this.scoreboard.draw()
    }

    move () { //(ACTUALIZAR CON EL NUEVO this.positions)
        // MOVE DE LA SNAKE 
        // El move guarda primero la posición original de la serpiente y su cuerpo y luego mueve al resto del cuerpo en base a los valores anteriores
        let snakeXPosition = this.snake.x
        let snakeYPosition = this.snake.y
        let snakeDirection = this.snake.direction

        let bodyXPositions = this.snake.body.map((part) => part.x)
        let bodyYPositions = this.snake.body.map((part) => part.y)
        let bodyDirections = this.snake.body.map((part) => part.direction)

        this.snake.move()
        this.snake.body.forEach((part, index) => {
            if (index === 0) {
                part.move(snakeXPosition, snakeYPosition, snakeDirection)
            } else {
                part.move(bodyXPositions[index -1], bodyYPositions[index -1], bodyDirections[index -1] ) // Pongo -1 porque en el array "snake.body" el elemento 0 tiene que seguir la posición de la cabeza, que está en otra variable, entonces cuando llega a la posición 1, empezamos a compararnos con el array bodyXPositions que el valor al que tiene que igualar es el de la posición 0, por eso es el index - 1, para igualar al valor que necesito
            }
        })
        this.updatedPositions() // Cada vez que se mueva actualiza las posiciones en el array
        this.scoreboard.body = this.snake.body.length

        // MOVE DE LA APPLE
        if (this.appleIndex % APPLE_TIME === 0) {
            this.apple.randomPosition(this.positions) 
            this.appleIndex = 0 
        }

        // MOVE DEL ENEMIGO (Aparece más tarde de iniciarse el juego)
        if (this.enemyCreated === false) {
            if (this.enemyIndex % ENEMY_TIME === 0) {
                this.enemy = new Enemy (this.ctx, ENEMY_W, ENEMY_H)
                this.enemy.randomPosition(this.positions, this.apple.x, this.apple.y) 
                this.enemyCreated = true
            }
        }
        if (this.enemyCreated === true) {
            if (this.enemyIndex % ENEMY_DISSAPEARED === 0) {
                    this.enemyCreated = false
                    this.enemyIndex = 1
            }
        }
    }

    clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.scoreboard.clear()
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
        // MANZANA
        // Checkea si se choca la cabeza con una manzana y la elimina para crear otra
        if (this.snake.collisions(this.apple.position)) {
            this.apple.getBigger(this.ctx, this.positions, this.snake.body)
            delete this.apple
            this.apple = new Apple (this.ctx, APPLE_W, APPLE_H)
            this.apple.randomPosition(this.positions) 
            this.appleIndex = 0 
            this.appleCount++
            this.scoreboard.apples = this.appleCount
        }

        // ENEMIGO
        if (this.enemyCreated === true) {
            if (this.snake.collisions(this.enemy.position)) {
                this.enemy.deleteBody(this.snake.body)
                delete this.enemy
                this.enemyCreated = false
                this.enemyIndex = 1
        }
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