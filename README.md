![Screenshot of the game's UI](/assets/screenshot.png)

# Artisanal Codenames
[Rafa](https://twitter.com/rafahari) and [I](https://twitter.com/mindeby) wanted to play Codenames with our family this (remote) Christmas, but the english version wouldn't be much fun for them — so we've built a custom version of the popular game [Codenames](https://codenames.game) in where we could add our own words (we started by translating the original to Portuguese for our own family).

[See it live ↗](https://custom-codenames.netlify.app)

## How to play
The game only runs locally, there's no server or syncing going on. Start the game, share your screen via Zoom or something, and play that way. 
Every non-captain player should close their eyes, and the captains can click "Show Answers" to see the "real board".

## Make it your own
Feel free to edit the file `words.js` to add your own words to the game. 

## Local dev environment
Run `npm install`, and then `browser-sync start --server --files "*.html, css/*.css, *.js"` to set up a local server with live reload if you wanna tweak things.
