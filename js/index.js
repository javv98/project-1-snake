const startPage = document.querySelector("#startScreen")
const gameCanvas = document.querySelector("#canvas")
const startButton = document.querySelector("#startButton")
const restartButton = document.querySelector("#restartButton")
const endButton = document.querySelector("#endButton")
const input = document.querySelector("#nameInput")
const letters = "abcdefghijklmnñopkrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ "

input.addEventListener("input", () => {
    if (input.value === "") {
        startButton.setAttribute("disabled", "") 
    } else {
        let nombre = Array.from(input.value)
        nombre.forEach((letter) => {
        if (letters.includes(letter)) {
            startButton.removeAttribute("disabled")
            } else {
            startButton.setAttribute("disabled", "")
        }
    })
    }
})

startButton.addEventListener("click", () => {
    startPage.classList.add("stop")
    gameCanvas.classList.remove("stop")
    
    const game = new Game ()
    game.start()
})

restartButton.addEventListener("click", (() => {
    window.location.reload()
}))

endButton.addEventListener("click", (() => {
    window.close()
}))