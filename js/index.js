let gameRunning = false

const startPage = document.querySelector("#startScreen")
const gameCanvas = document.querySelector("#canvas")
const startButton = document.querySelector("#startButton")

startButton.addEventListener("click", () => {
    startPage.classList.add("stop")
    gameCanvas.classList.remove("stop")
    
    const game = new Game ()
    game.start()
})