const score = document.querySelector('.score')
const doubleFaces = document.querySelectorAll('.double-face')
const divWin = document.querySelector('.win')
let result = []

let coup = 0
let win = 0

doubleFaces.forEach(doubleFace => doubleFace.addEventListener('click', handleClick))
function handleClick(e) {

    const doubleFace = e.currentTarget
    const attribute = doubleFace.parentElement.dataset.attr

    if (result.length === 2 && result[0].attr !== result[1].attr) {
        result.forEach(r => r.item.classList.remove('active'))
        result = []
    }
    if (!doubleFace.classList.contains('active')) {
        result.push({ item: doubleFace, attr: attribute })
        doubleFace.classList.add('active')
    }

    if (result.length === 2) coup++
    if (result.length === 2 && result[0].attr === result[1].attr) {
        win++
        ifWin()
        result = []
    }

    score.textContent = `Nombre de coups : ${coup}`
}

function ifWin() {
    if (win === doubleFaces.length / 2) {
        console.log('----- YES -----');
        doubleFaces.forEach(doubleFace => doubleFace.removeEventListener('click', handleClick))
        divWin.classList.add('active')
    }
}

document.addEventListener("keydown", restart);
function restart(e) {
    // Vérifiez si la touche enfoncée est la touche espace (la chaîne "Space")
    if (e.key === " ") {
        console.log("La touche espace a été enfoncée !");
        doubleFaces.forEach(doubleFace => doubleFace.classList.remove('active'))
        coup = 0
        win = 0
        score.textContent = `Nombre de coups : ${coup}`
        divWin.classList.remove('active')
        doubleFaces.forEach(doubleFace => doubleFace.addEventListener('click', handleClick))
    }
}