class Scoreboard {
    constructor (apples, length, maxScore) {
        this.canvas = document.getElementById("score")
        this.canvas.width = SCOREBOARD_W
        this.canvas.height = SCOREBOARD_H
        this.ctx = this.canvas.getContext("2d")

        this.apples = apples
        this.length = length
        this.maxScore = maxScore
    }

    draw () {
        this.ctx.fillText(`Manzanas: ${this.apples}`, 10, 10)
    }

    clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}