class GoldenHeart {
    constructor (ctx, w, h, power = 1) {
        this.ctx = ctx
        this.x = null
        this.y = null
        this.w = w
        this.h = h

        this.power = power

        this.GoldenHeartImg = new Image ()
        this.GoldenHeartImg.src = "imgs/goldenHeart.png"

        this.position = [{x: this.x, y: this.y}]
    }

    draw () {
        this.ctx.drawImage(this.GoldenHeartImg, this.x, this.y, this.w, this.h)
    }

    randomPosition (xyBodyArray, xApple, yApple, xEnemy = false, yEnemy = false) { 
        // Luego genero un numero random entre 0 y el tamaño del juego en ambas direcciones
        let randomX = Math.floor(Math.random() * (GAME_W - CELL_SIZE))
        let randomY = Math.floor(Math.random() * (GAME_H - CELL_SIZE))

        // Después compruebo que esa combinación no sea ninguna de las existentes en el cuerpo de la serpiente y que es múltiplo del tamaño de la casilla para que siempre esté bien posicionado y no es la posición de la manzana
        while ((xyBodyArray.some((xy) => xy[0] === randomX && xy[1] === randomY)) || (randomX % CELL_SIZE !== 0 || randomY % CELL_SIZE !== 0) || (randomX === xApple || randomY === yApple) || (randomX === xEnemy || randomY === yEnemy)) {
            randomX = Math.floor(Math.random() * (GAME_W - CELL_SIZE))
            randomY = Math.floor(Math.random() * (GAME_H - CELL_SIZE))
        }

        this.x = randomX
        this.y = randomY
        this.position = [{x: this.x, y: this.y}]
    }

    heal (actualLives) {
        return actualLives += this.power
    }
}