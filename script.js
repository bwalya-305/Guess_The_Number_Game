let randomNumber;
let attempts = 0;
let highScore = localStorage.getItem("highScore") || "-";
let timer;

function generateRandomNumber() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
}

function startTimer() {
    let totalSeconds = 0;
    timer = setInterval(() => {
        totalSeconds++;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        
        const timerElement = document.getElementById("timer");
        if (minutes > 0) {
            timerElement.textContent = `Time: ${minutes} min ${seconds} sec`;
        } else {
            timerElement.textContent = `Time: ${seconds} sec`;
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function displayMessage(message, color) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
    messageElement.style.color = color;
}

function checkGuess() {
    const guessElement = document.getElementById("guess");
    const attemptsElement = document.getElementById("attempts");

    const userGuess = parseInt(guessElement.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        displayMessage("Please enter a valid number between 1 and 100.", "red");
    } else {
        attempts++;

        if (userGuess === randomNumber) {
            displayMessage(`Congratulations! You guessed the number ${randomNumber} in ${attempts} attempts.`, "green");
            guessElement.disabled = true;
            stopTimer();

            if (highScore === "-" || attempts < highScore) {
                highScore = attempts;
                localStorage.setItem("highScore", highScore);
                document.getElementById("highScore").textContent = `High Score: ${highScore} attempts`;
            }
        } else if (userGuess < randomNumber) {
            displayMessage("Too low! Try again.", "orange");
        } else {
            displayMessage("Too high! Try again.", "orange");
        }

        attemptsElement.textContent = `Attempts: ${attempts}`;
        guessElement.value = "";
        guessElement.focus();
    }
}


function startGame() {
    generateRandomNumber();
    startTimer();
    document.getElementById("highScore").textContent = `High Score: ${highScore} attempts`;
    document.getElementById("startButton").style.display = "none"; // Hide the start button
    document.getElementById("stopButton").style.display = "inline-block"; // Show the stop button
}

function stopGame() {
    clearInterval(timer);
    document.getElementById("stopButton").style.display = "none"; // Hide the stop button
    document.getElementById("startButton").style.display = "inline-block"; // Show the start button
}

function restartGame() {
    const guessElement = document.getElementById("guess");
    guessElement.disabled = false;
    displayMessage("", ""); // Clear the message
    document.getElementById("attempts").textContent = "";

    // Clear the timer interval
    clearInterval(timer);

    // Reset the timer display to "Time: 0 sec"
    document.getElementById("timer").textContent = "Time: 0 sec";

    guessElement.value = "";
    attempts = 0;
    generateRandomNumber();
    startTimer(); // Start a new timer
}