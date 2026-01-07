const sectores = [
  { texto: "0", color: "#0a8f08" },
  { texto: "32", color: "red" },
  { texto: "15", color: "black" },
  { texto: "19", color: "red" },
  { texto: "4",  color: "black" },
  { texto: "21", color: "red" },
  { texto: "2",  color: "black" },
  { texto: "25", color: "red" },
  { texto: "17", color: "black" },
  { texto: "34", color: "red" },
  { texto: "6",  color: "black" },
  { texto: "27", color: "red" }
];

const canvas = document.getElementById("idcanvas");
const ctx = canvas.getContext("2d");
const center = canvas.width / 2;
const radius = center - 10;

let angulo = 0;
let girando = false;

function dibujarRuleta() {
  const paso = (2 * Math.PI) / sectores.length;

  sectores.forEach((s, i) => {
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius, paso * i, paso * (i + 1));
    ctx.fillStyle = s.color;
    ctx.fill();
    ctx.strokeStyle = "#111";
    ctx.stroke();

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(paso * i + paso / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "white";
    ctx.font = "bold 18px Arial";
    ctx.fillText(s.texto, radius - 15, 6);
    ctx.restore();
  });
}

dibujarRuleta();

function sortear() {
  if (girando) return;
  girando = true;

  document.getElementById("idestado").innerText = "SPINNING...";

  let velocidad = Math.random() * 35 + 40;
  const friccion = 0.985;

  const animar = () => {
    velocidad *= friccion;
    angulo += velocidad;

    canvas.style.transform = `rotate(${angulo}deg)`;

    if (velocidad > 0.4) {
      requestAnimationFrame(animar);
    } else {
      finalizar();
    }
  };

  animar();
}

function finalizar() {
  girando = false;
  document.getElementById("boton").style.display = "none";

  const grados = (angulo % 360 + 360) % 360;
  const index = Math.floor((360 - grados) / (360 / sectores.length));
  const resultado = sectores[index % sectores.length];

  const premio = document.getElementById("premio");
  premio.innerText = `🎲 Resultado: ${resultado.texto}`;
  premio.style.display = "block";
}

