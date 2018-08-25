// Word/Hint pairing arrays
const word = ["MOMONGA", "NAZARICK", "YGGDRASIL", "DEMIURGE", "PlEADIES"]
const hint = [  "This is Ainz Oal Gown's actual name.", 
                "This is the home where Ainz and his guardians live.",
                "This is the name of the game Overlord's world is based off of.",
                "The guardian with the 'highest IQ', according to Ainz",
                "The name of Ainz's personal combat maid squad."]

// Elements used from html doc
var wordElement = document.getElementById('word');
var hintElement = document.getElementById('hint');
var winsElement = document.getElementById('wins');
var loseElement = document.getElementById('lose');
var lettersGuessedElement = document.getElementById('lettersGuessed');

class Hangman{

    constructor(cw = word[0], h = hint[0], w = 0, l = 0) {        
        this.correctWord = cw;
        this.currentHint = h;
        this.wins = w;
        this.lose = l;
        this.guesses = 13;      // Number of guesses allowed per attempt - change as needed
        this.letters = [];      // Array of letters guessed
        this.currentWord = [];  // The displayed word being guessed  
    }

    setWins(wins) {
        this.wins = wins;
    }

    setLose(lose) {
        this.lose = lose;
    }

    getWins() {
        return this.wins;
    }

    getLose() {
        return this.lose;
    }

    getLetters() {
        return this.letters;
    }

    // Initializes the current word (that needs to be guessed) in underscores
    initializeWord() {
        this.currentWord = [];
        for (var i = 0; i < this.correctWord.length; i++) {
            this.currentWord.push('_');
        }
        wordElement.innerHTML = this.currentWord.join(' ');
        hintElement.innerHTML = this.currentHint;
    }

    // Takes the letter guessed by the user and test it vs the correct word and letters already guessed
    guessLetter(letter) {
        if (letter.charCodeAt(0) <= 122 && letter.charCodeAt(0) >= 97)  // Checks if key pressed is between a-z
        {
            letter = letter.toUpperCase();  // Since the word and letters will be all in upper case
            // Check if letter is already guessed
            if (this.letters.indexOf(letter) == -1) {
                // Checks if the correct word has the letter
                if (this.correctWord.includes(letter)) {    
                    // Go through the correct word to find each instances of the letter and display it
                    for (var i = 0; i < this.correctWord.length; i++) {
                        if (this.correctWord[i] == letter)
                            this.currentWord[i] = letter;
                    }                    
                    wordElement.innerHTML = this.currentWord.join(' ');
                }
                else {    // If the letter guessed is incorrect (not in the correct word)
                    // Display a message?  Play some kind of sound?
                }
                this.letters.push(letter);      // Adds letter guessed into end of array
                lettersGuessedElement.innerHTML = this.letters.join(', ');  // Adds leading comma
                this.guesses--;
                if (!this.isWin())   // Check win condition, check lose condition if win condition is false
                    this.isLose();
            }
            else {
                alert ("Letter already guessed.");
            }
        }
        else {
            alert("Invalid key");
        }
    }

    isWin(){    // Check win condition
        if (currentWord.indexOf('_') === -1) {
            // You win message
            this.wins++;
            return true;
        }
    }

    isLose(){   // Check lose condition
        if (this.guesses);
    }

}

//main                                                      
var index = Math.floor(Math.random() * word.length);       // Set Random starting point
var hangman = new Hangman(word[index], hint[index]);

hangman.initializeWord();
winsElement.textContent += (" " + hangman.wins);
loseElement.textContent += (" " + hangman.lose);

document.onkeyup = function(event) {
    hangman.guessLetter(event.key);
}


// alert(hangman.currentWord + " - " + hangman.currentHint);








