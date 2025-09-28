let deck = [];
let playerHand = [];
let dealerHand = [];
let dealerHiddenCard = null;
let dealerHiddenDiv = null;

function newDeck() {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = [
        { name: 'A', value: 11 },
        { name: '2', value: 2 },
        { name: '3', value: 3 },
        { name: '4', value: 4 },
        { name: '5', value: 5 },
        { name: '6', value: 6 },
        { name: '7', value: 7 },
        { name: '8', value: 8 },
        { name: '9', value: 9 },
        { name: '10', value: 10 },
        { name: 'J', value: 10 },
        { name: 'Q', value: 10 },
        { name: 'K', value: 10 },
    ];
    deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ suit, rank: rank.name, value: rank.value });
        }
    }
    deck = deck.sort(() => Math.random() - 0.5);
}
function dealCard(hand, containerId, hidden = false) {
    const card = deck.pop();
    hand.push(card);

    const cardDiv = document.createElement("div");
    cardDiv.className = "card";

    if (hidden) {
        cardDiv.classList.add("suit-unknown");
        cardDiv.textContent = "?";
        dealerHiddenCard = card;
        dealerHiddenDiv = cardDiv;
    } else {
        cardDiv.innerHTML = `<div>${card.rank}</div><div>${card.suit}</div>`;
        if (card.suit === '♥' || card.suit === '♦') {
            cardDiv.style.color = 'var(--brightRed)';
        }
    }

    document.querySelector(containerId + " .hand").appendChild(cardDiv);
    document.getElementById("player-score").textContent = handValue(playerHand);
}
function handValue(hand) {
    let value = hand.reduce((acc, c) => acc + c.value, 0);
    let aces = hand.filter(c => c.rank === "A").length;
    while (value > 21 && aces > 0) {
        value -= 10;
        aces--;
    }
    return value;
}
function newGameButton() {
    new_game_button = document.createElement("button");
    new_game_button.textContent = "New Game";
    new_game_button.onclick = startBlackjack;
    new_game_button.className = "new-game-button";
    document.getElementById("new-game-button-container").appendChild(new_game_button);
}
function startBlackjack() {
    if (!incrementMoney(-50)) return;

    document.getElementById("new-game-button-container").innerHTML = "";
    newDeck();
    playerHand = [];
    dealerHand = [];
    dealerHiddenCard = null;
    dealerHiddenDiv = null;
    document.querySelector("#blackjack-dealer-content .hand").innerHTML = "";
    document.querySelector("#blackjack-player-content .hand").innerHTML = "";
    document.querySelector("#blackjack-result").textContent = "";

    document.querySelector("#dealer-score").textContent = "?";
    document.querySelector("#player-score").textContent = "0";

    dealCard(dealerHand, "#blackjack-dealer-content", true);
    dealCard(dealerHand, "#blackjack-dealer-content");

    dealCard(playerHand, "#blackjack-player-content");
    dealCard(playerHand, "#blackjack-player-content");
    document.querySelector("#player-score").textContent = handValue(playerHand);

    document.querySelector(".blackjack-controls").style.display = "block";
}
function hit() {
    dealCard(playerHand, "#blackjack-player-content");
    if (handValue(playerHand) > 21) {
        document.querySelector("#blackjack-result").textContent = "You busted!";
        document.querySelector(".blackjack-controls").style.display = "none";
        newGameButton();
    }
}
async function stand() {

    if (dealerHiddenCard && dealerHiddenDiv) {
        dealerHiddenDiv.classList.remove("suit-unknown");
        dealerHiddenDiv.textContent = "";
        dealerHiddenDiv.innerHTML = `<div>${dealerHiddenCard.rank}</div><div>${dealerHiddenCard.suit}</div>`;
        dealerHiddenCard = null;
    }

    while (handValue(dealerHand) < 17 && handValue(dealerHand) < handValue(playerHand)) {
        await new Promise(r => setTimeout(r, 800));
        dealCard(dealerHand, "#blackjack-dealer-content");
    }
    document.querySelector(".blackjack-controls").style.display = "none";

    document.querySelector("#dealer-score").textContent = handValue(dealerHand);
    const playerVal = handValue(playerHand);
    const dealerVal = handValue(dealerHand);
    let result = "";
    if (playerVal > 21) result = "You busted!";
    else if (dealerVal > 21 || playerVal > dealerVal) result = "You win!";
    else if (playerVal < dealerVal) result = "Dealer wins!";
    else result = "Push!";
    if (result === "You win!") incrementMoney(100);
    else if (result === "Push!") incrementMoney(50);
    document.querySelector("#blackjack-result").textContent = result;
    newGameButton();
}
