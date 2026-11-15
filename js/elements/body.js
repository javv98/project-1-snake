const greenSkin = new Image ()

greenSkin.src = "imgs/snake/green/body.png"

greenSkin.columns = 4
greenSkin.rows = 4

greenSkin.columnIndex = 0
greenSkin.rowIndex = 2

greenSkin.onload = () => {
    greenSkin.isReady = true

    greenSkin.frameW = Math.floor(greenSkin.width / greenSkin.columns)
    greenSkin.frameH = Math.floor(greenSkin.height / greenSkin.rows)
}

const redSkin = new Image ()

redSkin.src = "imgs/snake/red/body.png"

redSkin.columns = 4
redSkin.rows = 4

redSkin.columnIndex = 0
redSkin.rowIndex = 2

redSkin.onload = () => {
    redSkin.isReady = true

    redSkin.frameW = Math.floor(redSkin.width / redSkin.columns)
    redSkin.frameH = Math.floor(redSkin.height / redSkin.rows)
}

const blueSkin = new Image ()

blueSkin.src = "imgs/snake/blue/body.png"

blueSkin.columns = 4
blueSkin.rows = 4

blueSkin.columnIndex = 0
blueSkin.rowIndex = 2

blueSkin.onload = () => {
    blueSkin.isReady = true

    blueSkin.frameW = Math.floor(blueSkin.width / blueSkin.columns)
    blueSkin.frameH = Math.floor(blueSkin.height / blueSkin.rows)
}

class Body {

    constructor (ctx, x, y, w, h, tail = false, direction = "left", color) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.w = w
        this.h = h

        this.direction = direction

        this.tail = tail // Para pintar la cola, en el último será true

        this.color = color
        
        if (this.color === "green") {
            this.skin = greenSkin
        }

        if (this.color === "red") {
            this.skin = redSkin
        }

        if (this.color === "blue") {
            this.skin = blueSkin
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