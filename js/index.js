const startPage = document.querySelector("#startScreen")
const gameCanvas = document.querySelector("#canvas")
const startButton = document.querySelector("#startButton")
const restartButton = document.querySelectorAll("#restartButton")
const endButton = document.querySelectorAll("#endButton")
const input = document.querySelector("#nameInput")

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
    startPage.classList.add("stop")
    gameCanvas.classList.remove("stop")
    
    const game = new Game ()
    game.start()
})

restartButton.forEach((button) => {
    button.addEventListener("click", (() => {
    window.location.reload()
}))
})

endButton.forEach((button) => {
    button.addEventListener("click", (() => {
    window.close()
}))
})