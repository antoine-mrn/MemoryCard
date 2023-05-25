const imagesArray = ["apple", "banana", "brocoli", "cherry", "pepper", "straw", "apple", "banana", "brocoli", "cherry", "pepper", "straw"]

imagesShuffle = fisherYatesShuffle(imagesArray)
console.log(imagesShuffle)

function fisherYatesShuffle(arr){
    for(let i =arr.length-1 ; i>0 ;i--){
        const j = Math.floor(Math.random() * (i+1));
        [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr
}

const allCards = document.querySelectorAll(".card")

function initGame() {
    for(let i = 0; i < imagesShuffle.length; i++) {
        allCards[i].children[1].children[0].src = `./ressources/${imagesShuffle[i]}.svg`
        allCards[i].children[1].children[0].alt = `${imagesShuffle[i]}`
        allCards[i].setAttribute("data-attr", imagesShuffle[i])
    }
}

allCards.forEach(card => card.addEventListener("click", pickCards))

let cardPicked = []
let lockReturn = false

function pickCards(e) {
    if(lockReturn || e.target === cardPicked[0]?.target) return

    cardPicked.push({target: e.target, image: e.target.dataset.attr})
    e.target.classList.add("rotate")

    if(cardPicked.length === 2) compareCards(cardPicked)
}

const roundCount = document.querySelector(".round")

let nbRound = 0
let result = 0

function compareCards(cards) {
    lockReturn = true
    nbRound++

    roundCount.textContent = nbRound

    if(cards[0].image === cards[1].image) {
        cards.forEach(card => card.target.removeEventListener("click", pickCards))
        result++
        lockReturn = false
    }
    else {
        setTimeout(() => {
            cards.forEach(card => card.target.classList.remove("rotate"))
            lockReturn = false
        }, 1000);
    }
    cardPicked = []

    roundFinished()
}

const gameDescription = document.querySelector(".game-description")

function roundFinished() {
    if(result === imagesShuffle.length/2) {
        gameDescription.textContent = "Bravo ! Tu as trouvé toutes les paires"
        gameDescription.style.fontWeight = "700"
    }
}

document.addEventListener("keydown", restartGame)

function restartGame(e) {
    if(e.keyCode === 32){
        nbRound = 0
        roundCount.textContent = nbRound
        gameDescription.textContent = "Retrouver les paires de cartes et tenter de gagner avec le moins d'essais possible"
        allCards.forEach(card => card.classList.remove("rotate"))
        allCards.forEach(card => card.addEventListener("click", pickCards))
        fisherYatesShuffle(imagesArray)
    }
}

initGame()