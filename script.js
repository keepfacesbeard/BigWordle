//Build Boards
const allTheWords = ["matador", "mountie", "amounts"];
const theAnswer = "matador";

const wordboard = document.getElementById('wordboard');
let activeTile = 0;
let activeRow = 1;

function buildWordBoard() {
    for (let i =0; i<42; i++){
        let tile = document.createElement('div');
        tile.classList.add('tile');
        tile.id = `tile${i}`;
        tile.innerText = ' ';
        wordboard.appendChild(tile);
    }
 }

 buildWordBoard();

 const keyboard = document.getElementById('keyboard');

 function addLetter(e) {
    let letter = String.fromCharCode(e.keyCode);
    let endOfRow = activeRow * 6 + (activeRow-1);
    if (activeTile <= endOfRow && isLetter(letter)){
        let currentTile = document.getElementById(`tile${activeTile}`);
        currentTile.innerText = letter;
        ++activeTile;
    }
    else if (e.keyCode == 13) {
        let newGuess = checkGuess(activeRow);
     
    }
    else if (e.keyCode == 8){
        --activeTile
        let currentTile = document.getElementById(`tile${activeTile}`);
        currentTile.innerText = '';
        
    }
    // if (e.repeat) return;
    // const key = document.querySelector(`.key[data-key="${e.keyCode}"]`); //.key because key is class
    // if(!audio) return;
    // audio.currentTime = 0; //rewinds
    // audio.play();
    // key.classList.add('playing'); //adds styling when selected but doesn't remove it
    
  };
  function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
   // console.log(this);  //this refers to the key, back from the arrow function call key.addeventlistener
    this.classList.remove('playing');
   // console.log(this);
  }
 // setTimeout(playSound, 1000);
  window.addEventListener('keydown', addLetter);
  window.addEventListener('click', addLetter);


//popup 
const modal = document.getElementById("popup");
const popup = document.getElementById("popuptext");

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 










//GUESS Functions
 function checkGuess(row){
     //row index starts at 1
    let rangeMin = ((row-1)*7);
    let rangeMax = row * 6 + (row-1);
    let guess =""
    for (let i=rangeMin; i<=rangeMax; i++){
         let letter = document.getElementById(`tile${i}`).innerText;
         guess += letter;
    }
    guess = guess.toLowerCase();
    console.log('is ' + guess +' a valid word?');
    if (guess.length == 7 && allTheWords.includes(guess) == true){
        console.log('the valid guess is ' + guess);
        checkLetters(guess);
        ++activeRow
    }
 }
 function checkLetters(guess){
     let correctLetters = 0
     for (let i=0; i<7; i++){
         let tileIndex = ((activeRow-1)*7) + i;
         if (guess[i] == theAnswer[i]){
            document.getElementById(`tile${tileIndex}`).classList.add('inplace');
            ++correctLetters;
            if (correctLetters == 7){
                // alert("You won with " + activeRow + " guesses");
                popup.innerText = `You won with ${activeRow} guesses.`;
                modal.style.display = "block";
                break;
            }
         }
         else {
            for (let n=0; n<7; n++){
                if (guess[i] == theAnswer[n] && n !== i){
                    document.getElementById(`tile${tileIndex}`).classList.add('inword');
                }
            }
         }
    }
    if (activeRow == 6 && correctLetters < 7){
        alert("You lost. Sorry. Better luck tomorrow.");
    }
}
 

    
function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
  }


  //modal test

  // Get the modal
