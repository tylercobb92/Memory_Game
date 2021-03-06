const startButton = document.getElementById("start");
const restartButton = document.getElementById("restart");
const gameOver = document.getElementById("gameover");
let score = 0;
let lowscore;
let theChamp = document.getElementById("lowscore")

function startGame() {

    if (localStorage.lowscore) {
        theChamp.innerText = "Low Score: " + localStorage.lowscore;
    }
    const gameContainer = document.getElementById("game");

    const COLORS = [
        "red",
        "blue",
        "green",
        "orange",
        "purple",
        "red",
        "blue",
        "green",
        "orange",
        "purple",
        "yellow",
        "yellow"
    ];

    // here is a helper function to shuffle an array
    // it returns the same array with values shuffled
    // it is based on an algorithm called Fisher Yates if you want ot research more
    function shuffle(array) {
        let counter = array.length;
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);
            // Decrease counter by 1
            counter--;
            // And swap the last element with it
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }

    let shuffledColors = shuffle(COLORS);
    // this function loops over the array of colors
    // it creates a new div and gives it a class with the value of the color
    // it also adds an event listener for a click for each card
    function createDivsForColors(colorArray) {
        for (let color of colorArray) {
            // create a new div
            const newDiv = document.createElement("div");
            // give it a class attribute for the value we are looping over
            newDiv.classList.add(color);
            // call a function handleCardClick when a div is clicked on
            newDiv.addEventListener("click", handleCardClick);
            // append the div to the element with an id of game
            gameContainer.append(newDiv);
        }
    }

    document.getElementById("scoreboard").textContent = "Score: " + 0
    let cardOne
    let cardTwo
    function noMatch() {
        cardOne.style.backgroundColor = "white";
        cardTwo.style.backgroundColor = "white";
        cardOne = undefined;
        cardTwo = undefined;
    }

    // TODO: Implement this function!
    function handleCardClick(e) {
        if (!cardOne && !cardTwo && !e.target.classList.contains("matched")) {
            e.target.style.backgroundColor = e.target.className;
            cardOne = e.target;
        } else if (cardOne && !cardTwo) {
            e.target.style.backgroundColor = e.target.className;
            cardTwo = e.target;
        }

        if (cardOne && cardTwo) {
            if (cardOne.style.backgroundColor === cardTwo.style.backgroundColor) {
                cardOne.classList.add("matched");
                cardTwo.classList.add("matched");
                score += 1;
                document.getElementById("scoreboard").textContent = "Score: " + score
                cardOne = undefined;
                cardTwo = undefined;
                if (COLORS.length === document.querySelectorAll(".matched").length) {
                    if (!localStorage.lowscore) {
                        localStorage.setItem("lowscore", score);
                        theChamp.innerText = "Low Score: " + localStorage.lowscore;
                    } else if (score < localStorage.lowscore) {
                        localStorage.setItem("lowscore", score);
                        theChamp.innerText = "Low Score: " + localStorage.lowscore;
                    }
                    restartButton.style.display = "block";
                    restartButton.style.opacity = 1;
                    gameOver.style.display = "block";
                    gameOver.style.opacity = 1;
                    gameContainer.style.opacity = .5;
                }
            } else if (cardOne.style.backgroundColor != cardTwo.style.backgroundColor) {
                setTimeout(noMatch, 1000);
                score += 1;
                document.getElementById("scoreboard").textContent = "Score: " + score
            }
        }
    }

    // when the DOM loads
    createDivsForColors(shuffledColors);
}

startButton.addEventListener("click", function () {
    startButton.style.display = "none";
    startGame();
});

restartButton.addEventListener("click", function () {
    let oldGame = document.getElementById("game");
    while (oldGame.firstChild) {
        oldGame.removeChild(oldGame.firstChild)
    }
    score = 0;
    startGame();
    restartButton.style.display = "none";
    gameOver.style.display = "none";
});