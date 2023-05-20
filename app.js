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
    }
}

allCards.forEach(card => card.addEventListener("click", pickCards))

let cardPicked = []
let lockReturn = false

function pickCards(e) {
    if(lockReturn) return

    cardPicked.push({target: e.target, image: e.target.children[1].children[0].alt})
    e.target.classList.add("rotate")

    if(cardPicked.length === 2 && !lockReturn) {
        lockReturn = true
        compareCards(cardPicked)
    }
}

const roundCount = document.querySelector(".round")
console.log(roundCount)

let nbRound = 0
let result = 0

function compareCards(cards) {
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
}

initGame()