const cards = document.querySelectorAll(".card")

function shuffleCards() {
    cards.forEach(card => {
        const randomPos = Math.trunc(Math.random() * 12)
        console.log(randomPos);
        card.style.order = randomPos;
    })
}
shuffleCards()

const score = document.querySelector('.score')
const doubleFaces = document.querySelectorAll('.double-face')
const advice = document.querySelector('.advice');

let cardsPicked = []
let coups = 0
let win = 0

doubleFaces.forEach(doubleFace => doubleFace.addEventListener('click', handleClick))
function handleClick(e) {

    const doubleFace = e.currentTarget
    const attribute = doubleFace.parentElement.dataset.attr

    if (!doubleFace.classList.contains('active')) {
        cardsPicked.push({ item: doubleFace, attr: attribute })
        doubleFace.classList.add('active')
    }
    // If lose
    if (cardsPicked.length === 2 && cardsPicked[0].attr !== cardsPicked[1].attr) {
        doubleFaces.forEach(doubleFace => doubleFace.removeEventListener('click', handleClick))
        cardsPicked.forEach(c => setTimeout(() => {
            c.item.classList.remove('active')
            doubleFaces.forEach(doubleFace => doubleFace.addEventListener('click', handleClick))
        }, 1000))
        coups++
        cardsPicked = []
    }
    // If win
    if (cardsPicked.length === 2 && cardsPicked[0].attr === cardsPicked[1].attr) {
        win++
        if (win === doubleFaces.length / 2) {
            advice.textContent = `Bravo ! Appuyez sur "espace" pour relancer une partie.`
            doubleFaces.forEach(doubleFace => doubleFace.removeEventListener('click', handleClick))
        }
        coups++
        cardsPicked = []
    }
    score.textContent = `Nombre de coups : ${coups}`
}

document.addEventListener("keydown", handleRestart);
function handleRestart(e) {
    if (e.key === " ") {
        doubleFaces.forEach(doubleFace => doubleFace.classList.remove('active'))
        advice.textContent = `Tentez de gagner avec le moins d'essais possible.`
        coups = 0
        win = 0
        score.textContent = `Nombre de coups : ${coups}`
        doubleFaces.forEach(doubleFace => doubleFace.addEventListener('click', handleClick))
        setTimeout(shuffleCards, 600)
    }
}