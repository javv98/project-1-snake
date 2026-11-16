const startPage = document.querySelector("#startScreen")
const gameCanvas = document.querySelector("#canvas")
const startButton = document.querySelector("#startButton")
const restartButton = document.querySelectorAll("#restartButton")
const endButton = document.querySelectorAll("#endButton")
const input = document.querySelector("#nameInput")
const instructions = document.querySelector("#instructions")
const easyButton = document.querySelector(".easy")
const mediumButton = document.querySelector(".medium")
const hardButton = document.querySelector(".hard")
const snakeColor = document.querySelector("#snakeColor")
const redButton = document.querySelector(".red")
const greenButton = document.querySelector(".green")
const blueButton = document.querySelector(".blue")
const levelSelection = document.querySelector("#levelSelection")

let color = ""
let level = ""

// Check that a name has been entered and that it is not just a blank space
input.addEventListener("input", () => {
    if (input.value === "") {
        startButton.setAttribute("disabled", "")
        input.setAttribute("maxlength", "12")
    } else if (input.value === " ") {
        startButton.setAttribute("disabled", "")
        input.setAttribute("maxlength", "1")
    } else {
            startButton.removeAttribute("disabled")
        }
    })

startButton.addEventListener("click", () => {
    startSound.play()
    startPage.classList.add("stop")
    instructions.classList.remove("stop")
})

redButton.addEventListener("click", () => {
    color = "red"
    colorSelection.play()
    snakeColor.classList.add("stop")
    levelSelection.classList.remove("stop")
})

greenButton.addEventListener("click", () => {
    color = "green"
    colorSelection.play()
    snakeColor.classList.add("stop")
    levelSelection.classList.remove("stop")
})

blueButton.addEventListener("click", () => {
    color = "blue"
    colorSelection.play()
    snakeColor.classList.add("stop")
    levelSelection.classList.remove("stop")
})

easyButton.addEventListener("click", () => {
    difficultySound.play()
    level = "easy"
    const game = new Game (level, color)
    game.start()
})

mediumButton.addEventListener("click", () => {
    difficultySound.play()
    level = "medium"
    const game = new Game (level, color)
    game.start()
})

hardButton.addEventListener("click", () => {
    difficultySound.play()
    level = "hard"
    const game = new Game (level, color)
    game.start()
})
    


restartButton.forEach((button) => {
    button.addEventListener("click", (() => {
    restartSound.play()
    restartSound.addEventListener("ended", (() => { // The game doesn't restart until the audio has finished playing
        window.location.reload()
    }))
}))
})

endButton.forEach((button) => {
    button.addEventListener("click", (() => {
    window.close()
}))
})