class Snake {
    constructor (ctx, x, y, w, h) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.w = w
        this.h = h

        this.vx = -CELL_SIZE // Siempre inicia yéndose para la derecha, en dirección a la cabeza

    }

    draw (i) {
        if (i === 0) {
            this.ctx.fillStyle = "red" 
            this.ctx.fillRect(this.x, this.y, this.w, this.h)
        } else {
            this.ctx.fillStyle = "black" 
            this.ctx.fillRect(this.x, this.y, this.w, this.h)
        }
        
    }

    move () {
        this.x += this.vx
    }

}