# Blackjack 21

This is a browser-based Blackjack game built to showcase core game logic, interactive UI design, and the implementation of traditional card-game mechanics using the JavaScript language.

[Try here] (https://hackerfumi63.github.io/Blackjack-21-Game/)

## Overview

**Role:** Developer and Designer
**Context:** CS50 Final Project
**Languages & Tools:** JavaScript, HTML, CSS, Git, GitHub Pages
**Status:** Live Web Build / In Development

## Main goals

**Game Logic Implementation:** Built the core Blackjack gameplay system from scratch, including deck creation, card shuffling, dealing, hand-value calculation, Ace handling, dealer behavior, and win/loss conditions.

**Browser-Based Gameplay:** Converted the project into a fully browser-friendly game using JavaScript and DOM manipulation, allowing the game to run entirely client-side without requiring a backend server or localized space.

**Interactive Betting System:** Implemented a chip-based betting system by utilizing player balance tracking, wager validation, and support for Blackjack actions such as Hit, Stand, and Double Down.

**Visual Card System:** Used sprite sheets to display individual playing cards and chip coins while keeping the number of required image assets relatively small.

## Key Technical Implementations

**Deck & Shuffle System:** Dynamically generates a standard 52-card deck and randomizes it using a JavaScript implementation of the Fisher-Yates shuffle method.

**Dynamic Hand Evaluation:** Calculates player and dealer hand values in real time, including automatically converting Aces from 11 to 1 when necessary in order to prevent a bust.

**Dealer AI:** Mimics traditional dealer behavior by drawing cards until the dealer reaches a hand value of at least 17.

**DOM-Based Game State:** Updates the cards, chip totals, bets, game messages, and player actions without requiring the webpage to reload.

**Sprite-Based Rendering:** Maps individual card values to positions within suit sprite sheets, allowing all 52 cards to be rendered from a small collection of image files.

**Static Web Deployment:** Deployed the browser version through GitHub Pages, allowing the project to run publicly and accessibly.

## Current Development

At the current moment, the core Blackjack gameplay is functional and publicly playable. Constant development is focused on refining the betting and round-reset systems, improving the game-state handling, polishing the interface, and completing additional mechanics such as splitting hands.

