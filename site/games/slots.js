
const symbols = ["🍒", "🍋", "🔔", "⭐", "🍀", "🪩", "7"];

function spinSlots() {
    document.getElementById("slots-result").textContent = "";
    document.getElementById("slots-spin").onclick = null;

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
        } else {
            resultText.textContent = "lmao no";
        }
    }, 1000);
    
    document.getElementById("slots-spin").onclick = spinSlots;
}
