let prevCard = undefined;
let pickedCardsArr = []
let thisCard = undefined
let time = 500
let wrongPickCount = 0

//board items array
const boardItems = ['build', 'alarm', 'copyright', 'pan_tool', 'verified_user', 'track_changes', 'stars', 'search']
boardItems.push(...boardItems)

let moves = 0
let stars = 3


//shuffled board will be stored in this array
let generatedBoard = []

let completed = 0
let seconds = 0

//timer function to countdown seconds from the start of a new game
const timerFunc = () => {
  ++seconds
  document.getElementById('time-elapsed').innerHTML = `Time elapsed: ${seconds} seconds`

}

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

// board generator function
const boardGenerator = () => {
  //shuffling the board using shuffle function
  const shuffledArr = shuffle(boardItems)
  for (let i = 0; i < 16; i++) {
    generatedBoard[i] = shuffledArr[i]
  }
}

//function for inserting star icons
const insertStars = () => {
  const starArr = []
  for (let j = 0; j < 3; j++) {
    let starElement = document.createElement('i')
    starElement.setAttribute('class', 'material-icons')
    starElement.setAttribute('id', 'star')
    starElement.textContent = 'stars'
    starArr.push(starElement)
  }
  for (let i = 0; i < 3; i++) {
    document.getElementById('rating').appendChild(starArr[i])
  }
}

// function for inserting to html generated board items
const insertBoardItems = () => {
  insertStars()
  let container = document.createElement('div')
  for (let i = 0; i < 16; i++) {
    let listElement = document.createElement('div')
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

//function for decreasing rating
const deleteStar = () => {
  let starElement = document.getElementById('rating').firstChild
  if (wrongPickCount > 10 && stars === 3) {
    document.getElementById('rating').removeChild(starElement)
    stars = 2
  } else if (wrongPickCount > 15 && stars === 2) {
    document.getElementById('rating').removeChild(starElement)
    stars = 1
  }
}

//shuffling and adding the board to html
const addBoard = () => {
  if (!document.querySelector('div.deck')) {
    (() => {
      // starting the timer
      timer = window.setInterval(timerFunc, 1000)
    })()
  }
  if (document.querySelector('div.deck')) {
    const result = confirm('do you want to start a new game?')
    if (result) {
      //resetting stars
      document.getElementById('rating').innerHTML = '';
      (() => {
        //removing the timer
        window.clearInterval(timer)
      })();
      seconds = 0;
      (() => {
        // starting the timer
        timer = window.setInterval(timerFunc, 1000)
      })();
      //resetting pickedCardArr to initial state
      pickedCardsArr = []
      document.querySelector('div.deck').remove()
      moves = 0;
      stars = 3;
      completed = 0;
      document.getElementById('moves').innerText = 'Moves: 0'
      document.getElementById('time-elapsed').innerHTML = 'Time elapsed: 0';
    } else {
      return
    }
  }

  // setting difficulty level
  if (document.getElementById('easy').checked) {
    time = 1500
  } else if (document.getElementById('medium').checked) {
    time = 1000
  } else {
    time = 500
  }

  //generate a board
  boardGenerator()

  //insert to html generated board
  insertBoardItems()
}
//pick card and compare to the other pick
const pickCard = (e) => {
  if (e.target.firstChild.style === undefined) {
    return
  }
  if (e.target.classList.contains('flipInY')) {
    return
  }
  if (pickedCardsArr.length === 2) {
    return
  }
  thisCard = e.target.firstChild
  e.target.classList.add('animated', 'flipInY')
  thisCard.style.cssText = 'visibility: visible'
  pickedCardsArr.push(e.target)
  if (pickedCardsArr.length === 2) {
    moves++
    document.getElementById('moves').innerText = `Moves: ${moves}`
    e.target.classList.add('animated', 'flipInY')
    if (thisCard.innerHTML !== pickedCardsArr[0].firstChild.innerHTML) {
      wrongPickCount++
      deleteStar()
      setTimeout(() => {
        e.target.classList.remove('animated', 'shake', 'pulse', 'flipInY')
        pickedCardsArr[0].classList.remove('animated', 'shake', 'pulse', 'flipInY')
        e.target.classList.add('animated', 'shake')
        thisCard.style.cssText = 'visibility: hidden';
        pickedCardsArr[0].classList.add('animated', 'shake')
        pickedCardsArr[0].firstChild.style.cssText = 'visibilty: hidden';
        pickedCardsArr = []
      }, time);
    } else {
      completed++
      document.getElementById('moves').innerText = `Moves: ${moves}`
      if (completed === 8) {
        let starWord;
        (() => {
          //removing the timer
          window.clearInterval(timer)
        })();
        if (stars === 1) {
          starWord = 'star'
        } else {
          starWord = 'stars'
        }
        const result = confirm(`congratulations you did it in ${moves} moves and ${seconds} seconds. Your rating is ${stars} ${starWord}. \n
        Press 'OK' to start a new game or press 'Cancel' to exit`);
        pickedCardsArr = []
        moves = 0;
        completed = 0;
        seconds = 0;
        document.getElementById('moves').innerText = 'Moves: 0'
        document.getElementById('time-elapsed').innerHTML = 'Time elapsed: 0'
        document.querySelector('div.deck').remove();
        document.getElementById('rating').innerHTML = '';
        if (result) {
          (() => {
            //removing the timer
            window.clearInterval(timer)
          })();
          addBoard()
        } else {
          (() => {
            //removing the timer
            window.clearInterval(timer)
          })();
        }
        return
      }
      e.target.classList.remove('animated', 'shake', 'pulse', 'flipInY')
      pickedCardsArr[0].classList.remove('animated', 'shake', 'pulse', 'flipInY')
      e.target.classList.add('animated', 'pulse');
      pickedCardsArr[0].classList.add('animated', 'pulse')
      pickedCardsArr = []
    }
  }
}