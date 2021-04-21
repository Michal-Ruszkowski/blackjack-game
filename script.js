const container = document.getElementById("container");
const yes = new Audio(src = "audio/yes.wav"); //from https://freesound.org/people/gnuoctathorpe/sounds/404868/
const no = new Audio(src = "audio/no.mp3"); //from https://freesound.org/people/Gronkjaer/sounds/554053/
const winner = new Audio(src = "audio/winner.mp3"); //from https://freesound.org/people/FunWithSound/sounds/456966/
const loser = new Audio(src = "audio/loser.mp3"); //from https://freesound.org/people/Wagna/sounds/242208/

document.getElementById("game").addEventListener("click", function () {
	startBlackjack()
	document.querySelector("footer").innerHTML = document.querySelector("footer").innerHTML + '<div>Icons made by <a href="https://www.flaticon.com/authors/alfredo-hernandez" title="Alfredo Hernandez">Alfredo Hernandez</a>, <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a>, <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>';
})

function startBlackjack(){
	playerCash = 1000;
	container.style.backgroundColor = "#000";
	container.innerHTML = `<div id="currentBetBoard">stawka: </div><div id="buttons"><input type="button" id="exit"class="submit" onclick="endBlackjack()" value="Zakończ grę"/><input type="button" id="insurance" class="submit" onclick="insurance()" value="Ubezpieczenie"/><input type="button" id="split" class="submit" onclick="split()" value="Rozdzielenie"/><input type="button" id="double" class="submit" onclick="double()" value="Podwajam stawkę"/><input type="button" id="stand" class="submit" onclick="stand()" value="Nie dobieram"/><input type="button" id="hit" class="submit" onclick="hit()" value="Dobieram"/><input type="button" id="deal" class="submit" onclick="deal()" value="Obstaw"/></div><div id="blackjackBoard"><div id="dealerScore"></div><div id="dealerBoard"></div><div id="blackjackResult">result</div><div id="playerScore"></div><div id="playerBoard"></div></div><div id="betsBoard"><div id="bet5" class="bets">5</div><div id="bet10" class="bets">10</div><div id="bet25" class="bets">25</div><div id="bet50" class="bets">50</div><div id="bet100" class="bets">100</div></div><div id="playerCashBoard">Twoje środki: ${playerCash}</div>`;
	bet();
}

