let correctPick = true;
let prevCard = undefined;
let counter = 0;
let pickedCardsArr = []
let thisCard = undefined

// function to shuffle an array to make it random, found from
//https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php
const shuffle = (arra1) => {
  let ctr = arra1.length;
  let temp;
  let index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
}

const boardItems = ['build', 'build', 'alarm', 'alarm', 'copyright', 'copyright', 'pan_tool', 'pan_tool', 'verified_user', 'verified_user', 'track_changes', 'track_changes', 'stars', 'stars', 'search', 'search']
let stars = 3
let moves = 0
let time = 0
let generatedBoard = []

const boardGenerator = () => {
  const shuffledArr = shuffle(boardItems)
  for (let i = 0; i < 16; i++) {
    generatedBoard[i] = shuffledArr[i]
  }
}
const addBoard = () => {
  boardGenerator()
  let container = document.createElement('ul')
  for (let i = 0; i < 16; i++) {
    let listElement = document.createElement('li')
    let iconElement = document.createElement('i')
    iconElement.setAttribute('class', 'material-icons')
    iconElement.textContent = generatedBoard[i]
    listElement.setAttribute('class', 'card')
    listElement.appendChild(iconElement)
    listElement.addEventListener('click', pickCard)
    container.appendChild(listElement)
  }
  container.setAttribute('class', 'deck')
  document.getElementById('app').appendChild(container)
}

const pickCard = (e) => {
  thisCard = e.target.firstChild
  thisCard.style.cssText = 'visibility: visible'
  pickedCardsArr.push(e.target)
  if (pickedCardsArr.length === 2) {
    e.target.classList.remove('animated', 'shake', 'pulse')
    pickedCardsArr[0].classList.remove('animated', 'shake', 'pulse')
    if (thisCard.innerHTML !== pickedCardsArr[0].firstChild.innerHTML) {
      setTimeout(() => {
        e.target.classList.add('animated', 'shake')
        thisCard.style.cssText = 'visibility: hidden';
        pickedCardsArr[0].classList.add('animated', 'shake')
        pickedCardsArr[0].firstChild.style.cssText = 'visibilty: hidden';
        pickedCardsArr = []
      }, 500)
    } else {
      e.target.classList.add('animated', 'pulse');
      pickedCardsArr[0].classList.add('animated', 'pulse')
      pickedCardsArr = []
    }
  }
}