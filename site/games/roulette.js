let currentRotation = 0;
function spinRoulette() {
    document.getElementById("roulette-spin").onclick = null;
    document.getElementById("roulette-result").innerText = "Spinning...";
    const wheelContainer = document.getElementById("roulette-wheel-container");
    const wheel = document.getElementById("roulette-wheel");

    const bet = document.querySelector('input[name="roulette-bet"]:checked').value;
    console.log(bet);

    resultNumber = 13
    while (resultNumber === 13) resultNumber = 1 + Math.floor(Math.random() * 12);

    const randomDegree = resultNumber * 30 + 360 * 8;
    currentRotation += randomDegree
    console.log(currentRotation , randomDegree);
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    let result = "Lose!";
    if ([1,3,5,7,9,11].includes(resultNumber)) resultNumber = "black";
    if ([2,4,6,8,10,12].includes(resultNumber)) resultNumber = "red";
    if (bet === resultNumber) result = "Win!";
    console.log(resultNumber);  

    setTimeout(() => {
        document.getElementById("roulette-result").innerText = "You " + result;
    }, 4000);

    document.getElementById("roulette-spin").onclick = spinRoulette;
}
