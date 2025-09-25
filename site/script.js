function gamble(gameName) {
    document.querySelectorAll(".game").forEach(g => g.style.display = "none");
    document.getElementById(gameName).style.display = "block";
    if (gameName === "blackjack") startBlackjack();
    
}