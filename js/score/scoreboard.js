class Scoreboard {
    constructor (apples, body, maxScore) {
        this.canvas = document.getElementById("score")
        this.canvas.width = SCOREBOARD_W
        this.canvas.height = SCOREBOARD_H
        this.ctx = this.canvas.getContext("2d")

        this.namePlayer = document.querySelector("#nameInput").value.toUpperCase()

        this.apples = apples
        this.body = body
        this.maxScore = maxScore

        this.scoreImg = new Image ()
        this.scoreImg.src = "imgs/scoreboard/score.png"

        this.appleImg = new Image ()
        this.appleImg.src = "imgs/apple.png"

        this.bodyImg = new Image ()
        this.bodyImg.src = "imgs/scoreboard/body_part.png"

        this.recordImg = new Image ()
        this.recordImg.src = "imgs/scoreboard/record.png"

        this.scoreImg.onload = () => {
            this.scoreImg.isReady = true
        }

        this.appleImg.onload = () => {
            this.appleImg.isReady = true
        }

        this.bodyImg.onload = () => {
            this.bodyImg.isReady = true
        }

        this.recordImg.onload = () => {
            this.recordImg.isReady = true
        }

    }

    draw () {
        this.ctx.font = "14px sans-serif"
        this.ctx.fillStyle = "black"
        // ACTUAL SCORE
        // Title
        if (this.scoreImg.isReady === true) {
            this.ctx.drawImage(this.scoreImg, TITLE_IMG_X, TITLE_IMG_Y, TITLE_IMG_W, TITLE_IMG_H)
        }

        // Apples
        if (this.appleImg.isReady === true) {
            this.ctx.drawImage(this.appleImg, ALL_X, APPLE_IMG_Y, APPLE_IMG_W, APPLE_IMG_H)
        }
        this.ctx.fillText(`: ${this.apples}`, APPLES_TEXT_X, APPLES_TEXT_Y)

        // Body
        if (this.bodyImg.isReady === true) {
            this.ctx.drawImage(this.bodyImg, ALL_X, BODY_IMG_Y, BODY_IMG_W, BODY_IMG_H)
        }

        this.ctx.fillText(`: ${this.body}`, BODY_TEXT_X, BODY_TEXT_Y)

        // BEST SCORE
        // Title
        if (this.recordImg.isReady === true) {
            this.ctx.drawImage(this.recordImg, HIGHEST_SCORE_IMG_X, HIGHEST_SCORE_IMG_Y, HIGHEST_SCORE_IMG_W, HIGHEST_SCORE_IMG_H)
        }

        // Name
        this.ctx.font = "8px 'Press Start 2P'"
        this.ctx.fillText(`${localStorage.getItem("name")}`, ALL_X, BEST_PLAYER_Y)

        // Apples
        this.ctx.font = "14px sans-serif";
        if (this.appleImg.isReady === true) {
            this.ctx.drawImage(this.appleImg, ALL_X, HIGHEST_APPLE_IMG_Y, HIGHEST_APPLE_IMG_W, HIGHEST_APPLE_IMG_H)
        }
        this.ctx.fillText(`: ${localStorage.getItem("apples")}`, HIGHEST_APPLES_TEXT_X, HIGHEST_APPLES_TEXT_Y)

        // Body
        if (this.bodyImg.isReady === true) {
            this.ctx.drawImage(this.bodyImg, ALL_X, HIGHEST_BODY_IMG_Y, HIGHEST_BODY_IMG_W, HIGHEST_BODY_IMG_H)
        }

        this.ctx.fillText(`: ${localStorage.getItem("score")}`, HIGHEST_BODY_TEXT_X, HIGHEST_BODY_TEXT_Y)

        // CURRENT NAME
        this.ctx.font = "8px 'Press Start 2P'"
        this.ctx.fillStyle = "green"
        this.ctx.fillText(`PLAYER:`, ALL_X, PLAYER_Y)
        this.ctx.fillText(`${this.namePlayer}`, ALL_X, PLAYER_Y + 20)
    }

    clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

}