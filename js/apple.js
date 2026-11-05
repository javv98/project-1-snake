class Apple {
    constructor (ctx, w, h) {
        this.ctx = ctx
        this.x = null
        this.y = null
        this.w = w
        this.h = h

        this.position = [{x: this.x, y: this.y}]
    }

    draw () { 
        this.ctx.fillStyle = "red" 
        this.ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    // Función para asignar una posición random del tablero pero que NO coincida con la posición de la serpiente. 
    randomPosition (xyArray) { // Recibe un array de arrays con las x e y de la snake y de cada parte del cuerpo
        // Primero genero un numero random entre 0 y el tamaño del juego en ambas direcciones
        let randomX = Math.floor(Math.random() * (GAME_W - CELL_SIZE))
        let randomY = Math.floor(Math.random() * (GAME_H - CELL_SIZE))

        // Segundo compruebo que esa combinación no sea ninguna de las existentes en el cuerpo de la serpiente y que es múltiplo del tamaño de la casilla para que siempre esté bien posicionado
        while ((xyArray.some((xy) => xy[0] === randomX && xy[1] === randomY)) || (randomX % CELL_SIZE !== 0 || randomY % CELL_SIZE !== 0)) {
            randomX = Math.floor(Math.random() * (GAME_W - CELL_SIZE))
            randomY = Math.floor(Math.random() * (GAME_H - CELL_SIZE))
        }

        this.x = randomX
        this.y = randomY
        this.position = [{x: this.x, y: this.y}]
    }

    //Función para cuando choquemos con la manzana esta haga crecer al cuerpo y desaparezca

    //Función para que desaparezca cuando hayan pasado 3 segundos


}