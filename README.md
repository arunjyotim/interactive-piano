# Piano

An interactive piano application that plays synthesized musical notes when clicked or typed.

## Features

- Play notes using mouse clicks
- Trigger notes via computer keyboard
- Visual feedback for active keys
- Built-in web audio oscillator synthesis

## How it works

The application uses the Web Audio API to generate oscillator tones dynamically based on frequency data for each key. Event listeners map mouse clicks and keyboard strokes to corresponding sound generation routines.

## Run

Open `index.html` in a browser. No install or build step.

## Files

- `index.html`: Main HTML document structure
- `style.css`: Stylesheet using design tokens
- `script.js`: Audio synthesis and event handling
