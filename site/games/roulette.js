let currentRotation = 0;
let spinning = false;
function spinRoulette() {
    if (spinning) return;
    else spinning = true;
    if (!incrementMoney(-50)) return;
    document.getElementById("roulette-result").innerText = "Spinning...";
    const wheelContainer = document.getElementById("roulette-wheel-container");
    const wheel = document.getElementById("roulette-wheel");

    const bet = document.querySelector('input[name="roulette-bet"]:checked').value;

    const randomDegree = Math.floor(Math.random() * 120) * 30 + 1080;
    currentRotation += randomDegree;
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    let result = "Lose!";
    let resultColour = null;
    if (currentRotation % 60 === 0) resultColour = "red";
    if (currentRotation % 60 === 30) resultColour = "black";
    if (bet === resultColour) result = "Win!";

    setTimeout(() => {
        document.getElementById("roulette-result").innerText = "You " + result;
        if (result == "Win!") incrementMoney(100);
        spinning = false;
    }, 4000);
}
