
const symbols = ["🍒", "🍋", "🔔", "⭐", "🍀", "🪩"];
let spinnning = false;
function spinSlots() {
    if (spinnning) return;
    if (!incrementMoney(-10)) return;
    spinnning = true;
    document.getElementById("slots-result").textContent = "";

    const reels = [
        document.getElementById("reel1"),
        document.getElementById("reel2"),
        document.getElementById("reel3"),
    ];
    const resultText = document.getElementById("slots-result");

    const results = reels.map(
        reel => symbols[Math.floor(Math.random() * symbols.length)]
    );

    reels.forEach((reel, i) => {
        reel.textContent = ":)";
        setTimeout(() => {
            reel.textContent = results[i];
        }, 300 * (i + 1));
    });

    setTimeout(() => {
        if (results.every(sym => sym === results[0])) {
            resultText.textContent = "gg";
            incrementMoney(300); //30x win
        } else {
            resultText.textContent = "lmao no";
        }

        spinnning = false;
    }, 1000);

    document.getElementById("slots-spin").onclick = spinSlots;
}
