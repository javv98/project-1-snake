class Scoreboard {
    constructor (apples, body, maxScore) {
        this.canvas = document.getElementById("score")
        this.canvas.width = SCOREBOARD_W
        this.canvas.height = SCOREBOARD_H
        this.ctx = this.canvas.getContext("2d")

        this.apples = apples
        this.body = body
        this.maxScore = maxScore
    }

    draw () {
        this.ctx.font = "14px sans-serif";

        // Title
        this.ctx.fillText(`PUNTUACIÓN`, SCORE_X, TITLE_Y)


        // Apples
        this.ctx.fillText(`Manzanas: ${this.apples}`, SCORE_X, APPLES_Y)

        // Length
        this.ctx.fillText(`Longitud: ${this.body}`, SCORE_X, BODY_Y)
    }

    clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}