let heart = '<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDU3Ljk0NyA1Ny45NDciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU3Ljk0NyA1Ny45NDc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNFNjRDM0M7IiBkPSJNMjguOTQ3LDU2LjQ4NmMxNS42ODUtMTEuMjc3LDIzLjUzMi0yMS41OTIsMjcuMjIyLTI5LjQ2YzQuMzExLTkuMTkzLDAuNTYxLTIwLjU4OS04Ljg0NS0yNC40MTMNCgkJQzM2LjI2OC0xLjg4LDI4Ljk0Nyw4LjQ4NiwyOC45NDcsOC40ODZTMjEuNjc4LTEuOTA3LDEwLjYyMywyLjU4OEMxLjIxNyw2LjQxMi0yLjUzMywxNy44MDgsMS43NzgsMjcuMDAxDQoJCUM1LjQ2OCwzNC44NjgsMTMuMjYyLDQ1LjIxLDI4Ljk0Nyw1Ni40ODZ6Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" />';//Icons made by Smashicons from https://www.flaticon.com/
let diamond = '<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwb2x5Z29uIHN0eWxlPSJmaWxsOiNFMjFCMUI7IiBwb2ludHM9IjI1NiwwIDU2LDI1NiAyNTYsNTEyIDQ1NiwyNTYgIi8+DQo8cG9seWdvbiBzdHlsZT0iZmlsbDojRjkxRTFFOyIgcG9pbnRzPSIyNTYsNTEyIDU2LDI1NiAyNTYsMCAiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />';//Icons made by Alfredo Hernandez from https://www.flaticon.com/
let club = '<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMS45OTggNTExLjk5OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTExLjk5OCA1MTEuOTk4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8cGF0aCBkPSJNNDE5LjM4MSwxOTkuMjI5Yy0yNi42NTEtMTIuMzc4LTUxLjU0MS0xMi42NzQtNzQuMTc3LTcuMTg2YzE4LjQ0MS0yMS44MjcsMjkuMDU4LTUwLjQ3MiwyNy4zOTYtODEuNjQyDQoJCUMzNjkuNDM4LDUxLDMyMC4wMTcsMi4zNiwyNjAuNTgsMC4wODdjLTY2LjU3OC0yLjU0Mi0xMjEuMzUzLDUwLjY3LTEyMS4zNTMsMTE2LjY4MmMwLDI4LjY5OSwxMC4zOTMsNTQuOTM3LDI3LjU2Nyw3NS4yNzMNCgkJYy0yMi42MzYtNS40ODgtNDcuNTI2LTUuMTkyLTc0LjE3Nyw3LjE4NmMtNDEuMDIzLDE5LjA2MS02OS41NjksNTkuNDAxLTcwLjE1MywxMDQuNjI4DQoJCWMtMC44MzUsNjUuMjA0LDUxLjc1NywxMTguMzE3LDExNi43NjMsMTE4LjMxN2MzMS40MTIsMCw1OS44NTktMTIuNDU5LDgwLjg0Mi0zMi42MzN2MzQuNDAzYzAsMTYuNTAxLTQuMzAzLDMyLjcxNC0xMi40OTUsNDcuMDQxDQoJCWwtMTUuNzU1LDI3LjU3NmMtMy40MjIsNS45OTEsMC45MDcsMTMuNDM4LDcuNzk3LDEzLjQzOGgxMTIuNzY2YzYuODk5LDAsMTEuMjE5LTcuNDQ2LDcuNzk3LTEzLjQzOGwtMTUuNzU1LTI3LjU3Ng0KCQljLTguMTgzLTE0LjMyNy0xMi40OTUtMzAuNTQtMTIuNDk1LTQ3LjA0MVYzODkuNTRjMjAuOTkyLDIwLjE3NSw0OS40MzksMzIuNjMzLDgwLjg0MiwzMi42MzMNCgkJYzY1LjAwNiwwLDExNy42MDctNTMuMTEzLDExNi43NjMtMTE4LjMxN0M0ODguOTUsMjU4LjYyOSw0NjAuNDAzLDIxOC4yODksNDE5LjM4MSwxOTkuMjI5Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6IzJBMkQzMzsiIGQ9Ik00MjMuOTE1LDM1NS44NzdjLTEzLjYyMSwxMy44MDUtMzEuNzUyLDIxLjM4NS01MS4xNDIsMjEuMzg1Yy00Ljk2MSwwLTguOTgyLDQuMDIyLTguOTgyLDguOTgyDQoJCWMwLDQuOTYxLDQuMDIyLDguOTgyLDguOTgyLDguOTgyYzI0LjE5NiwwLDQ2LjkzNC05LjUwNiw2My45MjctMjYuNzI5YzE2Ljk5MS0xNy4yLDI2LjE5Ny00MC4wNjYsMjUuODg4LTY0LjI4OA0KCQljLTAuMDYzLTQuOTYtNC4xMzYtOC45My05LjA5Ni04Ljg2N2MtNC45NiwwLjA2My04LjkzLDQuMTM2LTguODY3LDkuMDk2QzQ0NC44NzIsMzIzLjg1OSw0MzcuNTI5LDM0Mi4wOTUsNDIzLjkxNSwzNTUuODc3eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=" />';//Icons made by Smashicons from https://www.flaticon.com/
let spade = '<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMjMuNjQgMjMuNjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIzLjY0IDIzLjY0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojMDMwMTA0OyIgZD0iTTYuOTk1LDE5LjA0OWMyLjA3NywwLDMuODUyLTEuNDgsNC44MjctMi41YzAuOTc2LDEuMDIsMi43NDYsMi41LDQuODIzLDIuNQ0KCQljMy41NzYsMCw2LjA3Ni0yLjQ5NCw2LjA3Ni02LjA2M2MwLTMuOTM1LTMuMTAzLTYuNDc5LTYuMTA0LTguOTM4Yy0xLjQxNy0xLjE2Mi0yLjg4NS0yLjM2Mi00LjAxLTMuNjk2DQoJCUMxMi40MTgsMC4xMjksMTIuMTQxLDAsMTEuODUsMGgtMC4wNThjLTAuMjkxLDAtMC41NjgsMC4xMjktMC43NTgsMC4zNTJjLTEuMTI2LDEuMzMyLTIuNTkzLDIuNTMzLTQuMDEsMy42OTUNCgkJYy0zLjAwMiwyLjQ1OS02LjEwNiw1LjAwMi02LjEwNiw4LjkzOEMwLjkxOSwxNi41NTUsMy40MTcsMTkuMDQ5LDYuOTk1LDE5LjA0OXoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojMDMwMTA0OyIgZD0iTTguMTA5LDIzLjY0YzIuNDc0LTAuNDQ0LDQuOTY3LTAuNDI1LDcuNDIyLDBjLTIuNDU1LTMuNjkyLTMuNzExLTEwLjgzMy0zLjcxMS0xMC44MzMNCgkJUzEwLjU4MywxOS45NDgsOC4xMDksMjMuNjR6Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" />';//Icons made by Freepik from https://www.flaticon.com/"


