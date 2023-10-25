const Application = function () {
  this.initA4();
  this.tuner = new Tuner(this.a4);
  this.notes = new Notes(".notes", this.tuner);
  this.meter = new Meter(".meter");
  this.frequencyBars = new FrequencyBars(".frequency-bars");
  this.noteHistory = []; // Ajout de l'historique des notes détectées
  this.update({
    name: "A",
    frequency: this.a4,
    octave: 4,
    value: 69,
    cents: 0,
  });
};

Application.prototype.initA4 = function () {
  this.$a4 = document.querySelector(".a4 span");
  this.a4 = parseInt(localStorage.getItem("a4")) || 440;
  this.$a4.innerHTML = this.a4;
  this.noteverif = ["A","G"]; // Liste des notes à vérifier
};

Application.prototype.start = function () {
  const self = this;

  this.tuner.onNoteDetected = function (note) {
    if (self.notes.isAutoMode) {
      if (self.lastNote === note.name) {
        self.update(note);
      } else {
        self.lastNote = note.name;
      }
    }
  };

  swal.fire("Welcome to online tuner!").then(function () {
    self.tuner.init();
    self.frequencyData = new Uint8Array(self.tuner.analyser.frequencyBinCount);
  });

  this.$a4.addEventListener("click", function () {
    swal
      .fire({ input: "number", inputValue: self.a4 })
      .then(function ({ value: a4 }) {
        if (!parseInt(a4) || a4 === self.a4) {
          return;
        }
        self.a4 = a4;
        self.$a4.innerHTML = a4;
        self.tuner.middleA = a4;
        self.notes.createNotes();
        self.update({
          name: "A",
          frequency: self.a4,
          octave: 4,
          value: 69,
          cents: 0,
        });
        localStorage.setItem("a4", a4);
      });
  });

  this.updateFrequencyBars();

  document.querySelector(".auto input").addEventListener("change", () => {
    this.notes.toggleAutoMode();
  });
};

Application.prototype.updateFrequencyBars = function () {
  if (this.tuner.analyser) {
    this.tuner.analyser.getByteFrequencyData(this.frequencyData);
    this.frequencyBars.update(this.frequencyData);
  }
  requestAnimationFrame(this.updateFrequencyBars.bind(this));
};

Application.prototype.updateNoteHistory = function () {
  const $noteHistoryList = document.querySelector(".note-history-list");
if ($noteHistoryList) {
  $noteHistoryList.innerHTML = ""; // Efface l'affichage actuel
  // Maintenant, vous pouvez ajouter de nouveaux éléments
} else {
  console.error("Element note-history-list not found.");
}


let index =0;

  // Parcourez l'historique des notes et affichez-les
  this.noteHistory.forEach((note) => {
    const $noteItem = document.createElement("div");
    $noteItem.className = "note-item";
    $noteItem.innerHTML = `<span>${note.name}</span> - ${note.frequency} Hz`;
    if (this.noteverif[index] === note.name) {
      // Si la note correspond à celle dans noteverif, affichez-la en vert
      $noteItem.classList.add("active");
      index++; // Passe à la prochaine note dans noteverif

    }
    else {
      index =0;
    }
    $noteHistoryList.appendChild($noteItem);
  });
};

Application.prototype.update = function (note) {
  this.notes.update(note);
  this.meter.update((note.cents / 50) * 45);
// Ajouter la note actuelle à l'historique
this.noteHistory.push({
  name: note.name,
  frequency: note.frequency,
  octave: note.octave,
  value: note.value,
  cents: note.cents,
});

// Mettre à jour l'affichage de l'historique
this.updateNoteHistory();
};

const app = new Application();
app.start();