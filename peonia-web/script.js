const canvas = document.getElementById("flor");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cx = canvas.width / 2;
const cy = canvas.height / 2 - 50;

const colores = [
    "#ffd1e8",
    "#ffb3d9",
    "#ff8fc7",
    "#ff69b4",
    "#f542a7",
    "#e91e63",
    "#c71585"
];

// ==========================
// TALLO
// ==========================

function dibujarTallo() {

    ctx.beginPath();
    ctx.moveTo(cx, cy + 40);

    ctx.quadraticCurveTo(
        cx + 15,
        cy + 140,
        cx,
        cy + 260
    );

    ctx.lineWidth = 8;
    ctx.strokeStyle = "#2e8b57";
    ctx.stroke();

    dibujarHoja(cx - 15, cy + 120, -1.0);
dibujarHoja(cx + 10, cy + 170, 0.7);
}

// ==========================
// HOJA REALISTA
// ==========================

function dibujarHoja(x, y, rotacion) {

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(rotacion);

    ctx.beginPath();

    ctx.ellipse(0, 20, 12, 28, 0, 0, Math.PI * 2);

    ctx.fillStyle = "#228b22";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 40);

    ctx.strokeStyle = "#145a32";
    ctx.lineWidth = 1;

    ctx.stroke();

    ctx.restore();
}
// ==========================
// PETALO
// ==========================

function dibujarPetalo(radio, angulo, color) {

    ctx.save();

    ctx.translate(cx, cy);
    ctx.rotate(angulo);

    ctx.beginPath();

    ctx.moveTo(0, 0);

    ctx.bezierCurveTo(
        radio * 0.5,
        -radio,

        radio,
        radio * 0.2,

        0,
        radio
    );

    ctx.bezierCurveTo(
        -radio,
        radio * 0.2,

        -radio * 0.5,
        -radio,

        0,
        0
    );

    ctx.fillStyle = color;
    ctx.fill();

    ctx.restore();
}

// ==========================
// CENTRO DE LA FLOR
// ==========================

function dibujarCentro() {

    for (let i = 0; i < 180; i++) {

        const angulo = Math.random() * Math.PI * 2;
        const distancia = Math.random() * 20;

        const x = cx + Math.cos(angulo) * distancia;
        const y = cy + Math.sin(angulo) * distancia;

        const tamaño = 2 + Math.random() * 4;

        ctx.beginPath();
        ctx.arc(x, y, tamaño, 0, Math.PI * 2);

        ctx.fillStyle = i % 3 === 0 ? "#ffd700" : "#ffcc33";
        ctx.fill();
    }
}

// ==========================
// ANIMACION
// ==========================

let capa = 0;
let petaloActual = 0;

function animar() {

    if (capa === 0 && petaloActual === 0) {
        dibujarTallo();
    }

    if (capa >= 7) {
        dibujarCentro();
        return;
    }

    const radio = 75 - (capa * 8);

    dibujarPetalo(
        radio,
        (Math.PI * 2 / 24) * petaloActual + (capa * 0.2),
        colores[capa]
    );

    petaloActual++;

    if (petaloActual >= 24) {
        petaloActual = 0;
        capa++;
    }

    requestAnimationFrame(animar);
}

animar();