class Snake {
    constructor (ctx, x, y, w, h) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.w = w
        this.h = h

        this.vx = 0

    }

    draw () {
        this.ctx.fillStyle = "black" 
        this.ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    move () {
        this.x += this.vx
    }

}