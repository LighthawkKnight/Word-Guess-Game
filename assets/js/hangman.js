// Word/Hint pairing arrays
const word = [  "MOMONGA", "ALBEDO", "NAZARICK", "YGGDRASIL", "DEMIURGE", "PLEIADES", "JALDABAOTH", "SHALLTEAR", 
                "RUBEDO", "BAHARUTH", "STRONOFF", "EVILEYE", "RENNER", "FORESIGHT", "EMMOT", "BUKUBUKUCHAGAMA", 
                "TAKEMIKAZUCHI", "GARGANTUA", "REMEDIOS", "CLEMENTINE", "SUCCULENT", "ZARYUSU", "HAMSUKE"]
const hint = [  "This is Ainz's actual name, whom he was known as back during the game.",
                "The overseer of the floor guardians and is Ainz's second in command",
                "This is the home where Ainz and his guardians live.",
                "This is the name of the game where Ainz and Nazarick originally came from.",
                "The guardian with the 'highest IQ', according to Ainz",
                "The name of Ainz's personal combat maid squad.",
                "The alias coined by Demiurge that appears to be the leader of the demon army by humans.",
                "The 1st-3rd floor guardian of Nazarick that is a true vampire as well as a holy valkyrie.",
                "The strongest entity in Nazarick, who is Albedo's sister.",
                "The empire ruled by Emperor Jircniv Rune Farlord el Nix.",
                "The last name of the Warrior Captain of the Re-Estize Kingdom.",
                "An adamantite ranked adventurer who is the most powerful magic caster of Blue Rose.",
                "The 3rd princess of the Re-Estize kingdom.  A genius with prodigal intellect since youth.",
                "The name of the worker group Arche is a member of.",
                "The family name of the new chief of Carne Village.",
                "The creator of Aura and Mare, who was a voice actress in real life.",
                "The creator of Cocytus, and one of the 41 Supreme Beings.",
                "The 4th floor guardian of Nazarick who is physically the strongest, being a massive construct.",
                "The leader of the Paladin Order of the Roble Holy Kingdom.",
                "A rogue warrior from Zuranon, who would murder adventurers and take their ID plates as trophies.",
                "A member of the Six Arms who uses a fighting style that combines illusion magic and swordplay.",
                "A lizardman who is both a great warrior and highly intelligent.  Wielder of Frost Pain.",
                "Known as the 'Wise King of the Forest' who becomes Momon's mount."]

// test
// const word = ["SUPERLONGASSWORD"];
// const hint = ["debug"];

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
        this.correctWord = cw;      // The correct word to be gussed
        this.currentHint = h;       // The hint for the correct word
        this.wins = w;
        this.lose = l;
        this.guesses = this.calcGuesses(cw.length);   // Number of guesses allowed per attempt
        this.letters = [];      // Array of letters guessed
        this.currentWord = [];  // The displayed word being guessed  
        this.gameOver = false;
    }

    // Starts/Restarts the hangman game
    initializeGame() {
        // Set random word/hint pairing, not equal to the previous one.
        var index;
        do {
            index = Math.floor(Math.random() * word.length);
        } while(word[index] == this.correctWord);

        this.correctWord = word[index];
        this.currentHint = hint[index];
        this.guesses = this.calcGuesses(this.correctWord.length);
        this.letters = [];
        this.gameOver = false;

        // Fill in the word display with underscores
        this.currentWord = [];
        for (var i = 0; i < this.correctWord.length; i++) {
            this.currentWord.push('_');
        }

        // Size adjustment for longer words
        if (this.currentWord.length > 10)
            wordElement.style.fontSize = "35px";

        // Display it all in html
        wordElement.innerHTML = this.currentWord.join(' ');
        hintElement.innerHTML = this.currentHint;
        winsElement.innerHTML = (" " + this.wins);
        loseElement.innerHTML = (" " + this.lose);
        guessElement.innerHTML = (" " + this.guesses);
        lettersGuessedElement.innerHTML = "";
        sysElement.innerHTML = "Game Start"
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
                    // Go through the correct word to find each instance of the letter and display it
                    for (var i = 0; i < this.correctWord.length; i++) {
                        if (this.correctWord[i] == letter)
                            this.currentWord[i] = letter;
                    }                    
                    wordElement.innerHTML = this.currentWord.join(' ');
                }
                else {    // If the letter guessed is incorrect (not in the correct word)
                    // ToDo:  Display a message?  Play some kind of sound?
                }
                this.letters.push(letter);      // Adds letter guessed into end of array
                lettersGuessedElement.innerHTML = this.letters.join(', ');  // Adds leading comma
                this.guesses--;
                guessElement.innerHTML = (" " + this.guesses);

                if (!this.isWin())   // Check win condition, check lose condition if win condition is false
                    this.isLose();
            }
            else {  // If letter has already been guessed
                alert ("Letter already guessed.");
            }
        }
        else {  // If a key that is not a-z has been pressed
            alert("Invalid key.  Please guess a letter between A-Z");
        }
    }

    // Helper function containing formula to calculate guesses allowed
    calcGuesses(wordLength) {
            return Math.floor(wordLength * 1.3);
    }

    // Helper function that checks win condition
    isWin(){    
        if (this.currentWord.indexOf('_') == -1) {      // Works for words with no spaces.  Must change if I want to implement spaces
            // You win message
            //wordElement.innerHTML = this.correctWord;
            //try settimeout here....
            alert("You win!");
            this.wins++;
            winsElement.innerHTML = (" " + this.wins);
            this.gameOver = true;
            return true;
        }
    }

    // Helper function that checks lose condition
    isLose(){   
        if (this.guesses == 0) {
            // Lose message
            alert("You lose");
            this.lose++;
            loseElement.innerHTML = (" " + this.lose);
            this.gameOver = true;
        }
    }

    // Returns a boolean value whether the current round is over or not
    isGameOver() {
        return this.gameOver;
    }

}

//main


var hangman = new Hangman();
hangman.initializeGame();

document.onkeyup = function(event) {
    if (!hangman.isGameOver())
        hangman.guessLetter(event.key);
    else
        hangman.initializeGame();
}









