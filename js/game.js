class Game {
    constructor (difficulty) {
        this.canvas = document.getElementById("game")
        this.canvas.width = GAME_W
        this.canvas.height = GAME_H
        this.ctx = this.canvas.getContext("2d")

        this.difficulty = difficulty

        this.intervalId = null

        this.snake = new Snake (this.ctx, SNAKE_X, SNAKE_Y, SNAKE_W, SNAKE_H)
        
        this.apple = new Apple (this.ctx, APPLE_W, APPLE_H)
        this.appleCount = 0
        this.appleCreated = true
        this.appleIndex = 0

        this.enemy = null
        this.enemyCreated = false // Para controlar que salga más tarde
        this.enemyIndex = 1

        this.goldenHeart = null
        this.goldenHeartCreated = false
        this.goldenHeartIndex = 1

        this.positions = [] // array con las posiciones actualizadas de todos los elementos, tanto snake [0] como el body (resto de índices)

        this.scoreboard = new Scoreboard (this.appleCount, this.snake.body.length, this.snake.lives)

        this.isReady = false
    }

    start () {
        this.snake.firstBody(this.scoreboard)
        this.updatedPositions()

        this.intervalId = setInterval(() => {
            this.clear()
            this.move()

            this.create("apple")
            this.create("enemy")
            this.create("goldenHeart")

            this.checkCollisions()
            this.endGame()
            
            this.draw()
            this.loadGame()

            this.appleIndex++
            this.enemyIndex++

            if (this.snake.lives !== SNAKE_LIVES) {
                this.goldenHeartIndex++
            }

        }, 1000 / this.difficulty)

    }

    draw () {

        this.snake.draw()

        this.snake.body.forEach((part, index, arr) => {
            part.isTail(index, arr)
            part.changeSprite(arr, index)
            part.draw()
        })

        if (this.appleCreated) {
            this.apple.draw()
        }

        if (this.enemyCreated) {
            this.enemy.draw()
        }

        if (this.goldenHeartCreated) {
            this.goldenHeart.draw()
        }

        this.scoreboard.draw()
    }

    move () {
        // MOVE DE LA SNAKE 
        let bodyDirections = this.snake.body.map((part) => part.direction)

        this.snake.move()

        this.snake.body.forEach((part, index) => {
            if (index === 0) {
                part.move(this.positions[index][0], this.positions[index][1], this.snake.direction, this.snake.body, index)
            } else {
                part.move(this.positions[index][0], this.positions[index][1], bodyDirections[index -1], this.snake.body, index) // Pongo -1 porque en el array "snake.body" el elemento 0 tiene que seguir la posición de la cabeza, que está en otra variable, entonces cuando llega a la posición 1, empezamos a compararnos con el array bodyXPositions que el valor al que tiene que igualar es el de la posición 0, por eso es el index - 1, para igualar al valor que necesito
            }
        })
        this.snake.eatApple(this.apple)
        this.updatedPositions() // Cada vez que se mueva actualiza las posiciones en el array
    }

    create (thing, immediately) {
        // CREATE DE LA APPLE
        if (thing === "apple" && this.appleCreated === true) {
            if (this.snake.body.length === ((GAME_GRID * GAME_GRID) - 1)) {
                this.appleCreated = false
                return
            } else {
                if (immediately === true) {
                    this.apple = new Apple (this.ctx, APPLE_W, APPLE_H)
                    this.apple.randomPosition(this.positions, this.enemyCreated ? this.enemy.x : "", this.enemyCreated ? this.enemy.y : "", this.goldenHeartCreated ? this.goldenHeart.x : "", this.goldenHeartCreated ? this.goldenHeart.y : "") 
                    this.appleIndex = 0 
                } else {
                    if (this.appleIndex % APPLE_TIME === 0) {
                        this.apple.randomPosition(this.positions, this.enemyCreated ? this.enemy.x : "", this.enemyCreated ? this.enemy.y : "", this.goldenHeartCreated ? this.goldenHeart.x : "", this.goldenHeartCreated ? this.goldenHeart.y : "")
                        this.appleIndex = 0 
                    }
                }
            } 
        }  

        
        // CREATE DEL ENEMIGO (Aparece más tarde de iniciarse el juego)
        if (thing === "enemy") {
            if (this.snake.body.length > (GAME_GRID * GAME_GRID) - 25) { // No me lo crea si quedan menos de 25 huecos libres en el tablero (lo comprobamos con el tamaño de la serpiente)
                return
            } else {

                if (this.enemyCreated === false) {
                    if (this.enemyIndex % ENEMY_TIME === 0) {
                        this.enemy = new Enemy (this.ctx, ENEMY_W, ENEMY_H)
                        this.enemy.randomPosition(this.positions, this.apple.x, this.apple.y, this.goldenHeartCreated ? this.goldenHeart.x : "", this.goldenHeartCreated ? this.goldenHeart.y : "") 
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
        } 

        // CREATE DE LA APPLE (Aparece solo cuando tienes menos vidas de las máximas)

       if (thing === "goldenHeart") {
            if (this.snake.lives === SNAKE_LIVES) {
                return
            } else {
                if (this.goldenHeartIndex % GOLDENH_TIME === 0) {
                    this.goldenHeart = new GoldenHeart (this.ctx, GOLDENH_W, GOLDENH_W)
                    this.goldenHeart.randomPosition(this.positions, this.apple.x, this.apple.y, this.enemyCreated ? this.enemy.x : "", this.enemyCreated ? this.enemy.y : "")
                    this.goldenHeartCreated = true
                }

                if (this.goldenHeartIndex % GOLDENH_DISSAPEARED === 0) {
                    delete this.goldenHeart
                    this.goldenHeartCreated = false
                    this.goldenHeartIndex = 0
                }
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
            this.snake.body.push(this.apple.getBigger(this.ctx, this.positions, this.snake.body))
            appleSound.play()
            delete this.apple
            this.create("apple", true)
            this.appleCount++
            this.scoreboard.apples = this.appleCount
            this.scoreboard.body = this.snake.body.length
        }

        // ENEMIGO
        if (this.enemyCreated) {
            if (this.snake.collisions(this.enemy.position)) {

                this.snake.body = this.enemy.deleteBody(this.snake.body)
                enemySound.play()
                delete this.enemy

                this.enemyCreated = false
                this.enemyIndex = 1
                this.scoreboard.body = this.snake.body.length
                this.snake.lives--
                this.scoreboard.lifes = this.snake.lives
            }
        }

        // GOLDER HEART
        if (this.goldenHeartCreated) {
            if (this.snake.collisions(this.goldenHeart.position)) {
                this.snake.lives = this.goldenHeart.heal(this.snake.lives)
                healAudio.play()
                delete this.goldenHeart
                this.goldenHeartCreated = false
                this.goldenHeartIndex = 0
                this.scoreboard.lifes = this.snake.lives
            }
        }
    }

    saveScore () {
        if (+localStorage.getItem("score") < this.snake.body.length) {
            localStorage.setItem("name", this.scoreboard.namePlayer)
            localStorage.setItem("apples", this.appleCount.toString())
            localStorage.setItem("score", this.scoreboard.body.toString())
        }
    }

    // El juego termina cuando la serpiente se choca con la pared o cuando su array es cero o cuando se choca con una parte de su body
    endGame () {
        // Perder
        if (this.snake.x < 0 || this.snake.x > GAME_W - SNAKE_W || this.snake.y < 0 || this.snake.y > GAME_H - SNAKE_H) { // Cuando se choca con una pared
            clearInterval(this.intervalId)
            this.lose()

        }

        if (this.snake.body.length === 0) { // Cuando se queda sin elementos en el array body
            clearInterval(this.intervalId)
            this.lose()
        }

        if (this.snake.collisions(this.snake.body)) {
            clearInterval(this.intervalId)
            this.lose()
        }

        if (this.snake.lives === 0) {
            clearInterval(this.intervalId)
            this.lose()
        }

        // Ganar
        if (this.snake.body.length === ((GAME_GRID * GAME_GRID) - 1)) { // - 1 porque la cabeza ocupa espacio pero no cuenta en el cuerpo 
            clearInterval(this.intervalId)
            this.win() 
        } 
    }

    lose () {
        const gameCanvas = document.querySelector("#canvas") 
        const endPage = document.querySelector("#endScreen")

        const playerScore = document.querySelector("#playerScore")
        const appleScore = document.querySelector("#appleScore")
        const lengthScore = document.querySelector("#lengthScore")

        this.saveScore()
        gameSound.pause()
        loseSound.play()

        playerScore.textContent = `⬇ ${this.scoreboard.namePlayer}, this is your score ⬇`
        appleScore.textContent = `: ${this.appleCount.toString()}`
        lengthScore.textContent = `: ${this.scoreboard.body.toString()}`

        gameCanvas.classList.add("stop")
        endPage.classList.remove("stop")
    }

    win () {
        const gameCanvas = document.querySelector("#canvas")
        const winPage = document.querySelector("#winScreen")
        const winnerName = document.querySelector("#winnerName")

        this.saveScore()
        gameSound.pause()
        winSound.play()

        winnerName.textContent = `${this.scoreboard.namePlayer}, do you wanna...`

        gameCanvas.classList.add("stop")
        winPage.classList.remove("stop")

    }

    loadGame () {
        if (this.isReady === false) {
            instructions.classList.add("stop")
            gameCanvas.classList.remove("stop")
            gameSound.play()
            this.isReady = true
        }
    }
}