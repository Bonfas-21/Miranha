// ==========================================================
// MIRANHA — HOME V2
// script.js
// ==========================================================

document.addEventListener("DOMContentLoaded", function () {

    // ======================================================
    // 01. CONFIGURAÇÕES GERAIS
    // ======================================================

    const body = document.body;

    // Ativa as animações do CSS somente depois do JS carregar.
    body.classList.add("js-ativo");


    // ======================================================
    // 02. FUNÇÕES AUXILIARES
    // ======================================================

    function selecionar(seletor, raiz = document) {
        return raiz.querySelector(seletor);
    }

    function selecionarTodos(seletor, raiz = document) {
        return [...raiz.querySelectorAll(seletor)];
    }

    function limitar(numero, minimo, maximo) {
        return Math.min(Math.max(numero, minimo), maximo);
    }


    // ======================================================
    // 03. NAVBAR — EFEITO AO ROLAR
    // ======================================================

    const navbar = selecionar(".navbar");

    function atualizarNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("menu-rolado");
        } else {
            navbar.classList.remove("menu-rolado");
        }
    }

    atualizarNavbar();

    window.addEventListener("scroll", atualizarNavbar, {
        passive: true
    });


    // ======================================================
    // 04. MENU MOBILE
    // ======================================================

    const botaoMenu = selecionar(".menu-mobile-btn");
    const linksMenu = selecionarTodos(".nav-link");

    if (botaoMenu && navbar) {

        botaoMenu.addEventListener("click", function () {

            navbar.classList.toggle("menu-aberto");

            const aberto =
                navbar.classList.contains("menu-aberto");

            botaoMenu.setAttribute(
                "aria-expanded",
                aberto ? "true" : "false"
            );
        });
    }

    linksMenu.forEach(function (link) {

        link.addEventListener("click", function () {

            if (navbar) {
                navbar.classList.remove("menu-aberto");
            }

            if (botaoMenu) {
                botaoMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        });
    });


    // ======================================================
    // 05. LINK ATIVO DO MENU CONFORME A ROLAGEM
    // ======================================================

    const secoesMenu = [];

    linksMenu.forEach(function (link) {

        const href = link.getAttribute("href");

        if (!href || !href.startsWith("#")) {
            return;
        }

        const secao = selecionar(href);

        if (secao) {
            secoesMenu.push({
                link: link,
                secao: secao
            });
        }
    });

    function atualizarMenuAtivo() {

        if (secoesMenu.length === 0) return;

        const pontoTela =
            window.scrollY + window.innerHeight * 0.32;

        let itemAtual = secoesMenu[0];

        secoesMenu.forEach(function (item) {

            if (item.secao.offsetTop <= pontoTela) {
                itemAtual = item;
            }
        });

        linksMenu.forEach(function (link) {
            link.classList.remove("ativo");
        });

        if (itemAtual) {
            itemAtual.link.classList.add("ativo");
        }
    }

    atualizarMenuAtivo();

    window.addEventListener(
        "scroll",
        atualizarMenuAtivo,
        { passive: true }
    );


    // ======================================================
    // 06. ANIMAÇÕES AO ROLAR A PÁGINA
    // ======================================================

    const elementosRevelar =
        selecionarTodos(".revelar");

    if ("IntersectionObserver" in window) {

        const observador = new IntersectionObserver(
            function (entradas, observer) {

                entradas.forEach(function (entrada) {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add(
                            "visivel"
                        );

                        observer.unobserve(
                            entrada.target
                        );
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -60px 0px"
            }
        );

        elementosRevelar.forEach(function (elemento) {
            observador.observe(elemento);
        });

    } else {

        elementosRevelar.forEach(function (elemento) {
            elemento.classList.add("visivel");
        });
    }


    // ======================================================
    // 07. EFEITO LEVE NO FUNDO DO HERO
    // ======================================================

    const heroFundo =
        selecionar(".hero-fundo");

    const heroConteudo =
        selecionar(".hero-content");

    let animacaoHeroPendente = false;

    function atualizarHeroScroll() {

        if (!heroFundo && !heroConteudo) return;

        if (window.innerWidth <= 900) return;

        const rolagem =
            limitar(window.scrollY, 0, 900);

        if (heroFundo) {

            heroFundo.style.transform =
                `scale(1.05) translateY(${rolagem * 0.035}px)`;
        }

        if (heroConteudo) {

            heroConteudo.style.transform =
                `translateY(${rolagem * 0.018}px)`;

            heroConteudo.style.opacity =
                String(
                    limitar(
                        1 - rolagem / 1200,
                        0.35,
                        1
                    )
                );
        }
    }

    window.addEventListener("scroll", function () {

        if (animacaoHeroPendente) return;

        animacaoHeroPendente = true;

        requestAnimationFrame(function () {

            atualizarHeroScroll();

            animacaoHeroPendente = false;
        });

    }, { passive: true });


    // ======================================================
    // 08. CARROSSEL DOS HOMENS-ARANHA
    // ======================================================

    const slides =
        selecionarTodos(".slide");

    const dotsAranhas =
        selecionarTodos(".dot");

    const carrosselAranhas =
        selecionar(".carousel-aranhas") ||
        selecionar(".carousel");

    const progressoAranhas =
        selecionar(".carousel-progresso span");

    let slideAtual = 0;
    let intervaloAranhas = null;

    const tempoAranhas = 8000;


    function reiniciarProgressoAranhas() {

        if (!progressoAranhas) return;

        progressoAranhas.style.transition = "none";
        progressoAranhas.style.width = "0%";

        void progressoAranhas.offsetWidth;

        progressoAranhas.style.transition =
            `width ${tempoAranhas}ms linear`;

        progressoAranhas.style.width = "100%";
    }


    function mostrarSlide(numero) {

        if (slides.length === 0) return;

        if (numero >= slides.length) {
            slideAtual = 0;
        }

        else if (numero < 0) {
            slideAtual = slides.length - 1;
        }

        else {
            slideAtual = numero;
        }

        slides.forEach(function (slide) {

            slide.classList.remove("active");

            slide.setAttribute(
                "aria-hidden",
                "true"
            );
        });

        dotsAranhas.forEach(function (dot) {
            dot.classList.remove("active");
        });

        const slide = slides[slideAtual];

        if (slide) {

            slide.classList.add("active");

            slide.setAttribute(
                "aria-hidden",
                "false"
            );
        }

        if (dotsAranhas[slideAtual]) {

            dotsAranhas[
                slideAtual
            ].classList.add("active");
        }

        reiniciarProgressoAranhas();
    }


    function mudarSlide(direcao) {

        mostrarSlide(
            slideAtual + direcao
        );

        reiniciarAutomaticoAranhas();
    }


    function irSlide(numero) {

        mostrarSlide(numero);

        reiniciarAutomaticoAranhas();
    }


    function iniciarAutomaticoAranhas() {

        clearInterval(intervaloAranhas);

        if (slides.length <= 1) return;

        intervaloAranhas = setInterval(
            function () {

                mostrarSlide(
                    slideAtual + 1
                );

            },
            tempoAranhas
        );
    }


    function reiniciarAutomaticoAranhas() {

        clearInterval(intervaloAranhas);

        iniciarAutomaticoAranhas();
    }


    if (slides.length > 0) {

        mostrarSlide(0);

        iniciarAutomaticoAranhas();
    }


    // ======================================================
    // 09. BOTÕES DO CARROSSEL DOS ARANHAS
    // ======================================================

    const botaoAnteriorAranha =
        selecionar(
            ".carousel-aranhas .prev"
        ) ||
        selecionar(
            ".carousel .prev"
        );

    const botaoProximoAranha =
        selecionar(
            ".carousel-aranhas .next"
        ) ||
        selecionar(
            ".carousel .next"
        );

    if (botaoAnteriorAranha) {

        botaoAnteriorAranha.addEventListener(
            "click",
            function () {
                mudarSlide(-1);
            }
        );
    }

    if (botaoProximoAranha) {

        botaoProximoAranha.addEventListener(
            "click",
            function () {
                mudarSlide(1);
            }
        );
    }


    dotsAranhas.forEach(
        function (dot, indice) {

            dot.addEventListener(
                "click",
                function () {
                    irSlide(indice);
                }
            );
        }
    );


    // Compatibilidade caso seu HTML ainda
    // tenha onclick="mudarSlide(...)"

    window.mudarSlide = mudarSlide;
    window.irSlide = irSlide;


    // ======================================================
    // 10. PAUSAR CARROSSEL DOS ARANHAS
    // ======================================================

    if (carrosselAranhas) {

        carrosselAranhas.addEventListener(
            "mouseenter",
            function () {

                clearInterval(
                    intervaloAranhas
                );

                if (progressoAranhas) {

                    const largura =
                        progressoAranhas
                            .getBoundingClientRect()
                            .width;

                    const total =
                        progressoAranhas
                            .parentElement
                            .getBoundingClientRect()
                            .width;

                    const porcentagem =
                        total > 0
                            ? largura / total * 100
                            : 0;

                    progressoAranhas.style.transition =
                        "none";

                    progressoAranhas.style.width =
                        `${porcentagem}%`;
                }
            }
        );

        carrosselAranhas.addEventListener(
            "mouseleave",
            function () {

                iniciarAutomaticoAranhas();

                reiniciarProgressoAranhas();
            }
        );
    }


    // ======================================================
    // 11. TECLADO — CARROSSEL DOS ARANHAS
    // ======================================================

    document.addEventListener(
        "keydown",
        function (evento) {

            const tag =
                document.activeElement
                    ?.tagName
                    ?.toLowerCase();

            if (
                tag === "input" ||
                tag === "textarea"
            ) {
                return;
            }

            if (evento.key === "ArrowRight") {
                mudarSlide(1);
            }

            if (evento.key === "ArrowLeft") {
                mudarSlide(-1);
            }
        }
    );


    // ======================================================
    // 12. SWIPE — ARANHAS NO CELULAR
    // ======================================================

    if (carrosselAranhas) {

        let inicioToqueX = 0;

        carrosselAranhas.addEventListener(
            "touchstart",
            function (evento) {

                inicioToqueX =
                    evento.touches[0].clientX;

            },
            { passive: true }
        );

        carrosselAranhas.addEventListener(
            "touchend",
            function (evento) {

                const finalToqueX =
                    evento.changedTouches[0].clientX;

                const diferenca =
                    inicioToqueX - finalToqueX;

                if (
                    Math.abs(diferenca) < 50
                ) {
                    return;
                }

                if (diferenca > 0) {
                    mudarSlide(1);
                } else {
                    mudarSlide(-1);
                }
            },
            { passive: true }
        );
    }


    // ======================================================
    // 13. CARROSSEL DOS VILÕES
    //
    // DESKTOP:
    // 01 — Duende / Octopus / Electro
    // 02 — Mysterio / Lagarto / Homem-Areia
    // 03 — Venom / Novo Duende / Abutre
    //
    // MOBILE:
    // 1 vilão por vez.
    // ======================================================

    const gruposViloes =
        selecionarTodos(".grupo-viloes");

    const todosViloes =
        selecionarTodos(".vilao-card");

    const dotsViloes =
        selecionarTodos(".dot-vilao");

    const carrosselViloes =
        selecionar(".carousel-viloes");

    const contadorViloes =
        selecionar(".contador-viloes strong") ||
        selecionar("#contadorViloes");

    let grupoVilaoAtual = 0;
    let vilaoMobileAtual = 0;

    let intervaloViloes = null;

    const tempoViloes = 7000;


    function modoMobileViloes() {

        return window.innerWidth <= 650;
    }


    function atualizarContadorViloes() {

        if (!contadorViloes) return;

        if (modoMobileViloes()) {

            contadorViloes.textContent =
                String(
                    vilaoMobileAtual + 1
                ).padStart(2, "0");

        } else {

            contadorViloes.textContent =
                String(
                    grupoVilaoAtual + 1
                ).padStart(2, "0");
        }
    }


    function limparViloes() {

        gruposViloes.forEach(
            function (grupo) {

                grupo.classList.remove(
                    "active"
                );
            }
        );

        todosViloes.forEach(
            function (card) {

                card.classList.remove(
                    "vilao-mobile-ativo"
                );
            }
        );

        dotsViloes.forEach(
            function (dot) {

                dot.classList.remove(
                    "active"
                );
            }
        );
    }


    function mostrarGrupoVilao(numero) {

        if (gruposViloes.length === 0) {
            return;
        }

        if (numero >= gruposViloes.length) {
            grupoVilaoAtual = 0;
        }

        else if (numero < 0) {
            grupoVilaoAtual =
                gruposViloes.length - 1;
        }

        else {
            grupoVilaoAtual = numero;
        }

        limparViloes();

        if (gruposViloes[grupoVilaoAtual]) {

            gruposViloes[
                grupoVilaoAtual
            ].classList.add("active");
        }

        if (dotsViloes[grupoVilaoAtual]) {

            dotsViloes[
                grupoVilaoAtual
            ].classList.add("active");
        }

        atualizarContadorViloes();
    }


    function mostrarVilaoMobile(numero) {

        if (todosViloes.length === 0) {
            return;
        }

        if (numero >= todosViloes.length) {
            vilaoMobileAtual = 0;
        }

        else if (numero < 0) {
            vilaoMobileAtual =
                todosViloes.length - 1;
        }

        else {
            vilaoMobileAtual = numero;
        }

        limparViloes();

        const card =
            todosViloes[
                vilaoMobileAtual
            ];

        if (!card) return;

        const grupo =
            card.closest(".grupo-viloes");

        if (grupo) {
            grupo.classList.add("active");
        }

        card.classList.add(
            "vilao-mobile-ativo"
        );

        const indiceGrupo =
            gruposViloes.indexOf(grupo);

        if (
            indiceGrupo >= 0 &&
            dotsViloes[indiceGrupo]
        ) {

            dotsViloes[
                indiceGrupo
            ].classList.add("active");
        }

        atualizarContadorViloes();
    }


    function atualizarCarrosselViloes() {

        if (modoMobileViloes()) {
            mostrarVilaoMobile(
                vilaoMobileAtual
            );
        } else {
            mostrarGrupoVilao(
                grupoVilaoAtual
            );
        }
    }


    function mudarGrupoVilao(direcao) {

        if (modoMobileViloes()) {

            mostrarVilaoMobile(
                vilaoMobileAtual + direcao
            );

        } else {

            mostrarGrupoVilao(
                grupoVilaoAtual + direcao
            );
        }

        reiniciarAutomaticoViloes();
    }


    function irGrupoVilao(numero) {

        if (modoMobileViloes()) {

            /*
             * Cada bolinha representa um dos
             * três grupos no desktop.
             * No celular, ao tocar nela,
             * abrimos o primeiro vilão daquele grupo.
             */

            mostrarVilaoMobile(
                numero * 3
            );

        } else {

            mostrarGrupoVilao(numero);
        }

        reiniciarAutomaticoViloes();
    }


    function iniciarAutomaticoViloes() {

        clearInterval(intervaloViloes);

        if (
            gruposViloes.length <= 1 &&
            todosViloes.length <= 1
        ) {
            return;
        }

        intervaloViloes =
            setInterval(function () {

                if (modoMobileViloes()) {

                    mostrarVilaoMobile(
                        vilaoMobileAtual + 1
                    );

                } else {

                    mostrarGrupoVilao(
                        grupoVilaoAtual + 1
                    );
                }

            }, tempoViloes);
    }


    function reiniciarAutomaticoViloes() {

        clearInterval(intervaloViloes);

        iniciarAutomaticoViloes();
    }


    if (gruposViloes.length > 0) {

        atualizarCarrosselViloes();

        iniciarAutomaticoViloes();
    }


    // ======================================================
// 14. CONTROLES DOS VILÕES
// ======================================================

const botaoVilaoAnterior =
    document.getElementById("vilaoAnterior");

const botaoVilaoProximo =
    document.getElementById("vilaoProximo");

if (botaoVilaoAnterior) {

    botaoVilaoAnterior.addEventListener(
        "click",
        function () {

            mudarGrupoVilao(-1);

        }
    );

}

if (botaoVilaoProximo) {

    botaoVilaoProximo.addEventListener(
        "click",
        function () {

            mudarGrupoVilao(1);

        }
    );

}


// BOLINHAS DOS GRUPOS

const botoesDotsViloes =
    document.querySelectorAll(".dot-vilao");

botoesDotsViloes.forEach(function(botao) {

    botao.addEventListener(
        "click",
        function() {

            const grupo =
                Number(
                    botao.dataset.grupo
                );

            irGrupoVilao(grupo);

        }
    );

});


// Compatibilidade

window.mudarGrupoVilao =
    mudarGrupoVilao;

window.irGrupoVilao =
    irGrupoVilao;


    // ======================================================
    // 15. PAUSAR VILÕES COM O MOUSE
    // ======================================================

    if (carrosselViloes) {

        carrosselViloes.addEventListener(
            "mouseenter",
            function () {

                clearInterval(
                    intervaloViloes
                );
            }
        );

        carrosselViloes.addEventListener(
            "mouseleave",
            function () {

                iniciarAutomaticoViloes();
            }
        );


        // SWIPE

        let toqueVilaoX = 0;

        carrosselViloes.addEventListener(
            "touchstart",
            function (evento) {

                toqueVilaoX =
                    evento.touches[0].clientX;
            },
            { passive: true }
        );

        carrosselViloes.addEventListener(
            "touchend",
            function (evento) {

                const final =
                    evento.changedTouches[0].clientX;

                const diferenca =
                    toqueVilaoX - final;

                if (
                    Math.abs(diferenca) < 50
                ) {
                    return;
                }

                if (diferenca > 0) {
                    mudarGrupoVilao(1);
                } else {
                    mudarGrupoVilao(-1);
                }
            },
            { passive: true }
        );
    }


    // ======================================================
    // 16. CORREÇÃO DO CARROSSEL AO REDIMENSIONAR
    // ======================================================

    let larguraAnterior =
        window.innerWidth;

    window.addEventListener(
        "resize",
        function () {

            const larguraAtual =
                window.innerWidth;

            const cruzouMobile =
                (
                    larguraAnterior <= 650 &&
                    larguraAtual > 650
                ) ||
                (
                    larguraAnterior > 650 &&
                    larguraAtual <= 650
                );

            if (cruzouMobile) {

                atualizarCarrosselViloes();

                reiniciarAutomaticoViloes();
            }

            larguraAnterior =
                larguraAtual;
        }
    );


    // ======================================================
    // 17. CURIOSIDADES
    // ======================================================

    const curiosidades = [

        "Tobey Maguire protagonizou a trilogia de Homem-Aranha dirigida por Sam Raimi.",

        "A versão de Peter Parker interpretada por Tobey Maguire produz suas teias organicamente.",

        "Andrew Garfield estreou como Peter Parker em O Espetacular Homem-Aranha, lançado em 2012.",

        "Tom Holland apareceu como Homem-Aranha no MCU antes de ganhar seu primeiro filme solo.",

        "Otto Octavius se torna o Doutor Octopus após o acidente envolvendo seu experimento e seus braços mecânicos.",

        "Curt Connors se transforma no Lagarto após seus experimentos de regeneração.",

        "Mysterio utiliza tecnologia, drones e ilusões para manipular aquilo que seus adversários enxergam.",

        "Adrian Toomes utiliza tecnologia alienígena adaptada para construir o equipamento que o transforma no Abutre.",

        "Flint Marko ganha a capacidade de transformar seu corpo em areia.",

        "Norman Osborn assume a identidade do Duende Verde.",

        "Eddie Brock se torna Venom após sua união com o simbionte.",

        "Harry Osborn é filho de Norman Osborn e melhor amigo de Peter Parker na trilogia de Sam Raimi.",

        "As três versões cinematográficas de Peter Parker possuem estilos de combate e tecnologias diferentes.",

        "O sentido-aranha permite que Peter perceba ameaças antes que elas o atinjam.",

        "Doutor Octopus possui quatro braços mecânicos controlados por uma interface ligada ao seu sistema nervoso."

    ];

    const curiosidadeTexto =
        selecionar("#curiosidadeTexto");

    const botaoCuriosidade =
        selecionar("#novaCuriosidade") ||
        selecionar(
            ".curiosidade-box button"
        );

    const numeroCuriosidade =
        selecionar(
            ".curiosidade-lateral strong"
        );

    let curiosidadeAnterior = -1;


    function novaCuriosidade() {

        if (!curiosidadeTexto) return;

        let numeroAleatorio;

        do {

            numeroAleatorio =
                Math.floor(
                    Math.random() *
                    curiosidades.length
                );

        } while (
            numeroAleatorio ===
                curiosidadeAnterior &&
            curiosidades.length > 1
        );

        curiosidadeAnterior =
            numeroAleatorio;


        // Pequena animação de troca.

        curiosidadeTexto.style.opacity = "0";
        curiosidadeTexto.style.transform =
            "translateY(8px)";


        setTimeout(function () {

            curiosidadeTexto.textContent =
                curiosidades[
                    numeroAleatorio
                ];

            if (numeroCuriosidade) {

                numeroCuriosidade.textContent =
                    String(
                        numeroAleatorio + 1
                    ).padStart(2, "0");
            }

            curiosidadeTexto.style.transition =
                "opacity .35s ease, transform .35s ease";

            curiosidadeTexto.style.opacity = "1";
            curiosidadeTexto.style.transform =
                "translateY(0)";

        }, 180);
    }


    if (botaoCuriosidade) {

        botaoCuriosidade.addEventListener(
            "click",
            novaCuriosidade
        );
    }

    window.novaCuriosidade =
        novaCuriosidade;


    // ======================================================
    // 18. EFEITO 3D LEVE NOS CARDS DOS VILÕES
    // ======================================================

    const suportaMouse =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;

    if (suportaMouse) {

        todosViloes.forEach(
            function (card) {

                card.addEventListener(
                    "mousemove",
                    function (evento) {

                        const area =
                            card.getBoundingClientRect();

                        const x =
                            evento.clientX -
                            area.left;

                        const y =
                            evento.clientY -
                            area.top;

                        const centroX =
                            area.width / 2;

                        const centroY =
                            area.height / 2;

                        const rotacaoY =
                            (
                                x - centroX
                            ) / centroX * 1.5;

                        const rotacaoX =
                            -(
                                y - centroY
                            ) / centroY * 1.5;

                        card.style.transform =
                            `perspective(1000px)
                             rotateX(${rotacaoX}deg)
                             rotateY(${rotacaoY}deg)
                             translateY(-3px)`;
                    }
                );

                card.addEventListener(
                    "mouseleave",
                    function () {

                        card.style.transform = "";
                    }
                );
            }
        );
    }


    // ======================================================
    // 19. EFEITO 3D LEVE NOS CARDS DOS QUIZZES
    // ======================================================

    const cardsQuiz =
        selecionarTodos(".quiz-card");

    if (suportaMouse) {

        cardsQuiz.forEach(
            function (card) {

                card.addEventListener(
                    "mousemove",
                    function (evento) {

                        const area =
                            card.getBoundingClientRect();

                        const x =
                            evento.clientX -
                            area.left;

                        const y =
                            evento.clientY -
                            area.top;

                        const rx =
                            -(
                                y -
                                area.height / 2
                            ) / 70;

                        const ry =
                            (
                                x -
                                area.width / 2
                            ) / 70;

                        card.style.transform =
                            `perspective(1100px)
                             rotateX(${rx}deg)
                             rotateY(${ry}deg)
                             translateY(-8px)`;
                    }
                );

                card.addEventListener(
                    "mouseleave",
                    function () {

                        card.style.transform = "";
                    }
                );
            }
        );
    }


    // ======================================================
    // 20. NÚMEROS DA FAIXA VERMELHA
    // ======================================================

    const numerosPortal =
        selecionarTodos(
            ".portal-dado strong"
        );

    function animarNumero(
        elemento,
        destino,
        duracao = 1100
    ) {

        if (!elemento) return;

        const inicio = performance.now();

        function quadro(agora) {

            const progresso =
                limitar(
                    (agora - inicio) /
                    duracao,
                    0,
                    1
                );

            const suavizado =
                1 -
                Math.pow(
                    1 - progresso,
                    3
                );

            const valor =
                Math.round(
                    destino *
                    suavizado
                );

            elemento.textContent =
                String(valor)
                    .padStart(2, "0");

            if (progresso < 1) {
                requestAnimationFrame(
                    quadro
                );
            }
        }

        requestAnimationFrame(quadro);
    }


    if (
        numerosPortal.length > 0 &&
        "IntersectionObserver" in window
    ) {

        let numerosAnimados = false;

        const observadorNumeros =
            new IntersectionObserver(
                function (entradas) {

                    entradas.forEach(
                        function (entrada) {

                            if (
                                entrada.isIntersecting &&
                                !numerosAnimados
                            ) {

                                numerosAnimados = true;

                                numerosPortal.forEach(
                                    function (
                                        numero
                                    ) {

                                        const texto =
                                            numero
                                                .textContent
                                                .trim();

                                        const valor =
                                            parseInt(
                                                texto,
                                                10
                                            );

                                        if (
                                            !Number.isNaN(
                                                valor
                                            )
                                        ) {

                                            animarNumero(
                                                numero,
                                                valor
                                            );
                                        }
                                    }
                                );

                                observadorNumeros.disconnect();
                            }
                        }
                    );
                },
                {
                    threshold: .45
                }
            );

        const portal =
            selecionar(".portal-status");

        if (portal) {
            observadorNumeros.observe(
                portal
            );
        }
    }


    // ======================================================
    // 21. EFEITO DE MOUSE NO HERO
    // ======================================================

    const hero =
        selecionar(".hero");

    const teiaHero1 =
        selecionar(".hero-teia-1");

    const teiaHero2 =
        selecionar(".hero-teia-2");

    if (
        hero &&
        suportaMouse
    ) {

        hero.addEventListener(
            "mousemove",
            function (evento) {

                const x =
                    evento.clientX /
                    window.innerWidth -
                    0.5;

                const y =
                    evento.clientY /
                    window.innerHeight -
                    0.5;

                if (teiaHero1) {

                    teiaHero1.style.transform =
                        `translate(
                            ${x * 20}px,
                            ${y * 20}px
                        )
                        rotate(15deg)`;
                }

                if (teiaHero2) {

                    teiaHero2.style.transform =
                        `translate(
                            ${x * -15}px,
                            ${y * -15}px
                        )`;
                }
            }
        );
    }


    // ======================================================
    // 22. ACESSIBILIDADE — ABA DO NAVEGADOR
    // ======================================================

    document.addEventListener(
        "visibilitychange",
        function () {

            if (document.hidden) {

                clearInterval(
                    intervaloAranhas
                );

                clearInterval(
                    intervaloViloes
                );

            } else {

                iniciarAutomaticoAranhas();

                iniciarAutomaticoViloes();

                reiniciarProgressoAranhas();
            }
        }
    );


    // ======================================================
    // 23. ESTADO INICIAL
    // ======================================================

    atualizarHeroScroll();

    atualizarMenuAtivo();


    console.log(
        "%cMIRANHA // HOME V2",
        "color:#ed1c24;font-size:18px;font-weight:bold;"
    );

    console.log(
        "Sistema do Aranhaverso iniciado."
    );

});