const board = document.getElementById("board")
const size = 4
const colors = [
    "teal",
    "black",
    "green",
    "red",
    "blue",
    "grey",
    "yellow",
    "orange",
]
const defaultColor = "#D9D9D9"
const removedColor = "white"

//a list of objects
let cards = []

let firstClickedCard
let secondClickedCard
let clickCount = 0
let canClick = true
let score = 0
let removedCards = 0

//initialize game area
board.style.gridTemplateColumns = `repeat(${size}, 1fr)`
buildBoard()

function buildBoard() {

    resetGame()

    //used in addCardToStack
    const allColorsTwice = colors.concat(colors)

    //create all cards
    for (let i = 0; i < (size * size); i++) {

        addCardToStack(i)
        addCardToDom(i)
        makeCardClickable(i)
    }

    function resetGame() {
        document.querySelector('.number-span').innerHTML = "0"
        document.querySelector('.play-again-button').style.display = "none"
        cards = []
        document.querySelectorAll(".card").forEach(e => e.remove())
        removedCards = 0
        score = 0
    }

    function addCardToStack(i) {
        const colorIndex = Math.floor(Math.random() * allColorsTwice.length)

        cards.push({
            color: allColorsTwice[colorIndex],
            index: i,
            id: `card${i}`,
            removed: false,
            clicked: false
        })

        allColorsTwice.splice(colorIndex, 1)
    }

    function addCardToDom(i) {
        const circle = document.createElement("button")
        board.appendChild(circle)
        circle.classList.add("card")
        circle.setAttribute("id", cards[i].id)
    }

    function makeCardClickable(i) {
        document.getElementById(cards[i].id).addEventListener("click", function () {
            if (canClick &&
                cards[i].removed === false &&
                cards[i].clicked === false) {
                onCardClick(i, cards[i].id)
            }
        })
    }
}

function resetCards() {
    document.getElementById(firstClickedCard.id).style.backgroundColor = defaultColor
    document.getElementById(secondClickedCard.id).style.backgroundColor = defaultColor
    firstClickedCard.clicked = false
    canClick = true
    clickCount = 0
}

function removeCards() {
    cards[firstClickedCard.index].removed = true
    document.getElementById(firstClickedCard.id).style.backgroundColor = removedColor
    cards[secondClickedCard.index].removed = true
    document.getElementById(secondClickedCard.id).style.backgroundColor = removedColor
    canClick = true
    clickCount = 0
    removedCards += 2

    if (removedCards >= size * size) {
        gameOver()
    }
}

function checkResult() {

    if (firstClickedCard.color === secondClickedCard.color) {
        score += 1
        setTimeout(removeCards, 2000)
    } else {
        score -= 1
        setTimeout(resetCards, 2000)
    }

    document.querySelector('.number-span').innerHTML = score.toString()
}

function onCardClick(index, id) {

    document.getElementById(id).style.backgroundColor = cards[index].color

    if (clickCount < 1) {
        firstClickedCard = cards[index]
        firstClickedCard.clicked = true
        clickCount++
    } else {
        secondClickedCard = cards[index]
        checkResult()
        canClick = false
    }
}

function gameOver() {
    document.querySelector('.number-span').innerHTML = "Wow du fick " + score.toString()
    document.querySelector('.play-again-button').style.display = "block"
}