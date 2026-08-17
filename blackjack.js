function getCardSprite(card) {
    const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J'];

    const suitIndex = suits.indexOf(card.suit); // Clubs: 0, Diamonds: 1, Hearts: 2, Spades: 3
    const valueIndex = values.indexOf(card.value); // Indexes for Ace, 2, 3, ... K, Q, J

    // Now we calculate the x and y positions in the sprite sheet
    const xPos = valueIndex * 88; // Each card is 88px wide
    const yPos = suitIndex * 124; // Each card is 124px tall

    return `background-position: -${xPos}px -${yPos}px;`; // Negative values for positioning
}

// Helper function to display chip images
function getChipImages(chipCount) {
    const chipImageUrl = 'images/ChipsA_Flat-64x72.png'; // Path to your chip sprite sheet
    const chipValue = 5; // Assuming you want to show $5 chips

    let chipHTML = '';

    // Calculate how many $5 chips are needed to represent the chipCount
    let numChips = Math.floor(chipCount / chipValue);

    // Add chip images
    for (let i = 0; i < numChips; i++) {
        // Assuming each chip is 64px wide (change based on your sprite sheet)
        chipHTML += `<div class="chip" style="background-image: url(${chipImageUrl}); background-position: 0px 0px;"></div>`;
    }

    return chipHTML;
}

// Create the deck of cards
let deck = [];
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Initialize player and dealer hands
let playerHand = [];
let dealerHand = [];
let playerChips = 100; // Starting chip count
let playerBet = 10; // Initial bet
let gameOver = false;

// Function to create the deck
function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({
                value,
                suit
            });
        }
    }
    deck = shuffleDeck(deck);
}

// Function to shuffle the deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Function to deal cards to player and dealer
function dealCards() {
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];

    updateDisplay();
}


function updateDisplay() {
    // Display player hand
    document.getElementById('player-hand').innerHTML = displayCards(playerHand);

    // For dealer hand, show the back of the first card if game isn't over
    const hideDealerCard = !gameOver;
    document.getElementById('dealer-hand').innerHTML = displayCards(dealerHand, hideDealerCard);

    // Update chips
    document.getElementById('chips-container').innerHTML = `<p>Chips: $${playerChips}</p>`;

    // Display game status message
    const messageElement = document.getElementById('message');
}

// Helper function to map suit and value to the correct background position
function getCardPosition(suit, value) {
    const cardWidth = 88; // Width of each card in the sprite sheet
    const cardHeight = 124; // Height of each card in the sprite sheet
    const numColumns = 5; // Number of cards per row
    const numRows = 3; // Number of rows in the sprite sheet

    let column = 0; // Default column
    let row = 0; // Default row
    let image = '';

    // Determine the image based on the suit
    switch (suit) {
        case 'Clubs':
            image = 'images/Cards/Clubs-88x124.png';
            break;
        case 'Diamonds':
            image = 'images/Cards/Diamonds-88x124.png';
            break;
        case 'Hearts':
            image = 'images/Cards/Hearts-88x124.png';
            break;
        case 'Spades':
            image = 'images/Cards/Spades-88x124.png';
            break;
    }

    // Set the column and row based on the card's value (2 to A)
    switch (value) {
        case '2':
            column = 0;
            row = 0;
            break;
        case '3':
            column = 1;
            row = 0;
            break;
        case '4':
            column = 2;
            row = 0;
            break;
        case '5':
            column = 3;
            row = 0;
            break;
        case '6':
            column = 4;
            row = 0;
            break;
        case '7':
            column = 0;
            row = 1;
            break;
        case '8':
            column = 1;
            row = 1;
            break;
        case '9':
            column = 2;
            row = 1;
            break;
        case '10':
            column = 3;
            row = 1;
            break;
        case 'J':
            column = 4;
            row = 1;
            break;
        case 'Q':
            column = 0;
            row = 2;
            break;
        case 'K':
            column = 1;
            row = 2;
            break;
        case 'A':
            column = 2;
            row = 2;
            break;
    }

    // Calculate the background position based on the column and row
    const position = `-${column * cardWidth}px -${row * cardHeight}px`;

    return {
        image,
        position
    };
}

// Function to display cards in the hands using sprite images
function displayCards(hand, hideFirstCard = false) {
    return hand.map((card, index) => {
        // If it's the first card and we want to hide it (like the dealer's face-down card), show the card back
        if (hideFirstCard && index === 0) {
            return `<div class="card" style="background-image: url(images/Cards/Card_Back-88x124.png); background-position: 0 0;"></div>`;
        }

        // Get the card image and background position for each card
        const {
            image,
            position
        } = getCardPosition(card.suit, card.value);

        // Return the card with the correct background image and position
        return `<div class="card" style="background-image: url(${image}); background-position: ${position};"></div>`;
    }).join('');
}

