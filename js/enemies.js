class Enemy {
    constructor (ctx, w, h, damage = 2) {
        this.ctx = ctx
        this.x = null
        this.y = null
        this.w = w
        this.h = h
        this.damage = damage
        this.position = [{x: this.x, y: this.y}] // Lo necesitamos para el check collisions
    }

    draw () {
        this.ctx.fillStyle = "brown"
        this.ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    // Función para asignar una posición random del tablero pero que NO coincida con la posición de la serpiente ni de la manzana. 
    randomPosition (xyBodyArray, xApple, yApple) { // Recibe un array de arrays con las x e y de la snake y de cada parte del cuerpo
        // Primero genero un numero random entre 0 y el tamaño del juego en ambas direcciones
        let randomX = Math.floor(Math.random() * (GAME_W - CELL_SIZE))
        let randomY = Math.floor(Math.random() * (GAME_H - CELL_SIZE))

        // Segundo compruebo que esa combinación no sea ninguna de las existentes en el cuerpo de la serpiente y que es múltiplo del tamaño de la casilla para que siempre esté bien posicionado y no es la posición de la manzana
        while ((xyBodyArray.some((xy) => xy[0] === randomX && xy[1] === randomY)) || (randomX % CELL_SIZE !== 0 || randomY % CELL_SIZE !== 0) || (randomX === xApple || randomY === yApple)) {
            randomX = Math.floor(Math.random() * (GAME_W - CELL_SIZE))
            randomY = Math.floor(Math.random() * (GAME_H - CELL_SIZE))
        }

        this.x = randomX
        this.y = randomY
        this.position = [{x: this.x, y: this.y}]
    }

    //Función para que cuando te choques con la manzana esta te elimine una parte del cuerpo según el damage del enemigo
    deleteBody (body) { // Recibe el array del cuerpo de la serpiente, un array de objetos
        body.splice(body.length - this.damage, this.damage)
    }
}