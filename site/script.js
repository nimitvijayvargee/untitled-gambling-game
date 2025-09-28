let money = 1000;
document.getElementById("balance").innerText = `Balance: $${money}`;

function gamble(gameName) {
    document.querySelectorAll(".game").forEach(g => g.style.display = "none");
    document.getElementById(gameName).style.display = "block";
}

function incrementMoney(amount) {
    money += amount;
    if (money < 0) {
        money -= amount;
        document.getElementById("balance").style.color = "var(--brightRed)";
        alert("broke ass get rich first (refresh to reset balance)");
        return false
    }
    document.getElementById("balance").style.color = "var(--black)";
    document.getElementById("balance").innerText = `Balance: $${money}`;
    return true
}

function getBalance() { return money }