function displayChips(chipCount) {
    // Define chip values and corresponding positions in the sprite sheet
    const chipValues = [100, 25, 10, 5]; // Order: Black, Green, Blue, Red
    const chipPositions = [
        '0px 0px', // Black chip (first in the sprite)
        '-64px 0px', // Green chip (second in the sprite)
        '-128px 0px', // Blue chip (third in the sprite)
        '-192px 0px' // Red chip (fourth in the sprite)
    ];

    let chipHTML = '';

    // Loop through each chip value, starting from the highest
    for (let i = 0; i < chipValues.length; i++) {
        let numChips = Math.floor(chipCount / chipValues[i]);
        chipCount %= chipValues[i]; // Reduce the chip count by the number of chips used

        // Create a <div> for each chip with the appropriate background position
        for (let j = 0; j < numChips; j++) {
            chipHTML += `<div class="chip" style="background-position: ${chipPositions[i]};"></div>`;
        }
    }

    return chipHTML;
}

// Example: Update the chips when the game starts or a bet is placed
window.onload = function() {
    updateChipSprites(); // Display chips for the initial bet
};

function placeBet(betAmount) {
    if (betAmount < MIN_BET) {
        alert(`The minimum bet is $${MIN_BET}.`);
        return;
    }
    if (betAmount > playerChips) {
        alert("Not enough chips.");
        return;
    }

    playerBet = betAmount;
    playerChips -= playerBet;

    // Update chip display
    updateChipSprites();
    updateDisplay(); // Refresh other game elements
}

function updateChipSprites() {
    const chipsDisplay = document.getElementById('chips-display');

    // For the current bet (playerBet):
    chipsDisplay.innerHTML = displayChips(playerBet);

    // Or, for the remaining chips (playerChips):
    // chipsDisplay.innerHTML = displayChips(playerChips);
}

function calculateHandValue(hand) {
    let value = 0;
    let aceCount = 0; // Count aces, since they can be worth 1 or 11

    for (let card of hand) {
        if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
            value += 10; // Face cards are worth 10 points
        } else if (card.value === 'A') {
            value += 11; // Ace is initially worth 11
            aceCount++; // Count the number of aces
        } else {
            value += parseInt(card.value); // Number cards are worth their value
        }
    }

    // Adjust for Aces if needed (if total value > 21, change Ace value to 1)
    while (value > 21 && aceCount > 0) {
        value -= 10; // Change Ace value from 11 to 1
        aceCount--; // Decrease Ace count
    }

    return value;
}

function checkForBust(hand) {
    const handValue = calculateHandValue(hand);
    if (handValue > 21) {
        return true; // Bust!
    }
    return false; // Not bust
}


// Logic for dealer to draw cards until they have at least 17 points
function dealerTurn() {
    let dealerValue = calculateHandValue(dealerHand);

    // The dealer draws until their hand value is at least 17
    while (dealerValue < 17) {
        dealerHand.push(deck.pop());
        dealerValue = calculateHandValue(dealerHand); // Recalculate the dealer's hand value
    }

    return dealerValue;
}

// Hit action
function hit() {
    if (gameOver) return;

    playerHand.push(deck.pop());
    updateDisplay();

    const playerValue = calculateHandValue(playerHand);
    if (playerValue > 21) {
        document.getElementById('message').textContent = 'Bust! You lose.';
        playerChips -= playerBet; // Deduct the bet from player chips
        gameOver = true;
        updateDisplay(); // Update display after the bust
    }
}

// Stand action
function stand() {
    if (gameOver) return;

    let dealerValue = calculateHandValue(dealerHand);

    // Simulate dealer's turn where they draw cards if their total is less than 17
    while (dealerValue < 17) {
        dealerHand.push(deck.pop());
        dealerValue = calculateHandValue(dealerHand);
    }

    const playerValue = calculateHandValue(playerHand);
    const messageElement = document.getElementById('message');

    // After the dealer has finished their turn, reveal the dealer's first card (face-down card)
    setTimeout(() => {
        // Flip the dealer's face-down card
        const dealerCards = document.querySelectorAll('#dealer-hand .card');
        if (dealerCards[0]) {
            dealerCards[0].classList.add('flip'); // Add the flip class to flip the first card
        }

        // Update the display to show both of the dealer's cards
        updateDisplay();

        // Determine the winner
        if (dealerValue > 21) {
            messageElement.textContent = 'Dealer busts! You win!';
            playerChips += playerBet; // Add chips to player if dealer busts
        } else if (playerValue > dealerValue) {
            messageElement.textContent = 'You win!';
            playerChips += playerBet; // Add chips to player if they win
        } else if (playerValue < dealerValue) {
            messageElement.textContent = 'Dealer wins.';
            playerChips -= playerBet; // Deduct chips from player if they lose
        } else {
            messageElement.textContent = 'It\'s a tie.';
        }

        gameOver = true;
        updateDisplay(); // Update the chip count and hands after the round ends
    }, 1000); // 1-second delay before revealing the dealer's cards
}

// Double Down action
function doubleDown() {
    if (gameOver || playerChips < playerBet) return;

    playerChips -= playerBet; // Double the bet
    playerBet *= 2;
    hit();
    stand();
}

// Split action
function split() {
    if (gameOver || playerHand[0].value !== playerHand[1].value) return;

    // Logic for split goes here (create two hands)
    // You'll need to implement this feature if you want to add it fully
    alert("Split functionality not implemented yet.");
}

// After the dealer's turn is done and the winner is determined:
function resetGame() {
    playerBet = 0; // Reset the bet
    document.getElementById('bet-container').style.display = 'block'; // Show the bet UI again
    updateDisplay(); // Update the display to show the updated chip count and reset bet
}

// Start the game when the page loads
createDeck();
dealCards();
