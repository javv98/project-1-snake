class Snake {
    constructor (ctx, x, y, w, h, color, level) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.color = color
        this.level = level

        this.vx = -CELL_SIZE
        this.vy = 0

        this.body = [] 
        this.direction = "left"

        if (this.level === "hard") {
            this.lives = SNAKE_LIVES
        }

        this.skin = new Image()

        if (this.color === "green") {
            this.skin.src = "imgs/snake/green/head.png"
        }

        if (this.color === "red") {
            this.skin.src = "imgs/snake/red/head.png"
        }

        if (this.color === "blue") {
            this.skin.src = "imgs/snake/blue/head.png"
        }

        this.skin.columns = 4
        this.skin.rows = 4

        this.skin.columnIndex = 0
        this.skin.rowIndex = 2

        this.skin.onload = () => {
            this.skin.isReady = true

            this.skin.frameW = Math.floor(this.skin.width / this.skin.rows)
            this.skin.frameH = Math.floor(this.skin.height / this.skin.columns)
        }

        this.isChanging = false
    }

    draw () {
        if (this.skin.isReady) {
            this.ctx.drawImage(
                this.skin,
                this.skin.frameW * this.skin.columnIndex, 
                this.skin.frameH * this.skin.rowIndex, 
                this.skin.frameW, 
                this.skin.frameH, 
                this.x, 
                this.y, 
                this.w, 
                this.h
            )
        }
    }

    move () {
        this.changeDirection ()
        this.x += this.vx
        this.y += this.vy
        this.isChanging = false
    }

    // Method that runs at the start to fill the initial body array with the predefined cells and initialize the scoreboard accordingly
    firstBody (scoreboard) { 
        for (let i = 0; i < SNAKE_CELLS; i++) {
           if (i === 0) {
            this.maxSnakeH(this.x, this.y)
           } else if (i === SNAKE_CELLS - 1) {
            this.maxSnakeH(this.x, this.y, true)
           } else {
            this.maxSnakeH(this.body[this.body.length - 1].x, this.y)
           }
        }

        scoreboard.body = SNAKE_CELLS
    } 
    
    // Method to add one more cell to the snake array in a straight line
    maxSnakeH (x, y, tail) {
        this.body.push(new Body (this.ctx, x + CELL_SIZE, y, this.w, this.h, tail, "left", this.color))
    }

    
    collisions(body) { // Receives an array of objects
        let boolean = false
        body.forEach ((part) => {
            if ((this.x === part.x) && (this.y === part.y)) {
                boolean = true
                return
            }
        })
        return boolean
    }

    changeDirection () {
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp" && (this.direction === "left" || this.direction === "right") && (this.isChanging === false)) {
                this.vx = 0
                this.vy = -CELL_SIZE
                this.direction = "up"
                this.skin.columnIndex = 0
                this.skin.rowIndex = 0
                this.isChanging = true
            }
        })

        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown" && (this.direction === "left" || this.direction === "right") && (this.isChanging === false) ) {
                this.vx = 0
                this.vy = CELL_SIZE
                this.direction = "down"
                this.skin.columnIndex = 0
                this.skin.rowIndex = 3
                this.isChanging = true
            }
        })

        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft" && (this.direction === "up" || this.direction === "down") && (this.isChanging === false) ) {
                this.vx = -CELL_SIZE
                this.vy = 0
                this.direction = "left"
                this.skin.columnIndex = 0
                this.skin.rowIndex = 2
                this.isChanging = true
            }
        })

        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight" && (this.direction === "up" || this.direction === "down") && (this.isChanging === false) ) {
                this.vx = CELL_SIZE
                this.vy = 0
                this.direction = "right"
                this.skin.columnIndex = 0
                this.skin.rowIndex = 1
                this.isChanging = true
            }
        })
    }

    // Method to change the snake's sprites before and while eating an apple
    eatAppleSprite (apple) {

        if (this.direction === "up") {

            if (apple.y === this.y - CELL_SIZE && apple.x === this.x) {
                this.skin.columnIndex = 3
                this.skin.rowIndex = 0
            } else if (apple.y === this.y && apple.x === this.x) {
                this.skin.columnIndex = 1
                this.skin.rowIndex = 0
            } else {
                this.skin.columnIndex = 0
                this.skin.rowIndex = 0
            }
        }

        if (this.direction === "down") {

            if (apple.y === this.y + CELL_SIZE && apple.x === this.x) {
                this.skin.columnIndex = 3
                this.skin.rowIndex = 3
            } else if (apple.y === this.y && apple.x === this.x) {
                this.skin.columnIndex = 1
                this.skin.rowIndex = 3
            } else {
                this.skin.columnIndex = 0
                this.skin.rowIndex = 3
            }
        }

        if (this.direction === "left") {

            if (apple.x === this.x - CELL_SIZE && apple.y === this.y) {
                this.skin.columnIndex = 3
                this.skin.rowIndex = 2
            } else if (apple.x === this.x && apple.y === this.y) {
                this.skin.columnIndex = 1
                this.skin.rowIndex = 2
            } else {
                this.skin.columnIndex = 0
                this.skin.rowIndex = 2
            }
        }

        if (this.direction === "right") {

            if (apple.x === this.x + CELL_SIZE && apple.y === this.y) {
                this.skin.columnIndex = 3
                this.skin.rowIndex = 1
            } else if (apple.x === this.x && apple.y === this.y) {
                this.skin.columnIndex = 1
                this.skin.rowIndex = 1
            } else {
                this.skin.columnIndex = 0
                this.skin.rowIndex = 1
            }
        }
    }

}