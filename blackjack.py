import random

# 1. Create the deck of 52 cards and chips
# Define suits and values
suits = ['Clubs ♣', 'Diamonds ♦', 'Hearts ♥', 'Spades ♠']
values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
deck = [(value, suit) for suit in suits for value in values]

# 2. Shuffle the deck
random.shuffle(deck)

# Initialize player's chips
chip_values = {'black': 100, 'green': 25, 'blue': 10, 'red': 5}
# Starting chips
player_chips = {'black': 2, 'green': 4, 'blue': 10, 'red': 20}

# Function to calculate total chip value


def calculate_total_chips(chips):
    return sum(chips[color] * chip_values[color] for color in chips)

# Function to display player's chip stack


def display_chips(chips):
    print("Your Chips:")
    for color, count in chips.items():
        print(f"{color.capitalize()} Chips: {count}")

# Function to deduct chips for a bet


def deduct_chips(chips, bet):
    total = calculate_total_chips(chips)
# Not enough chips to place bet
    if bet > total:
        return False

    remaining_bet = bet
    # Deduct higher denominations first
    for color, value in sorted(chip_values.items(), key=lambda x: -x[1]):
        while remaining_bet >= value and chips[color] > 0:
            chips[color] -= 1
            remaining_bet -= value
# True if bet was fully deducted
    return remaining_bet == 0

# Function to add chips after a win


def add_chips(chips, winnings):
    # Add higher denominations first
    for color, value in sorted(chip_values.items(), key=lambda x: -x[1]):
        while winnings >= value:
            chips[color] += 1
            winnings -= value

# Function to display a hand


def display_hand(hand, hide_second_card=False):
    for i, card in enumerate(hand):
        if hide_second_card and i == 1:
            print("Hidden Card")
        else:
            print(f"{card[0]} of {card[1]}")

# Function to calculate hand value


def calculate_hand_value(hand):
    value = 0
    aces = 0
    for card, suit in hand:
        if card.isdigit():
            value += int(card)
        elif card in ['J', 'Q', 'K']:
            value += 10
        elif card == 'A':
            value += 11
            aces += 1
    while value > 21 and aces:
        value -= 10
        aces -= 1
    return value


# 3. Betting
while True:
    print("\n")
    display_chips(player_chips)
    total_chips = calculate_total_chips(player_chips)
    print(f"Total Chip Value: ${total_chips}")

    if total_chips <= 0:
        print("You're out of chips! Game over.")
        break

    # Place bet
    while True:
        try:
            bet = int(input("Enter your bet: "))
            if 1 <= bet <= total_chips and deduct_chips(player_chips, bet):
                break
            else:
                print(f"Invalid bet! Enter a value between 1 and {total_chips}.")
        except ValueError:
            print("Please enter a valid number.")

# 4. Deal cards
    player_hand = [deck.pop() for _ in range(2)]
    dealer_hand = [deck.pop() for _ in range(2)]

    print("\nPlayer's Hand:")
    display_hand(player_hand)
    print("\nDealer's Hand:")
    display_hand(dealer_hand, hide_second_card=True)
# 5. Game Logic
    # Player's turn
player_hands = [player_hand]  # Start with a single hand
bets = [bet]  # Track separate bets for each hand

i = 0  # Index of the current hand being played
while i < len(player_hands):
    current_hand = player_hands[i]
    current_bet = bets[i]

    while True:
        player_value = calculate_hand_value(current_hand)
        print(f"\nHand {i + 1} Value: {player_value}")
        display_hand(current_hand)

        if player_value > 21:
            print("Bust! You lose this hand.")
            break

        # Check available options
        if len(current_hand) == 2 and current_hand[0][0] == current_hand[1][0]:
            print("Options: Hit (h), Stand (s), Double (d), Split (p)")
        elif len(current_hand) == 2:
            print("Options: Hit (h), Stand (s), Double (d)")
        else:
            print("Options: Hit (h), Stand (s)")

        # Player choice
        choice = input("Your choice: ").lower()

        if choice == 'h':  # Hit
            current_hand.append(deck.pop())
            continue  # Recalculate hand value

        elif choice == 's':  # Stand
            break  # Move to the next hand

        elif choice == 'd' and len(current_hand) == 2:  # Double
            if deduct_chips(player_chips, current_bet):
                current_bet *= 2  # Double the bet
                current_hand.append(deck.pop())  # Draw one card
                print("\nHand after doubling:")
                display_hand(current_hand)
                break  # Doubling ends the turn
            else:
                print("Not enough chips to double!")

        # Split
        elif choice == 'p' and len(current_hand) == 2 and current_hand[0][0] == current_hand[1][0]:
            if deduct_chips(player_chips, current_bet):  # Deduct bet for the new hand
                # Create two hands and add them to player_hands
                new_hand1 = [current_hand[0], deck.pop()]
                new_hand2 = [current_hand[1], deck.pop()]
                player_hands[i] = new_hand1
                player_hands.insert(i + 1, new_hand2)

                # Add a new bet for the second hand
                bets[i] = current_bet  # Retain the bet for the first hand
                bets.insert(i + 1, current_bet)  # Same bet for the split hand

                print("\nHand split!")
                print("First Hand:")
                display_hand(new_hand1)
                print("\nSecond Hand:")
                display_hand(new_hand2)
                break  # Proceed to the next hand
            else:
                print("Not enough chips to split!")

        else:
            print("Invalid choice. Please choose a valid option.")

    # Move to the next hand
    i += 1

    # Dealer's turn
    if calculate_hand_value(player_hand) <= 21:
        print("\nDealer's Turn:")
        print("\nDealer's Hand:")
        display_hand(dealer_hand)
        while calculate_hand_value(dealer_hand) < 17:
            dealer_hand.append(deck.pop())
            print("\nDealer Hits:")
            display_hand(dealer_hand)

# 6. Scoring
        dealer_value = calculate_hand_value(dealer_hand)
        player_value = calculate_hand_value(player_hand)

        print(f"\nPlayer's Final Hand Value: {player_value}")
        print(f"Dealer's Final Hand Value: {dealer_value}")
        # Determine winner
        if dealer_value > 21 or player_value > dealer_value:
            print("You win this round!")
            add_chips(player_chips, bet * 2)
        elif dealer_value > player_value:
            print("Dealer wins this round!")
        else:
            print("It's a tie! Your bet is returned.")
            add_chips(player_chips, bet)

    # Play again?
    if input("\nPlay another round? (y/n): ").lower() != 'y':
        print("Thanks for playing! Final Chips:")
        display_chips(player_chips)
        break
