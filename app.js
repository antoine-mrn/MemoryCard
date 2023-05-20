const imagesArray = ["apple", "banana", "brocoli", "cherry", "pepper", "straw", "apple", "banana", "brocoli", "cherry", "pepper", "straw"]

imagesShuffle = fisherYatesShuffle(imagesArray)

function fisherYatesShuffle(arr){
    for(let i =arr.length-1 ; i>0 ;i--){
        const j = Math.floor(Math.random() * (i+1));
        [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr
}

const allCards = document.querySelectorAll(".card")
console.dir(allCards)

function initGame() {
    for(let i = 0; i < imagesShuffle.length; i++) {
        allCards[i].children[1].children[0].src = `./ressources/${imagesShuffle[i]}.svg`
        allCards[i].children[1].children[0].alt = `${imagesShuffle[i]}`
    }
}

allCards.forEach(card => card.addEventListener("click", pickCards))

let cardPicked = []

function pickCards(e) {
    e.target.classList.add("rotate")
    cardPicked.push({target: e.target, image: e.target.children[1].children[0].alt})

    if(cardPicked.length === 2) {
        compareCards()
    }
}

initGame()