const arena = document.getElementById("arena");
const placar = document.getElementById("placar");
const iniciar = document.getElementById("btn-iniciar");
const limpar = document.getElementById("btn-limpar")

let alvosAtivos = [];
let pontosAcumulados = [];

function criarAlvo() {

    if (alvosAtivos.length >= 2) return;

    const alvo = document.createElement("div");
    alvo.className = "alvo";

    const posX = Math.random() * (arena.clientWidth - 60);
    const posY = Math.random() * (arena.clientHeight - 60);

    alvo.style.left = posX + "px";
    alvo.style.top = posY + "px";

    const dadosAlvo = {
        elemento: alvo,
        valor: 10,
        acertado: false
    };

    alvo.addEventListener('click', () => {
        acertarAlvo(dadosAlvo);
    });

    arena.appendChild(alvo);
    alvosAtivos.push(dadosAlvo);

    setTimeout(() => {
        alvo.classList.add("visivel");
    }, 10);
}

function acertarAlvo(dadosAlvo) {
    if (dadosAlvo.acertado) return;
    dadosAlvo.acertado = true;

    pontosAcumulados.push(dadosAlvo.valor);
    const total = pontosAcumulados.reduce((acumulador, atual) => acumulador + atual, 0);
    placar.textContent = total;

    dadosAlvo.elemento.classList.remove("visivel");

    setTimeout(() => {
        dadosAlvo.elemento.remove();
        alvosAtivos = alvosAtivos.filter((item) => item !== dadosAlvo);
    }, 200);
}

let jogoIniciado = false;
let intervalo = null;

iniciar.addEventListener('click', () => {
    if (jogoIniciado) return;
    jogoIniciado = true;

    intervalo = setInterval(criarAlvo, 200);
});

limpar.addEventListener('click', () => {
    clearInterval(intervalo);
    intervalo = null;
    jogoIniciado = false;

    alvosAtivos.forEach((item) => item.elemento.remove());
    alvosAtivos = [];

    pontosAcumulados = [];
    placar.textContent = 0;
});

