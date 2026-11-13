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

// Comprueba que se haya introducido un nombre y que no sea un espacio en blanco 
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

easyButton.addEventListener("click", () => {
    const game = new Game ()
    game.start()
})

mediumButton.addEventListener("click", () => {
    const game = new Game ()
    game.start()
})

hardButton.addEventListener("click", () => {
    const game = new Game ()
    game.start()
})
    


restartButton.forEach((button) => {
    button.addEventListener("click", (() => {
    restartSound.play()
    restartSound.addEventListener("ended", (() => { // Cuando termina de reproducirse el audio, se reinicia
        window.location.reload()
    }))
}))
})

endButton.forEach((button) => {
    button.addEventListener("click", (() => {
    window.close()
}))
})