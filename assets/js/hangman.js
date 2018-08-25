//Word/Hint pairing arrays
const word = ["Momonga", "Nazarick", "Yggdrasil"]
const hint = [  "This is Ainz Oal Gown's actual name.", 
                "This is the home where Ainz and his guardians live.",
                "This is the name of the game Overlord's world is based off of."]

//Elements used from html doc
var wordElement = document.getElementById('word');
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

    // Initializes the current word to guess in underscores
    initializeWord() {
        this.currentWord = [];
        for (var i = 0; i < this.correctWord.length; i++) {
            this.currentWord.push('_');
        }
        wordElement.innerHTML = this.currentWord.join(' ');

    }

    updateGuesses(letter) {
        this.letters.push(letter);      // Adds letter guessed into end of array
        lettersGuessedElement.innerHTML = this.letters.join(', ');  //Adds leading comma
    }

}

//main                                                      
var index = Math.floor(Math.random() * word.length);       // Set Random starting point
var hangman = new Hangman(word[index], hint[index]);

hangman.initializeWord();

document.onkeyup = function(event) {
    hangman.updateGuesses(event.key);
}


winsElement.textContent += (" " + this.wins);
loseElement.textContent += (" " + this.lose);

// alert(hangman.currentWord + " - " + hangman.currentHint);








