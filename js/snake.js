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

        this.head = new Image()
        this.head.src = "imgs/snake/head.png"

        this.head.xFrames = 4
        this.head.yFrames = 4

        this.head.xFrameIndex = 0
        this.head.yFrameIndex = 2

        this.head.onload = () => {
            this.head.isReady = true

            this.head.frameW = Math.floor(this.head.width / this.head.yFrames)
            this.head.frameH = Math.floor(this.head.height / this.head.xFrames)
        }

    }

    draw () {
        if (this.head.isReady) {
            this.ctx.drawImage(
                this.head,
                this.head.frameW * this.head.xFrameIndex, 
                this.head.frameH * this.head.yFrameIndex, 
                this.head.frameW, 
                this.head.frameH, 
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
    firstBody () { 
        for (let i = 0; i < SNAKE_CELLS; i++) { // Hacemos un bucle para insertar las celdas
           if (i === 0) {
            this.maxSnakeH(this.x, this.y) // La primera dependerá de la posición de la cabeza
           }  else {
            this.maxSnakeH(this.body[this.body.length - 1].x, this.y) // Las siguientes dependerán de la posición de la última parte del body
           }
        }
    } 
    
    // Función para darle una celda más al array de snake en línea recta
    maxSnakeH (x, y) {
        this.body.push(new Body (this.ctx, x + CELL_SIZE, y, this.w, this.h)) // las siguientes la x varia según donde acabó la x anterior + el tamaño de la celda
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
                this.head.xFrameIndex = 0
                this.head.yFrameIndex = 0
            }
        })

        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown" && (this.direction === "left" || this.direction === "right") ) {
                this.vx = 0
                this.vy = CELL_SIZE
                this.direction = "down"
                this.head.xFrameIndex = 0
                this.head.yFrameIndex = 3
            }
        })

        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft" && (this.direction === "up" || this.direction === "down") ) {
                this.vx = -CELL_SIZE
                this.vy = 0
                this.direction = "left"
                this.head.xFrameIndex = 0
                this.head.yFrameIndex = 2
            }
        })

        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight" && (this.direction === "up" || this.direction === "down") ) {
                this.vx = CELL_SIZE
                this.vy = 0
                this.direction = "right"
                this.head.xFrameIndex = 0
                this.head.yFrameIndex = 1
            }
        })
        
    }

}