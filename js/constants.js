// Tamaño del juego
const GAME_W = 500
const GAME_H = GAME_W // El juego siempre tiene que ser cuadrado para que las cuadrículas salgan perfectas
const GAME_GRID = 20 // Cuantas casillas en cada fila quiero que haya en el juego
const CELL_SIZE = GAME_W / GAME_GRID // El tamaño de cada celda

// Tamaño de cada trozo de la serpiente
const SNAKE_W = CELL_SIZE // El tamaño mínimo de la serpiente será 1 casilla
const SNAKE_H = GAME_H / GAME_GRID // El largo siempre será de una casilla
const SNAKE_CELLS = 8 // Tamaño inicial de la serpiente en celdas

// Donde sale (siempre en medio)
const SNAKE_X = GAME_W / 2 // Relacionar el tamaño del juego a la posición donde salga la serpiente, para que siempre salga a la mitad
const SNAKE_Y = GAME_H / 2 // Lo mismo

//Velocidad de la serpiente
const SNAKE_VX = CELL_SIZE // La velocidad siempre estará relacionada con el tamaño de la celda, para que se mueva exáctamente esos píxeles

// Tamaño de la manzana
const APPLE_W = CELL_SIZE
const APPLE_H = APPLE_W
const APPLE_TIME = 30