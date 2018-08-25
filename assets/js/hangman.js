const word = ["const1", "const2", "const3", "const4"];
const hint = ["", ""]

class Hangman{

    // Overloaded: use string(word), number(wins)
    constructor(currentWord = "test", wins = 0, lose = 0) {        
        this.currentWord = currentWord;
        this.wins = wins;
        this.lose = lose;
    }

    setWins(wins){
        this.wins = wins;
    }

    setWord(currentWord) {
        this.currentWord = currentWord;
    }

}

var hangman = new Hangman(lose = 2, wins = 5);
alert(hangman.currentWord);
hangman.setWord(prompt("Set new word."));
alert(hangman.currentWord);
alert(hangman.wins + " " + hangman.lose);




