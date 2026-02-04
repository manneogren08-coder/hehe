document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const result = document.getElementById("result");
  const roseLayer = document.getElementById("rose-layer");

  // Om något element saknas: avbryt utan att krascha
  if (!yesBtn || !noBtn || !result || !roseLayer) {
    console.error("Saknar element. Kolla att id:n finns i index.html: yesBtn, noBtn, result, rose-layer");
    return;
  }

  let raining = false;
  let rainInterval = null;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  // NEJ försvinner när man försöker trycka
  function removeNoButton(e) {
    e.preventDefault();
    noBtn.style.display = "none";
    result.textContent = "Fel svar 😌 Testa JA istället!";
  }

  noBtn.addEventListener("click", removeNoButton);
  noBtn.addEventListener("touchstart", removeNoButton, { passive: false });

  // Klick på JA: text + ros-regn
  yesBtn.addEventListener("click", () => {
    result.textContent = "Jarrå! 🌹💘";
    if (!raining) startRoseRain();
  });

  function startRoseRain() {
    raining = true;

    rainInterval = setInterval(() => {
      for (let i = 0; i < 6; i++) spawnRose();
    }, 250);

    setTimeout(stopRoseRain, 6500);
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

    setTimeout(() => rose.remove(), dur * 1000 + 200);
  }

  // Placera NEJ snyggt vid start
  const container = noBtn.parentElement;
  if (container) container.style.position = "relative";
  noBtn.style.left = "60%";
  noBtn.style.top = "8px";
});
