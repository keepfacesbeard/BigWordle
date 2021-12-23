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
    let letter = ''
    let endOfRow = activeRow * 6 + (activeRow-1);
    if (e.target.id && document.getElementById(e.target.id).className == 'keyboardkey'){
        letter = e.target.id;
    }
    else {
        letter = String.fromCharCode(e.keyCode);
    }
    //letters
    if (activeTile <= endOfRow && letter.length < 2 && isLetter(letter)){
        let currentTile = document.getElementById(`tile${activeTile}`);
        currentTile.innerText = letter;
        ++activeTile;
    }
    //enter
    else if (e.keyCode == 13 || letter == 'enter') {
        let newGuess = checkGuess(activeRow);
     
    }
    //backspace
    else if (e.keyCode == 8 || letter == 'delete'){
        if (activeTile > endOfRow - 6){
            --activeTile
        }
        let currentTile = document.getElementById(`tile${activeTile}`);
        currentTile.innerText = ' ';
    }
    // if (e.repeat) return;
    // const key = document.querySelector(`.key[data-key="${e.keyCode}"]`); //.key because key is class
    // if(!audio) return;
    // audio.currentTime = 0; //rewinds
    // audio.play();
    // key.classList.add('playing'); //adds styling when selected but doesn't remove it
    
  };

window.addEventListener('keydown', addLetter);
window.addEventListener('click', addLetter);


//popup
const mainContainer = document.getElementById('main');
function popupModal(text){
    const modal = document.createElement('div');
    modal.id = 'popup';
    modal.classList.add('modal');
    mainContainer.appendChild(modal);
    const modalcontent = document.createElement('div');
    modalcontent.classList.add('modal-content');
    modal.appendChild(modalcontent);
    const xbutton = document.createElement('span');
    xbutton.classList.add('close');
    xbutton.id = 'closebutton';
    xbutton.innerText = 'X'
    modalcontent.appendChild(xbutton);
    const popup = document.createElement('div');
    popup.id = 'popuptext';
    modalcontent.appendChild(popup);
    popup.innerText = `\n${text}`;
    xbutton.onclick = function() {
        modal.remove();
        event.stopPropagation();
        // window.addEventListener('keydown', addLetter);
        // window.addEventListener('click', addLetter);
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
    if (guess.length == 7 && allTheWords.includes(guess) == true){
        checkLetters(guess);
        ++activeRow
    }
    else {
        popupModal(guess.toUpperCase() + "  is not a valid word. Try again.");

    }
 }
 function checkLetters(guess){
     let correctLetters = 0
     for (let i=0; i<7; i++){
         let tileIndex = ((activeRow-1)*7) + i;
        if (guess[i] == theAnswer[i]){
            document.getElementById(`tile${tileIndex}`).classList.add('inplace');
            console.log(guess[i].toUpperCase());
            document.getElementById(guess[i].toUpperCase()).classList.add('inword');
            ++correctLetters;
            if (correctLetters == 7){
                    popupModal(`You won with ${activeRow} guesses.`);
                    window.removeEventListener('keydown', addLetter);
                    window.removeEventListener('click', addLetter);
                    break;  
                }
            }
        else {
            for (let n=0; n<7; n++){
                if (guess[i] == theAnswer[n] && n !== i){
                    document.getElementById(`tile${tileIndex}`).classList.add('inword');
                    document.getElementById(guess[i].toUpperCase()).classList.add('inword');
                }
                else if (Array.from(theAnswer).includes(guess[i]) == false) {
                    document.getElementById(guess[i].toUpperCase()).classList.add('notinword');
                }
            }
        }
        }
    }
    if (activeRow == 6 && correctLetters < 7){
        alert("You lost. Sorry. Better luck tomorrow.");
    }



    
function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
  }


  //modal test

  // Get the modal
