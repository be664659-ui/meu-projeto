
function mudarTema() {
    document.body.classList.toggle("tema-claro");

    if (document.body.classList.contains("tema-claro")) {
        localStorage.setItem("tema", "claro");
    } else {
        localStorage.setItem("tema", "escuro");
    }
}

// Recuperar o tema salvo
const temaSalvo = localStorage.getItem("tema");

if (temaSalvo === "claro") {
    document.body.classList.add("tema-claro");
}

// Selecionar todas as seções
const secoes = document.querySelectorAll("section");

// Observar quando uma seção aparece na tela
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");

            // Parar de observar após aparecer
            observador.unobserve(entrada.target);
        }

    });
}, {
    threshold: 0.1
});

// Começar a observar as seções
secoes.forEach((secao) => {
    observador.observe(secao);
});

// Selecionar os links do menu
const linksMenu = document.querySelectorAll('nav a[href^="#"]');

// Identificar a seção visível
function atualizarMenu() {
    let secaoAtual = "inicio";

    document.querySelectorAll("main section").forEach((secao) => {
        const posicao = secao.getBoundingClientRect();

        if (posicao.top <= 220) {
            secaoAtual = secao.id;
        }
    });

    // Destacar o link correspondente
    linksMenu.forEach((link) => {
        const destino = link.getAttribute("href");

        link.classList.toggle(
            "ativo",
            destino === "#" + secaoAtual
        );
    });
}

// Atualizar durante a rolagem
window.addEventListener("scroll", atualizarMenu);

// Atualizar ao abrir a página
atualizarMenu();

// Selecionar o botão e o menu
const botaoMenu = document.getElementById("menu-toggle");
const menuNavegacao = document.getElementById("menu-navegacao");

// Abrir e fechar o menu
botaoMenu.addEventListener("click", () => {
    const aberto = menuNavegacao.classList.toggle("aberto");

    botaoMenu.textContent = aberto ? "✕" : "☰";
    botaoMenu.setAttribute("aria-expanded", String(aberto));
    botaoMenu.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );
});

// Fechar o menu quando clicar em um link
menuNavegacao.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        menuNavegacao.classList.remove("aberto");
        botaoMenu.textContent = "☰";
        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu");
    });
});

const botaoTopo = document.getElementById("voltar-topo");

function verificarRolagem() {
    if (window.scrollY > 300) {
        botaoTopo.classList.add("mostrar");
    } else {
        botaoTopo.classList.remove("mostrar");
    }
}

window.addEventListener("scroll", verificarRolagem);

verificarRolagem();

botaoTopo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
const botaoVoltar = document.getElementById("voltar-topo");

if (botaoVoltar) {
    botaoVoltar.classList.add("mostrar");
}
// ANIMAÇÕES AO ROLAR A PÁGINA

const elementosAnimados = document.querySelectorAll(
    "main section, .card-projeto"
);

const observadorEntrada = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");

                observadorEntrada.unobserve(entrada.target);
            }

        });
    },
    {
        threshold: 0.1
    }
);

elementosAnimados.forEach((elemento) => {
    elemento.classList.add("animar-entrada");
    observadorEntrada.observe(elemento);
});
// EFEITO DE DIGITAÇÃO

const frases = [
    "Desenvolvedor Web",
    "Estudante de Programação",
    "Apaixonado por Basquete"
];

const textoDigitando = document.getElementById("texto-digitando");

let indiceFrase = 0;
let indiceLetra = 0;
let apagando = false;

function digitar() {

    if (!textoDigitando) return;

    const fraseAtual = frases[indiceFrase];

    if (!apagando) {
        indiceLetra++;
    } else {
        indiceLetra--;
    }

    textoDigitando.textContent =
        fraseAtual.substring(0, indiceLetra);

    let velocidade = apagando ? 50 : 100;

    if (!apagando && indiceLetra === fraseAtual.length) {
        velocidade = 1500;
        apagando = true;
    }

    if (apagando && indiceLetra === 0) {
        apagando = false;
        indiceFrase = (indiceFrase + 1) % frases.length;
        velocidade = 500;
    }

    setTimeout(digitar, velocidade);
}

if (textoDigitando) {
    digitar();
}