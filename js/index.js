const startPage = document.querySelector("#startScreen")
const gameCanvas = document.querySelector("#canvas")
const startButton = document.querySelector("#startButton")
const restartButton = document.querySelector("#restartButton")
const endButton = document.querySelector("#endButton")
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

restartButton.addEventListener("click", (() => {
    window.location.reload()
}))

endButton.addEventListener("click", (() => {
    window.close()
}))