const suits = [diamond, heart, club, spade];
const cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
let dealerCards = [];
let playerCards = [];
let dealerScore = 0;
let playerScore = 0;
let playerCash = 1000;
let currentBet = 0;
let deck = [];
let bets = document.getElementsByClassName("bets");
let isAbout21 = false;
let isInsurance = false;
let isSplit = false;
let playersSecondCards = "";

for(i=0; i<suits.length; i++){
	for(j=0; j<cardValues.length; j++){
		let card = {
			suits: suits[i],
			value: cardValues[j],
		};
		deck.push(card);
	}
}

function bet() {
	document.getElementById("blackjackResult").innerHTML = "Obstaw stawkę"
	for (i=0; i<bets.length; i++){
		bets[i].style.visibility = "visible";
		bets[i].addEventListener("click", function (){
			document.getElementById("exit").style.visibility = "hidden";
			let betValue = parseInt(this.innerHTML);
			if(playerCash>=betValue){
				currentBet = currentBet + betValue;
				document.getElementById("currentBetBoard").innerHTML = `stawka: ${currentBet}`;
				playerCash = playerCash - betValue;
				document.getElementById("playerCashBoard").innerHTML = `Twoje środki: ${playerCash}`
				document.getElementById("deal").style.visibility = "visible";
			}else{
				document.getElementById("blackjackResult").innerHTML = "Nie masz tyle środków!"
			}
		})
	}
}

function deal(){
	isAbout21 = false;
	document.getElementById("playerBoard").innerHTML = "";
	document.getElementById("dealerBoard").innerHTML = "";
	document.getElementById("deal").style.visibility = "hidden";
	document.getElementById("blackjackResult").innerHTML = "Dobierasz kartę?"
	document.getElementById("hit").style.visibility = "visible";
	document.getElementById("stand").style.visibility = "visible";

	if(playerCash >= 2*currentBet){
		document.getElementById("double").style.visibility = "visible";
	}
	for (i=0; i<bets.length; i++){
		bets[i].style.visibility = "hidden";
	}
	playerCards = [getNextCard(), getNextCard()];
	dealerCards = [getNextCard()];
	for(i=0; i<playerCards.length; i++){
		document.getElementById("playerBoard").innerHTML = document.getElementById("playerBoard").innerHTML + `<div class="blackjackCard">${playerCards[i].value} ${playerCards[i].suits}</div>`;
	}
	for(i=0; i<dealerCards.length; i++){
		document.getElementById("dealerBoard").innerHTML = document.getElementById("dealerBoard").innerHTML + `<div class="blackjackCard">${dealerCards[i].value} ${dealerCards[i].suits}</div><div id="hiddenBlackjack"></div>`;
	}
	if(dealerCards[0].value=="A" && playerCash >= currentBet/2){
		document.getElementById("insurance").style.visibility = "visible";
	}
	if(getCardNumericValue(playerCards[0])==getCardNumericValue(playerCards[1]) && playerCash >= currentBet){
		document.getElementById("split").style.visibility = "visible";
	}
	updateScores();
}

function getNextCard(){
	let nextCard = deck[Math.floor(Math.random()*deck.length)];
	return nextCard;
}

