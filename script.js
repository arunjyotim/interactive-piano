const notes = [
  { note: 'C4', type: 'white', freq: 261.63, key: 'a' },
  { note: 'C#4', type: 'black', freq: 277.18, key: 'w' },
  { note: 'D4', type: 'white', freq: 293.66, key: 's' },  
  { note: 'D#4', type: 'black', freq: 311.13, key: 'e' },
  { note: 'E4', type: 'white', freq: 329.63, key: 'd' },
  { note: 'F4', type: 'white', freq: 349.23, key: 'f' },
  { note: 'F#4', type: 'black', freq: 369.99, key: 't' },
  { note: 'G4', type: 'white', freq: 392.00, key: 'g' },
  { note: 'G#4', type: 'black', freq: 415.30, key: 'y' },
  { note: 'A4', type: 'white', freq: 440.00, key: 'h' },  
  { note: 'A#4', type: 'black', freq: 466.16, key: 'u' },
  { note: 'B4', type: 'white', freq: 493.88, key: 'j' },
  { note: 'C5', type: 'white', freq: 523.25, key: 'k' }
];
let audioCtx = null;
const keyboardEl = document.getElementById('keyboard');
const activeNoteEl = document.getElementById('active-note');  
const themeToggleBtn = document.getElementById('theme-toggle');
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}
function playTone(freq, noteName, keyElement) {  
  initAudio();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';  
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.8);  
  activeNoteEl.textContent = noteName;
  keyElement.classList.add('active');
  setTimeout(() => {
    keyElement.classList.remove('active');
    if (activeNoteEl.textContent === noteName) {
      activeNoteEl.textContent = 'None';
    }  
  }, 150);
}
function renderKeyboard() {
  notes.forEach(item => {
    const keyEl = document.createElement('div');
    keyEl.className = 'key ' + item.type;
    keyEl.dataset.note = item.note;  
    const labelSpan = document.createElement('span');
    labelSpan.textContent = item.key.toUpperCase();
    keyEl.appendChild(labelSpan);
    keyEl.addEventListener('mousedown', () => {
      playTone(item.freq, item.note, keyEl);
    });
    keyboardEl.appendChild(keyEl);  
  });
}
window.addEventListener('keydown', e => {
  if (e.repeat) return;
  const found = notes.find(n => n.key === e.key.toLowerCase());
  if (found) {
    const el = keyboardEl.querySelector(`[data-note="${found.note}"]`);  
    if (el) {
      playTone(found.freq, found.note, el);
    }
  }
});
themeToggleBtn.addEventListener('click', () => {
  const root = document.documentElement;  
  const currentTheme = root.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    root.setAttribute('data-theme', 'light');
  } else {
    root.setAttribute('data-theme', 'dark');
  }
});  
renderKeyboard();


