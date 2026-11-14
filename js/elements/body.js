const skin = new Image ()
skin.src = "imgs/snake/body.png"

skin.columns = 4
skin.rows = 4

skin.columnIndex = 0
skin.rowIndex = 2

skin.onload = () => {
            skin.isReady = true

            skin.frameW = Math.floor(skin.width / skin.columns)
            skin.frameH = Math.floor(skin.height / skin.rows)
        }

class Body {

    constructor (ctx, x, y, w, h, tail = false, direction = "left") {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.w = w
        this.h = h

        this.direction = direction

        this.tail = tail // Para pintar la cola, en el último será true

        this.skin = skin
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

    }

    isTail (index, bodyArr) {
        if (index === bodyArr.length - 1) {
            this.tail = true
        } else {
            this.tail = false
        }
    }

    changeSprite (arr, index) {
        // Para giros
         if (index < arr.length - 1 && this.direction !== arr[index + 1].direction) {
            if (this.direction === "up" && arr[index + 1].direction === "left") {
                this.skin.columnIndex = 1
                this.skin.rowIndex = 2
            } else if (this.direction === "up" && arr[index + 1].direction === "right") {
                this.skin.columnIndex = 1
                this.skin.rowIndex = 3
            } else if (this.direction === "down" && arr[index + 1].direction === "left") {
                this.skin.columnIndex = 1
                this.skin.rowIndex = 0
            } else if (this.direction === "down" && arr[index + 1].direction === "right") {
                this.skin.columnIndex = 1
                this.skin.rowIndex = 1
            } else if (this.direction === "right" && arr[index + 1].direction === "up") {
                this.skin.columnIndex = 2
                this.skin.rowIndex = 2
            } else if (this.direction === "right" && arr[index + 1].direction === "down") {
                this.skin.columnIndex = 1
                this.skin.rowIndex = 2
            } else if (this.direction === "left" && arr[index + 1].direction === "up") {
                this.skin.columnIndex = 1
                this.skin.rowIndex = 1
            } else if (this.direction === "left" && arr[index + 1].direction === "down") {
                this.skin.columnIndex = 1
                this.skin.rowIndex = 3
            }
                
        } else { // Para línea recta

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
        
    }

}