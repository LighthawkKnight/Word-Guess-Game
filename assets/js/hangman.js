// Word/Hint pairing arrays
const word = ["MOMONGA", "NAZARICK", "YGGDRASIL", "DEMIURGE", "PLEADIES"]
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
var guessElement = document.getElementById('guesses');
var lettersGuessedElement = document.getElementById('lettersGuessed');
var sysElement = document.getElementById('sysMessage');

class Hangman{

    constructor(cw = "Overlord", h = "This page's theme!", w = 0, l = 0) {        
        this.correctWord = cw;
        this.currentHint = h;
        this.wins = w;
        this.lose = l;
        this.guesses = 14;       // Number of guesses allowed per attempt
        this.letters = [];      // Array of letters guessed
        this.currentWord = [];  // The displayed word being guessed  
    }

    // Starts/Restarts the hangman game
    initializeGame() {
        // Set random word/hint pairing
        var index = Math.floor(Math.random() * word.length);
        this.correctWord = word[index];
        this.currentHint = hint[index];
        this.guesses = this.calcGuesses(this.correctWord.length);
        this.letters = [];

        // Fill in the word display with underscores
        this.currentWord = [];
        for (var i = 0; i < this.correctWord.length; i++) {
            this.currentWord.push('_');
        }

        // Display it all in html
        wordElement.innerHTML = this.currentWord.join(' ');
        hintElement.innerHTML = this.currentHint;
        winsElement.innerHTML = (" " + this.wins);
        loseElement.innerHTML = (" " + this.lose);
        guessElement.innerHTML = (" " + this.guesses);
        lettersGuessedElement.innerHTML = "";
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
                guessElement.innerHTML = this.guesses;

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

    // Helper function containing formula to calculate guesses allowed - can change if needed
    calcGuesses(wordLength) {
        return Math.floor(wordLength * 1.3);
    }

    // Helper function that checks win condition
    isWin(){    
        if (this.currentWord.indexOf('_') == -1) {      // Works for words with no spaces.  Must change if it has spaces
            // You win message
            //wordElement.innerHTML = this.correctWord;
            //try settimeout here....
            alert("You win!");
            this.wins++;
            this.initializeGame();
            return true;
        }
    }

    // Helper function that checks lose condition
    isLose(){   
        if (this.guesses == 0) {
            // Lose message
            alert("You lose");
            this.lose++;
            this.initializeGame();
        }
    }

}

//main                                                      
var hangman = new Hangman();
hangman.initializeGame();

document.onkeyup = function(event) {
    hangman.guessLetter(event.key);
}