function updateScores(){
	playerScore = getScore(playerCards);
	dealerScore = getScore(dealerCards);
	document.getElementById("playerScore").innerHTML = playerScore;
	document.getElementById("dealerScore").innerHTML = dealerScore;
}

function getScore(cardArray){
	let score = 0;
	let hasAce = false;
	for(let i=0; i<cardArray.length; i++){
		let card = cardArray[i];
		score += getCardNumericValue(card);
		if(card.value == 'A'){
			hasAce = true;
		}
		if(hasAce && score+10<=21){
			score += 10;
		}
	}
	return score;
}

function getCardNumericValue(card){
	switch(card.value){
		case "A":
			return 1;
		case 2:
			return 2;
		case 3:
			return 3;
		case 4:
			return 4;
		case 5:
			return 5;
		case 6:
			return 6;
		case 7:
			return 7;
		case 8:
			return 8;
		case 9:
			return 9;
		default:
			return 10;
	}
}

function hit(){
	playerCards.push(getNextCard());
	document.getElementById("playerBoard").innerHTML = document.getElementById("playerBoard").innerHTML + `<div class="blackjackCard">${playerCards[playerCards.length-1].value} ${playerCards[playerCards.length-1].suits}</div>`;
	checkAbove21();
	document.getElementById("double").style.visibility = "hidden";
	document.getElementById("split").style.visibility = "hidden";
}

function stand(){
	document.getElementById("split").style.visibility = "hidden";
	document.getElementById("hiddenBlackjack").remove();
	while(dealerScore<playerScore && dealerScore <=21){
		dealerCards.push(getNextCard());
		document.getElementById("dealerBoard").innerHTML = document.getElementById("dealerBoard").innerHTML + `<div class="blackjackCard">${dealerCards[dealerCards.length-1].value} ${dealerCards[dealerCards.length-1].suits}</div>`;
		updateScores();
	}
	if (isInsurance && getCardNumericValue(dealerCards[1])==10){
		playerCash += currentBet*1.5;
		document.getElementById("playerCashBoard").innerHTML = `Twoje środki: ${playerCash}`
		document.getElementById("blackjackResult").innerHTML = `Otrzymujesz zwrot całej swojej stawki wraz z ubezpieczeniem`;
		gameOver();
	}else if(isSplit){
		document.getElementById("hit").style.visibility = "hidden";
		document.getElementById("stand").style.visibility = "hidden";
		if(dealerScore>21 || dealerScore < playerScore){
			playerCash += (currentBet * 2);
			document.getElementById("playerCashBoard").innerHTML = `Twoje środki: ${playerCash}`;
			document.getElementById("blackjackResult").innerHTML = `W pierwszej części wygrałeś ${currentBet}! Sprawdź drugą część <input type="button" id="secondCards" class="submit" onclick="checkSecondCards()" value="OK"/>`;
		}else if (dealerScore === playerScore){
			playerCash += currentBet;
			document.getElementById("playerCashBoard").innerHTML = `Twoje środki: ${playerCash}`;
			document.getElementById("blackjackResult").innerHTML = `Remis! Sprawdź drugą część <input type="button" id="secondCards" class="submit" onclick="checkSecondCards()" value="OK"/>`;
		}else{
			document.getElementById("blackjackResult").innerHTML = `Przegrałeś ${currentBet}! Sprawdź drugą część <input type="button" id="secondCards" class="submit" onclick="checkSecondCards()" value="OK"/>`;
		}
	}
	else{
		if(dealerScore>21){
			playerCash += (currentBet * 2);
			document.getElementById("playerCashBoard").innerHTML = `Twoje środki: ${playerCash}`
			document.getElementById("blackjackResult").innerHTML = `Wygrałeś ${currentBet}! Obstaw nową stawkę, aby grać dalej, lub zakończ grę`
			gameOver();
		}else if (dealerScore === playerScore){
			playerCash += currentBet;
			document.getElementById("playerCashBoard").innerHTML = `Twoje środki: ${playerCash}`
			document.getElementById("blackjackResult").innerHTML = `Remis! Obstaw nową stawkę, aby grać dalej, lub zakończ grę`
			gameOver();
		}else{
			document.getElementById("blackjackResult").innerHTML = `Przegrałeś ${currentBet}! Obstaw nową stawkę, aby grać dalej, lub zakończ grę`
			gameOver();
		}
	}
}


