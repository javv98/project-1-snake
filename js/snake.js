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
        this.direction = "left" // Puede ser up, down, left o right, empieza siendo left

        this.skin = new Image()
        this.skin.src = "imgs/snake/head.png"

        this.skin.columns = 4
        this.skin.rows = 4

        this.skin.columnIndex = 0
        this.skin.rowIndex = 2

        this.skin.onload = () => {
            this.skin.isReady = true

            this.skin.frameW = Math.floor(this.skin.width / this.skin.rows)
            this.skin.frameH = Math.floor(this.skin.height / this.skin.columns)
        }

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
    }

    // Función que se ejecuta al principio para llenar el array inicial de body con las celdas establecidas
    firstBody (scoreboard) { 
        for (let i = 0; i < SNAKE_CELLS; i++) { // Hacemos un bucle para insertar las celdas
           if (i === 0) {
            this.maxSnakeH(this.x, this.y) // La primera dependerá de la posición de la cabeza
           } else if (i === SNAKE_CELLS - 1) {
            this.maxSnakeH(this.x, this.y, true)
           } else {
            this.maxSnakeH(this.body[this.body.length - 1].x, this.y) // Las siguientes dependerán de la posición de la última parte del body
           }
        }

        scoreboard.body = SNAKE_CELLS
    } 
    
    // Función para darle una celda más al array de snake en línea recta
    maxSnakeH (x, y, tail) {
        this.body.push(new Body (this.ctx, x + CELL_SIZE, y, this.w, this.h, tail)) // las siguientes la x varia según donde acabó la x anterior + el tamaño de la celda
    }

    //Función para chequear cuando la cabeza se choca con el cuerpo (tiene que ser un bucle porque tiene que chequear con todas las partes del cuerpo)
    collisions(body) { // RECIBE UN ARRAY DE OBJETOS
        let boolean = false
        body.forEach ((part) => {
            if ((this.x === part.x) && (this.y === part.y)) { // Al moverse por bloques iguales, necesitamos que la cabeza entre en un bloque ocupado por el cuerpo.
                boolean = true
                return
            }
        })
        return boolean
    }

    changeDirection () {
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp" && (this.direction === "left" || this.direction === "right") ) {
                this.vx = 0
                this.vy = -CELL_SIZE
                this.direction = "up"
                this.skin.columnIndex = 0
                this.skin.rowIndex = 0
            }
        })

        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown" && (this.direction === "left" || this.direction === "right") ) {
                this.vx = 0
                this.vy = CELL_SIZE
                this.direction = "down"
                this.skin.columnIndex = 0
                this.skin.rowIndex = 3
            }
        })

        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft" && (this.direction === "up" || this.direction === "down") ) {
                this.vx = -CELL_SIZE
                this.vy = 0
                this.direction = "left"
                this.skin.columnIndex = 0
                this.skin.rowIndex = 2
            }
        })

        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight" && (this.direction === "up" || this.direction === "down") ) {
                this.vx = CELL_SIZE
                this.vy = 0
                this.direction = "right"
                this.skin.columnIndex = 0
                this.skin.rowIndex = 1
            }
        })
        
    }

}