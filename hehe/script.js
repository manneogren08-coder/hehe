const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const roseLayer = document.getElementById("rose-layer");

let raining = false;
let rainInterval = null;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// Gör så att "NEJ" smiter när man försöker klicka / hovra / touch
function removeNoButton(e) {
  e.preventDefault();
  noBtn.style.display = "none";
  result.textContent = "Fel svar 😌 Testa JA istället!";
}

noBtn.addEventListener("click", removeNoButton);
noBtn.addEventListener("touchstart", removeNoButton, { passive: false });

  const container = noBtn.parentElement; // .buttons
  const rect = container.getBoundingClientRect();

  // Beräkna en ny position inom knappraden
  const padding = 6;
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;

  const maxX = rect.width - btnW - padding;
  const maxY = rect.height - btnH - padding;

  const x = rand(padding, Math.max(padding, maxX));
  const y = rand(padding, Math.max(padding, maxY));

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.right = "auto";




// När man klickar JA: visa text + starta ros-regn
yesBtn.addEventListener("click", () => {
  result.textContent = "Jarrå!🌹💘";
  if (!raining) startRoseRain();
});

function startRoseRain() {
  raining = true;

  // skapa rosor löpande
  rainInterval = setInterval(() => {
    for (let i = 0; i < 6; i++) spawnRose();
  }, 250);

  // stoppa efter en stund (kan ändras)
  setTimeout(() => {
    stopRoseRain();
  }, 6500);
}

function stopRoseRain() {
  raining = false;
  if (rainInterval) clearInterval(rainInterval);
  rainInterval = null;
}

function spawnRose() {
  const rose = document.createElement("div");
  rose.className = "rose";
  rose.textContent = "🌹";

  const x = rand(0, window.innerWidth);
  const drift = rand(-120, 120);
  const rot = rand(-360, 360);
  const dur = rand(2.8, 5.2);

  rose.style.left = `${x}px`;
  rose.style.setProperty("--drift", `${drift}px`);
  rose.style.setProperty("--rot", `${rot}deg`);
  rose.style.animationDuration = `${dur}s`;

  roseLayer.appendChild(rose);

  // städa upp efter animationen
  setTimeout(() => {
    rose.remove();
  }, dur * 1000 + 200);
}

// Placera "NEJ" snyggt vid start
window.addEventListener("load", () => {
  // gör absolut-positionering funka inom .buttons
  const container = noBtn.parentElement;
  container.style.position = "relative";
  noBtn.style.left = "60%";
  noBtn.style.top = "8px";
});
