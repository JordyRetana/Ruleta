const canvas = document.getElementById("ruleta");
const ctx = canvas.getContext("2d");
const bola = document.querySelector(".bola");
const sombra = document.querySelector(".bola-sombra");
const resultado = document.getElementById("resultado");

const premios = [
  "0", "32", "15", "19", "4", "21", "2", "25",
  "17", "34", "6", "27", "13", "36", "11", "30",
  "8", "23", "10", "5", "24", "16", "33", "1",
  "20", "14", "31", "9", "22", "18", "29", "7",
  "28", "12", "35", "3", "26"
];

const size = canvas.width;
const cx = size / 2;
const cy = size / 2;
const rExterior = size / 2 - 20;
const rInterior = rExterior - 80;

let anguloRuleta = 0;
let anguloBola = 0;
let velocidad = 0;
let girando = false;

/* DIBUJAR RULETA */
function dibujarRuleta() {
  ctx.clearRect(0, 0, size, size);
  const angulo = (2 * Math.PI) / premios.length;

  for (let i = 0; i < premios.length; i++) {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(
      cx,
      cy,
      rExterior,
      i * angulo + anguloRuleta,
      (i + 1) * angulo + anguloRuleta
    );
    ctx.fillStyle = i % 2 === 0 ? "#b30000" : "#111";
    ctx.fill();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(i * angulo + anguloRuleta + angulo / 2);
    ctx.fillStyle = "white";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "right";
    ctx.fillText(premios[i], rExterior - 20, 5);
    ctx.restore();
  }

  // centro
  ctx.beginPath();
  ctx.arc(cx, cy, 50, 0, Math.PI * 2);
  ctx.fillStyle = "#222";
  ctx.fill();
}

/* MOVER BOLA */
function moverBola() {
  const r = rInterior + 10;
  const x = cx + Math.cos(anguloBola) * r;
  const y = cy + Math.sin(anguloBola) * r;

  bola.style.left = `${x - 9}px`;
  bola.style.top = `${y - 9}px`;

  sombra.style.left = `${x - 9}px`;
  sombra.style.top = `${y + 4}px`;
}

/* ANIMACIÓN */
function animar() {
  if (!girando) return;

  anguloRuleta += velocidad;
  anguloBola -= velocidad * 1.5;
  velocidad *= 0.99;

  dibujarRuleta();
  moverBola();

  if (velocidad < 0.002) {
    girando = false;
    mostrarResultado();
  } else {
    requestAnimationFrame(animar);
  }
}

/* GIRAR */
function girar() {
  if (girando) return;
  resultado.textContent = "";
  velocidad = Math.random() * 0.3 + 0.25;
  girando = true;
  animar();
}

/* RESULTADO */
function mostrarResultado() {
  const angulo = (2 * Math.PI) / premios.length;
  const index = Math.floor(
    ((2 * Math.PI - (anguloRuleta % (2 * Math.PI))) / angulo)
  ) % premios.length;

  resultado.textContent = `🎉 Resultado: ${premios[index]} 🎉`;
}

/* INIT */
dibujarRuleta();
moverBola();
