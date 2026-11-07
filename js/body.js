class Body {
    constructor (ctx, x, y, w, h) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.w = w
        this.h = h

        this.direction = "left"

        this.tail = false // Para pintar la cola, en el último será true

        this.skin = new Image ()
        this.skin.src = "imgs/snake/body.png"

        this.skin.columns = 4
        this.skin.rows = 4

        this.skin.columnIndex = 0
        this.skin.rowIndex = 2

        this.skin.onload = () => {
            this.skin.isReady = true

            this.skin.frameW = Math.floor(this.skin.width / this.skin.columns)
            this.skin.frameH = Math.floor(this.skin.height / this.skin.rows)
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

    move (x, y, direction) { // Este move dependerá de la anterior y de la posición
        this.x = x
        this.y = y
        this.direction = direction

        if (this.tail === false) {
            switch (this.direction) {
            case "up":
                this.skin.columnIndex = 0
                this.skin.rowIndex = 0
                break;
            case "down":
                this.skin.columnIndex = 0
                this.skin.rowIndex = 3
                break;
            case "left":
                this.skin.columnIndex = 0
                this.skin.rowIndex = 2
            case "right":
                this.skin.columnIndex = 0
                this.skin.rowIndex = 1
            }
        }

       if (this.tail === true) {
            switch (this.direction) {
            case "up":
                this.skin.columnIndex = 3
                this.skin.rowIndex = 0
                break;
            case "down":
                this.skin.columnIndex = 3
                this.skin.rowIndex = 3
                break;
            case "left":
                this.skin.columnIndex = 3
                this.skin.rowIndex = 2
                break;
            case "right":
                this.skin.columnIndex = 3
                this.skin.rowIndex = 1
                break;
            }
        }
        
    }

    isTail (index, bodyArr) {
        if (index === bodyArr.length - 1) {
            this.tail = true
        } else {
            this.tail = false
        }
    }
}