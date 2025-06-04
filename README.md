# Tennis Tracker CLI

This repository contains a minimal command-line implementation inspired by the **Tennis Tracker Pro** project.

The goal of this small tool is to demonstrate how match data could be collected and managed before a full mobile application is built.

## Features

- Start a new match between two players.
- Record points interactively via the terminal.
- Automatic score calculation for games and sets.
- Simple unit test demonstrating the score logic.

## Getting Started

Ensure you have Node.js installed. Run the following commands:

```bash
npm install       # (no dependencies, but sets up the project)
npm test          # run unit test
npm start         # launch interactive CLI
```

During a match, type the name of the point winner (`Player 1` or `Player 2`) and the score will update. Type `exit` to end the session.

This is only a starting point for the larger vision described in the project prompt.
