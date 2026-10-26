# Tic Tac Toe

A browser-based Tic Tac Toe game for two players, built with vanilla JavaScript, HTML and CSS.

**[Live demo](https://fruitsofbabylon.github.io/odin-tic-tac-toe/)**

![Screenshot of the game](screenshot.png)

## Features

- Two players, custom names, X always starts
- Detects all eight winning lines and ties
- Blocks moves on taken squares and on a finished game
- Start/restart without reloading the page
- Status line announcing the current turn and the result
- Responsive layout, playable on mobile

## How it was built

The game logic is completely separate from the interface. `gameBoard` and `game`
hold no DOM code at all, so the whole game is playable from the browser console
before any markup exists — which is how it was developed and tested.

Three modules, each with a single job:

| Module | Responsibility |
| --- | --- |
| `gameBoard` | Owns the 3x3 array; the only code that reads or writes squares |
| `game` | Turn order, win and tie detection, game-over state |
| `displayController` | The only code that touches the DOM |

Written with the **module pattern** (IIFEs for the three single-instance
objects) and a **factory function** for players, keeping global scope to three
names and the board array fully private.

## Running it locally

```bash
git clone https://github.com/fruitsofbabylon/odin-tic-tac-toe.git
cd odin-tic-tac-toe
open index.html
```

No build step or dependencies.

## Credits

Project from [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe)
JavaScript course. CSS reset by [Josh W. Comeau](https://www.joshwcomeau.com/css/custom-css-reset/).
Fonts: Playfair Display and Jost.
