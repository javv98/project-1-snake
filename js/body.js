class Body {
    constructor (ctx, x, y, w, h) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.w = w
        this.h = h

    }

    draw () {
        this.ctx.fillStyle = "black" 
        this.ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    move (x, y) { // Este move dependerá de la anterior y de la posición
        this.x = x
        this.y = y
    }
}