function checkSecondCards(){
	isSplit = false;
	document.getElementById("hit").style.visibility = "visible";
	document.getElementById("stand").style.visibility = "visible";
	document.getElementById("blackjackResult").innerHTML = `Dobierasz kartę?`;
	playerCards = playersSecondCards;
	playerScore = getScore(playerCards);
	document.getElementById("playerScore").innerHTML = playerScore;
	document.getElementById("playerBoard").innerHTML = "";
	for(i=0; i<playerCards.length; i++){
		document.getElementById("playerBoard").innerHTML = document.getElementById("playerBoard").innerHTML + `<div class="blackjackCard">${playerCards[i].value} ${playerCards[i].suits}</div>`;
	}
}

function double(){
	playerCash -= currentBet;
	currentBet += currentBet;
	document.getElementById("currentBetBoard").innerHTML = `stawka: ${currentBet}`;
	document.getElementById("playerCashBoard").innerHTML = `Twoje środki: ${playerCash}`
	hit();
	if(!isAbout21) stand();
}

function split(){
	isSplit = true;
	document.getElementById("split").style.visibility = "hidden";
	document.getElementById("double").style.visibility = "hidden";
	document.getElementById("insurance").style.visibility = "hidden";
	document.getElementById("hit").style.visibility = "visible";
	document.getElementById("stand").style.visibility = "visible";
	playerCash -= currentBet;
	document.getElementById("playerCashBoard").innerHTML = `Twoje środki: ${playerCash}`;
	playersSecondCards = [playerCards[1], getNextCard()];
	playerCards.pop();
	playerCards.push(getNextCard());
	document.getElementById("playerBoard").innerHTML = "";
	for(i=0; i<playerCards.length; i++){
		document.getElementById("playerBoard").innerHTML = document.getElementById("playerBoard").innerHTML + `<div class="blackjackCard">${playerCards[i].value} ${playerCards[i].suits}</div>`;
	}
	updateScores();
}

function insurance(){
	playerCash -= currentBet/2;
	document.getElementById("insurance").style.visibility = "hidden";
	document.getElementById("playerCashBoard").innerHTML = `Twoje środki: ${playerCash}`
	isInsurance = true;
}

function checkAbove21(){
	updateScores();
	if(playerScore > 21){
		isAbout21 = true;
		if(isSplit){
			document.getElementById("hit").style.visibility = "hidden";
			document.getElementById("stand").style.visibility = "hidden";
			document.getElementById("blackjackResult").innerHTML = `Przegrałeś ${currentBet}! Sprawdź drugą część <input type="button" id="secondCards" class="submit" onclick="checkSecondCards()" value="OK"/>`;
		}else{
			document.getElementById("blackjackResult").innerHTML = `Przegrałeś ${currentBet}! Obstaw nową stawkę, aby grać dalej, lub zakończ grę`
			gameOver();
		}
	}
}

function gameOver(){
	currentBet = 0;
	document.getElementById("currentBetBoard").innerHTML = `stawka: ${currentBet}`;
	playerScore = 0;
	dealerScore = 0;
	isInsurance = false;
	document.getElementById("exit").style.visibility = "visible";
	document.getElementById("hit").style.visibility = "hidden";
	document.getElementById("stand").style.visibility = "hidden";
	document.getElementById("double").style.visibility = "hidden";
	document.getElementById("insurance").style.visibility = "hidden";
	document.getElementById("split").style.visibility = "hidden";
	for (i=0; i<bets.length; i++){
		bets[i].style.visibility = "visible";
	}
	if(playerCash==0)endBlackjack();

}

function endBlackjack(){
	let finalResult = "";
	if(playerCash>1000){
		let balance = playerCash - 1000;
		winner.play();
		finalResult = `Gratulacje! Wygrałeś łącznie ${balance}`
	}
	else if (playerCash < 1000){
		let balance = 1000 - playerCash;
		loser.play();
		finalResult = `Przegrałeś łącznie ${balance}`;
	}
	container.innerHTML = `<div id="retry-or-back">${finalResult}<div><span class="reload" onclick="startBlackjack()">spróbuj jeszcze raz</span></div><div><span class="reload" onclick="location.reload()">powrót</span></div></div>`;
}