// const Tab = require('./tab'); // Adjust the path as needed

chords = ["C", "D", "G", "Em"]
lyrics = "I used to rule the world\nSeas would rise when I gave the word\nNow in the morning I sleep alone\nSweep the streets I used to own"
title = "Viva la Vida"
artist = "Coldplay"

chords2 = ["D", "G", "C", "G"]
lyrics2 = "Das Fenster öffnet sich nich' mehr\nUnd ich frag' mich, was ist hier passiert?\nWo ist all die Freiheit hin?\nIch fühl' mich wie im falschen Film"
title2 = "Durch den Monsun"
artist2 = "Tokio Hotel"

const Tracks = function (selector) {
    this.tracks = [];
    this.tracks[0] = new Tab(chords, lyrics, title, artist)
    this.tracks[1] = new Tab(chords2, lyrics2, title2, artist2)
    this.$root = document.querySelector(selector)
    
}

// module.exports = Tracks;