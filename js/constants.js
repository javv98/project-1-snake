// Tamaño del juego
const GAME_W = 500
const GAME_H = GAME_W // El juego siempre tiene que ser cuadrado para que las cuadrículas salgan perfectas
const GAME_GRID = 20 // Cuantas casillas en cada fila quiero que haya en el juego
const CELL_SIZE = GAME_W / GAME_GRID // El tamaño de cada celda

// Tamaño de cada trozo de la serpiente
const SNAKE_W = CELL_SIZE // El tamaño mínimo de la serpiente será 1 casilla
const SNAKE_H = GAME_H / GAME_GRID // El largo siempre será de una casilla
const SNAKE_CELLS = 398 // Tamaño inicial de la serpiente en celdas

// Donde sale (siempre en medio)
const SNAKE_X = GAME_W / 2 // Relacionar el tamaño del juego a la posición donde salga la serpiente, para que siempre salga a la mitad
const SNAKE_Y = GAME_H / 2 // Lo mismo

//Velocidad de la serpiente
const SNAKE_VX = CELL_SIZE // La velocidad siempre estará relacionada con el tamaño de la celda, para que se mueva exáctamente esos píxeles

//Vidas de la serpiente
const SNAKE_LIVES = 3

// Manzana
const APPLE_W = CELL_SIZE
const APPLE_H = APPLE_W
const APPLE_TIME = 30

// Enemigo
const ENEMY_W = CELL_SIZE
const ENEMY_H = ENEMY_W
const ENEMY_TIME = 20
const ENEMY_DISSAPEARED = ENEMY_TIME + 20
const ENEMY_MAXCELLS = 25 // Número en el que si quedan menos de estas celdas libres el enemigo ya no sale

// Corazón dorado
const GOLDENH_W = CELL_SIZE
const GOLDENH_H = GOLDENH_W

const GOLDENH_TIME = 20
const GOLDENH_DISSAPEARED = GOLDENH_TIME + 20

// MARCADOR
// Tamaño del marcador
const SCOREBOARD_W = GAME_H / 4
const SCOREBOARD_H = GAME_H

// Posición marcador
const ALL_X = 10

// Imagen "Score"
const TITLE_IMG_W = 86
const TITLE_IMG_X = (SCOREBOARD_W / 2) - (TITLE_IMG_W / 2) // Para que esté en medio 
const TITLE_IMG_Y = 10
const TITLE_IMG_H = 30

// Marcador manzanas
const APPLE_IMG_Y = 46
const APPLE_IMG_W = 26
const APPLE_IMG_H = APPLE_IMG_W

const APPLES_TEXT_Y = APPLE_IMG_Y + 20
const APPLES_TEXT_X = ALL_X + APPLE_IMG_W

// Marcador tamaño snake
const BODY_IMG_Y = 90
const BODY_IMG_H = 14
const BODY_IMG_W = BODY_IMG_H * 2

const BODY_TEXT_Y = BODY_IMG_Y + 12
const BODY_TEXT_X = ALL_X + BODY_IMG_W + 2

// Marcador mejor puntuación
const HIGHEST_SCORE_IMG_Y = 140
const HIGHEST_SCORE_IMG_W = 86
const HIGHEST_SCORE_IMG_X = (SCOREBOARD_W / 2) - (HIGHEST_SCORE_IMG_W / 2) // Para que esté en medio 
const HIGHEST_SCORE_IMG_H = 30

// Marcador mejor puntuación jugador
const BEST_PLAYER_Y = 186

// Marcador mejor puntuación manzanas
const HIGHEST_APPLE_IMG_Y = 196
const HIGHEST_APPLE_IMG_W = 26
const HIGHEST_APPLE_IMG_H = HIGHEST_APPLE_IMG_W

const HIGHEST_APPLES_TEXT_Y = HIGHEST_APPLE_IMG_Y + 20
const HIGHEST_APPLES_TEXT_X = ALL_X + HIGHEST_APPLE_IMG_W

// Marcador mejor puntuación snake
const HIGHEST_BODY_IMG_Y = 240
const HIGHEST_BODY_IMG_H = 14
const HIGHEST_BODY_IMG_W = HIGHEST_BODY_IMG_H * 2

const HIGHEST_BODY_TEXT_Y = HIGHEST_BODY_IMG_Y + 12
const HIGHEST_BODY_TEXT_X = ALL_X + HIGHEST_BODY_IMG_W + 2

// Corazones
const HEARTS_TEXT_Y = 390
const HEARTS_Y = 400
const HEARTS_W = 20
const HEARTS_H = HEARTS_W


// Jugador actual
const PLAYER_Y = 460

// AUDIOS

const startSound = new Audio ("sounds/startButton.mp3")
startSound.volume = 0.6

const gameSound = new Audio ("sounds/game.mp3")
gameSound.loop = true
gameSound.volume = 0.1

const appleSound = new Audio ("sounds/apple.mp3")
appleSound.volume = 0.6

const enemySound = new Audio ("sounds/enemy.mp3")
enemySound.volume = 0.6

const loseSound = new Audio ("sounds/lose.mp3")
loseSound.volume = 0.2

const winSound = new Audio ("sounds/win.mp3")
winSound.volume = 0.6

const restartSound = new Audio ("sounds/restart.mp3")
restartSound.volume = 0.2

const difficultySound = new Audio ("sounds/difficultyButtons.mp3")
difficultySound.volume = 0.4

const healAudio = new Audio ("sounds/heal.mp3")
healAudio.volume = 0.4