/* =========================================================
   MIRANHA — PERSONAGENS.JS V2
   =========================================================
   01. SISTEMA GLOBAL
   02. TOBEY MAGUIRE — CINEMA / PELÍCULA
   03. ANDREW GARFIELD — OSCORP / INVESTIGAÇÃO
   04. TOM HOLLAND — STARK / HUD
========================================================= */


document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       01 — SISTEMA GLOBAL
    ===================================================== */


    /* -----------------------------------------------------
       DETECTAR QUAL PÁGINA ESTÁ ABERTA
    ----------------------------------------------------- */

    const body = document.body;

    const paginaTobey =
        body.classList.contains("pagina-tobey");

    const paginaAndrew =
        body.classList.contains("pagina-andrew");

    const paginaTom =
        body.classList.contains("pagina-tom");


    console.log(
        "%cMIRANHA V2 // SISTEMA INICIADO",
        "color:#e62429;font-weight:bold;font-size:14px;"
    );


    /* -----------------------------------------------------
       MENU INTELIGENTE
    ----------------------------------------------------- */

    const menuPersonagem =
        document.getElementById("menuPersonagem");


    function atualizarMenu() {

        if (!menuPersonagem) return;

        menuPersonagem.classList.toggle(
            "menu-rolado",
            window.scrollY > 45
        );

    }


    atualizarMenu();


    window.addEventListener(
        "scroll",
        atualizarMenu,
        { passive: true }
    );


    /* -----------------------------------------------------
       ROLAGEM SUAVE PARA LINKS INTERNOS
    ----------------------------------------------------- */

    const linksInternos =
        document.querySelectorAll('a[href^="#"]');


    linksInternos.forEach((link) => {

        link.addEventListener("click", (evento) => {

            const href =
                link.getAttribute("href");


            if (!href || href === "#") {
                return;
            }


            let destino;

            try {

                destino =
                    document.querySelector(href);

            } catch (erro) {

                return;

            }


            if (!destino) {
                return;
            }


            evento.preventDefault();


            const alturaMenu =
                menuPersonagem
                    ? menuPersonagem.offsetHeight
                    : 0;


            const posicao =
                destino.getBoundingClientRect().top +
                window.scrollY -
                alturaMenu;


            window.scrollTo({
                top: posicao,
                behavior: "smooth"
            });

        });

    });


    /* -----------------------------------------------------
       ANIMAÇÕES DE ENTRADA
    ----------------------------------------------------- */

    const elementosAnimados =
        document.querySelectorAll(".secao-animada");


    if ("IntersectionObserver" in window) {

        const observerAnimacao =
            new IntersectionObserver(

                (entradas, observer) => {

                    entradas.forEach((entrada) => {

                        if (!entrada.isIntersecting) {
                            return;
                        }


                        entrada.target.classList.add(
                            "visivel"
                        );


                        observer.unobserve(
                            entrada.target
                        );

                    });

                },

                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }

            );


        elementosAnimados.forEach((elemento) => {

            observerAnimacao.observe(elemento);

        });


    } else {

        elementosAnimados.forEach((elemento) => {

            elemento.classList.add("visivel");

        });

    }


    /* -----------------------------------------------------
       REVELAÇÃO PROGRESSIVA DE CARDS
    ----------------------------------------------------- */

    const cardsRevelacao =
        document.querySelectorAll(`
            .poder-card,
            .habilidade-andrew,
            .modulo-tom,
            .log-item,
            .dado-andrew
        `);


    if (
        "IntersectionObserver" in window &&
        cardsRevelacao.length > 0
    ) {

        cardsRevelacao.forEach((card, indice) => {

            card.style.opacity = "0";
            card.style.transform =
                "translateY(25px)";

            card.style.transition =
                "opacity .6s ease, transform .6s ease";

            card.dataset.atraso =
                String((indice % 4) * 90);

        });


        const observerCards =
            new IntersectionObserver(

                (entradas, observer) => {

                    entradas.forEach((entrada) => {

                        if (!entrada.isIntersecting) {
                            return;
                        }


                        const card =
                            entrada.target;

                        const atraso =
                            Number(card.dataset.atraso) || 0;


                        setTimeout(() => {

                            card.style.opacity = "1";
                            card.style.transform =
                                "translateY(0)";

                        }, atraso);


                        observer.unobserve(card);

                    });

                },

                {
                    threshold: 0.12
                }

            );


        cardsRevelacao.forEach((card) => {

            observerCards.observe(card);

        });

    }


    /* -----------------------------------------------------
       EFEITO 3D LEVE NOS CARDS
       SOMENTE EM COMPUTADOR
    ----------------------------------------------------- */

    const permiteHover =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    if (permiteHover) {

        const cardsTilt =
            document.querySelectorAll(`
                .poder-card,
                .habilidade-andrew,
                .modulo-tom
            `);


        cardsTilt.forEach((card) => {

            card.addEventListener(
                "mousemove",
                (evento) => {

                    const area =
                        card.getBoundingClientRect();


                    const x =
                        evento.clientX -
                        area.left;


                    const y =
                        evento.clientY -
                        area.top;


                    const rotacaoY =
                        ((x / area.width) - 0.5) * 3;


                    const rotacaoX =
                        ((y / area.height) - 0.5) * -3;


                    card.style.transform = `
                        perspective(900px)
                        rotateX(${rotacaoX}deg)
                        rotateY(${rotacaoY}deg)
                        translateY(-4px)
                    `;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "translateY(0)";

                }
            );

        });

    }


    /* -----------------------------------------------------
       FUNÇÕES AUXILIARES
       SERÃO USADAS PELOS 3 ARANHAS
    ----------------------------------------------------- */

    function esperar(tempo) {

        return new Promise((resolver) => {

            setTimeout(resolver, tempo);

        });

    }


    function limitar(numero, minimo, maximo) {

        return Math.min(
            Math.max(numero, minimo),
            maximo
        );

    }


    function trocarTexto(
        elemento,
        texto,
        tempo = 180
    ) {

        if (!elemento) {
            return;
        }


        elemento.style.opacity = "0";


        setTimeout(() => {

            elemento.textContent = texto;
            elemento.style.opacity = "1";

        }, tempo);

    }


    /* =====================================================
       02 — TOBEY MAGUIRE
       CINEMA / PELÍCULA / TRILOGIA
    ===================================================== */

    if (paginaTobey) {


        console.log(
            "%cEARTH-96283 // ARQUIVO CINEMATOGRÁFICO",
            "color:#b32025;font-weight:bold;"
        );


        /* =================================================
           BANCO DE DADOS DA TRILOGIA
        ================================================= */

        const filmesTobey = {

            "2002": {

                imagem:
                    "img/tobey-2002.jpg",

                ano:
                    "2002",

                contador:
                    "01 / 03",

                capitulo:
                    "CAPÍTULO I",

                titulo:
                    "HOMEM-ARANHA",

                subtitulo:
                    "O NASCIMENTO DO HERÓI",

                texto:
                    "Peter Parker descobre seus poderes e aprende que grandes poderes trazem grandes responsabilidades.",

                vilao:
                    "DUENDE VERDE"

            },


            "2004": {

                imagem:
                    "img/tobey-2004.jpg",

                ano:
                    "2004",

                contador:
                    "02 / 03",

                capitulo:
                    "CAPÍTULO II",

                titulo:
                    "HOMEM-ARANHA 2",

                subtitulo:
                    "O PESO DA RESPONSABILIDADE",

                texto:
                    "Peter tenta equilibrar seus sonhos, sua vida pessoal e a responsabilidade de continuar sendo o Homem-Aranha.",

                vilao:
                    "DOUTOR OCTOPUS"

            },


            "2007": {

                imagem:
                    "img/tobey-2007.jpg",

                ano:
                    "2007",

                contador:
                    "03 / 03",

                capitulo:
                    "CAPÍTULO III",

                titulo:
                    "HOMEM-ARANHA 3",

                subtitulo:
                    "O CONFLITO INTERIOR",

                texto:
                    "Peter enfrenta novas ameaças enquanto precisa lidar com seus próprios conflitos e com uma versão mais sombria de si mesmo.",

                vilao:
                    "HOMEM-AREIA / VENOM"

            }

        };


        /* =================================================
           ELEMENTOS DA TIMELINE
        ================================================= */

        const botoesTimeline =
            document.querySelectorAll(
                ".timeline-btn"
            );


        const timelineImagem =
            document.getElementById(
                "timelineImagem"
            );


        const timelineAno =
            document.getElementById(
                "timelineAno"
            );


        const timelineTitulo =
            document.getElementById(
                "timelineTitulo"
            );


        const timelineSubtitulo =
            document.getElementById(
                "timelineSubtitulo"
            );


        const timelineTexto =
            document.getElementById(
                "timelineTexto"
            );


        const timelineVilao =
            document.getElementById(
                "timelineVilao"
            );


        const timelineContador =
            document.getElementById(
                "timelineContador"
            );


        const timelineCapitulo =
            document.getElementById(
                "timelineCapitulo"
            );


        const timelineFrame =
            document.getElementById(
                "timelineFrame"
            );


        let filmeAtual =
            "2002";


        let trocandoFilme =
            false;


        /* =================================================
           TROCAR FILME
        ================================================= */

        async function trocarFilmeTobey(ano) {

            const filme =
                filmesTobey[ano];


            if (
                !filme ||
                trocandoFilme
            ) {
                return;
            }


            if (
                ano === filmeAtual &&
                timelineTitulo?.textContent
            ) {

                botoesTimeline.forEach((botao) => {

                    botao.classList.toggle(
                        "ativo",
                        botao.dataset.filme === ano
                    );

                });


                return;

            }


            trocandoFilme = true;


            /* BOTÃO ATIVO */

            botoesTimeline.forEach((botao) => {

                botao.classList.toggle(
                    "ativo",
                    botao.dataset.filme === ano
                );

            });


            /* FRAME COMEÇA A TROCAR */

            if (timelineFrame) {

                timelineFrame.classList.add(
                    "trocando-frame"
                );

            }


            if (timelineImagem) {

                timelineImagem.style.transition =
                    "opacity .3s ease, transform .55s ease, filter .4s ease";


                timelineImagem.style.opacity =
                    ".15";


                timelineImagem.style.transform =
                    "scale(1.045)";


                timelineImagem.style.filter =
                    "grayscale(1) contrast(1.2)";

            }


            /* TEXTO DESAPARECE */

            const textosTimeline = [

                timelineAno,
                timelineTitulo,
                timelineSubtitulo,
                timelineTexto,
                timelineVilao,
                timelineContador,
                timelineCapitulo

            ];


            textosTimeline.forEach((elemento) => {

                if (!elemento) return;

                elemento.style.transition =
                    "opacity .2s ease";

                elemento.style.opacity =
                    ".15";

            });


            await esperar(280);


            /* TROCA DA IMAGEM */

            if (timelineImagem) {

                timelineImagem.src =
                    filme.imagem;


                timelineImagem.alt =
                    `${filme.titulo} — ${filme.ano}`;

            }


            /* TROCA DAS INFORMAÇÕES */

            if (timelineAno) {
                timelineAno.textContent =
                    filme.ano;
            }


            if (timelineTitulo) {
                timelineTitulo.textContent =
                    filme.titulo;
            }


            if (timelineSubtitulo) {
                timelineSubtitulo.textContent =
                    filme.subtitulo;
            }


            if (timelineTexto) {
                timelineTexto.textContent =
                    filme.texto;
            }


            if (timelineVilao) {
                timelineVilao.textContent =
                    filme.vilao;
            }


            if (timelineContador) {
                timelineContador.textContent =
                    filme.contador;
            }


            if (timelineCapitulo) {
                timelineCapitulo.textContent =
                    filme.capitulo;
            }


            if (timelineFrame) {

                timelineFrame.dataset.frame =
                    filme.ano;

            }


            await esperar(80);


            /* REVELA NOVO FRAME */

            if (timelineImagem) {

                timelineImagem.style.opacity =
                    "1";


                timelineImagem.style.transform =
                    "scale(1)";


                timelineImagem.style.filter =
                    "grayscale(0) contrast(1)";

            }


            textosTimeline.forEach((elemento) => {

                if (!elemento) return;

                elemento.style.opacity =
                    "1";

            });


            if (timelineFrame) {

                setTimeout(() => {

                    timelineFrame.classList.remove(
                        "trocando-frame"
                    );

                }, 400);

            }


            filmeAtual =
                ano;


            trocandoFilme =
                false;

        }


        /* =================================================
           CLIQUE NOS ANOS
        ================================================= */

        botoesTimeline.forEach((botao) => {

            botao.addEventListener(
                "click",
                () => {

                    const ano =
                        botao.dataset.filme;


                    if (!ano) {
                        return;
                    }


                    trocarFilmeTobey(ano);

                }
            );

        });


        /* =================================================
           NAVEGAÇÃO PELO TECLADO NA TIMELINE

           ← filme anterior
           → próximo filme
        ================================================= */

        const anosTimeline =
            ["2002", "2004", "2007"];


        document.addEventListener(
            "keydown",
            (evento) => {

                const timeline =
                    document.getElementById(
                        "timeline"
                    );


                if (!timeline) {
                    return;
                }


                const area =
                    timeline.getBoundingClientRect();


                const timelineVisivel =
                    area.top < window.innerHeight &&
                    area.bottom > 0;


                if (!timelineVisivel) {
                    return;
                }


                const indiceAtual =
                    anosTimeline.indexOf(
                        filmeAtual
                    );


                if (
                    evento.key ===
                    "ArrowRight"
                ) {

                    const proximoIndice =
                        limitar(
                            indiceAtual + 1,
                            0,
                            anosTimeline.length - 1
                        );


                    trocarFilmeTobey(
                        anosTimeline[
                            proximoIndice
                        ]
                    );

                }


                if (
                    evento.key ===
                    "ArrowLeft"
                ) {

                    const indiceAnterior =
                        limitar(
                            indiceAtual - 1,
                            0,
                            anosTimeline.length - 1
                        );


                    trocarFilmeTobey(
                        anosTimeline[
                            indiceAnterior
                        ]
                    );

                }

            }
        );


        /* =================================================
           EFEITO DE MOVIMENTO CINEMATOGRÁFICO
           NA FOTO DA TIMELINE
        ================================================= */

        if (
            timelineFrame &&
            timelineImagem &&
            permiteHover
        ) {

            timelineFrame.addEventListener(
                "mousemove",
                (evento) => {

                    if (trocandoFilme) {
                        return;
                    }


                    const area =
                        timelineFrame
                            .getBoundingClientRect();


                    const porcentagemX =
                        (
                            evento.clientX -
                            area.left
                        ) /
                        area.width;


                    const porcentagemY =
                        (
                            evento.clientY -
                            area.top
                        ) /
                        area.height;


                    const moverX =
                        (porcentagemX - 0.5) * 7;


                    const moverY =
                        (porcentagemY - 0.5) * 5;


                    timelineImagem.style.transform =
                        `scale(1.015)
                         translate(
                            ${moverX}px,
                            ${moverY}px
                         )`;

                }
            );


            timelineFrame.addEventListener(
                "mouseleave",
                () => {

                    if (trocandoFilme) {
                        return;
                    }


                    timelineImagem.style.transform =
                        "scale(1) translate(0,0)";

                }
            );

        }


        /* =================================================
           MODO SIMBIONTE
        ================================================= */

        const botaoSimbionte =
            document.getElementById(
                "ativarSimbionte"
            );


        const simbionteStatus =
            document.getElementById(
                "simbionteStatus"
            );


        const secaoSimbionte =
            document.getElementById(
                "trajeNegro"
            );


        let simbionteAtivo =
            false;


        function atualizarSimbionte() {

            body.classList.toggle(
                "simbionte-ativo",
                simbionteAtivo
            );


            if (secaoSimbionte) {

                secaoSimbionte.classList.toggle(
                    "contaminado",
                    simbionteAtivo
                );

            }


            if (botaoSimbionte) {

                botaoSimbionte.textContent =
                    simbionteAtivo
                        ? "REMOVER SIMBIONTE"
                        : "ATIVAR SIMBIONTE";

            }


            if (simbionteStatus) {

                simbionteStatus.innerHTML =
                    simbionteAtivo
                        ? "<span></span> SIMBIONTE // ATIVO"
                        : "<span></span> SIMBIONTE // INATIVO";

            }

        }


        if (botaoSimbionte) {

            botaoSimbionte.addEventListener(
                "click",
                async () => {

                    if (
                        botaoSimbionte.disabled
                    ) {
                        return;
                    }


                    botaoSimbionte.disabled =
                        true;


                    /* PRIMEIRO ESTÁGIO */

                    if (!simbionteAtivo) {

                        if (simbionteStatus) {

                            simbionteStatus.textContent =
                                "ANALISANDO AMOSTRA...";

                        }


                        await esperar(450);


                        if (simbionteStatus) {

                            simbionteStatus.textContent =
                                "CONTATO DETECTADO...";

                        }


                        await esperar(450);


                        simbionteAtivo =
                            true;


                        atualizarSimbionte();


                    } else {

                        if (simbionteStatus) {

                            simbionteStatus.textContent =
                                "SEPARANDO SIMBIONTE...";

                        }


                        await esperar(550);


                        simbionteAtivo =
                            false;


                        atualizarSimbionte();

                    }


                    await esperar(300);


                    botaoSimbionte.disabled =
                        false;

                }
            );

        }


        /* =================================================
           CONTAMINAÇÃO VISUAL DO SIMBIONTE

           Conforme a seção do traje negro entra na tela,
           a página recebe uma alteração sutil.
        ================================================= */

        if (
            secaoSimbionte &&
            "IntersectionObserver" in window
        ) {

            const observerSimbionte =
                new IntersectionObserver(

                    (entradas) => {

                        entradas.forEach(
                            (entrada) => {

                                body.classList.toggle(
                                    "zona-simbionte",
                                    entrada.isIntersecting
                                );

                            }
                        );

                    },

                    {
                        threshold: 0.25
                    }

                );


            observerSimbionte.observe(
                secaoSimbionte
            );

        }


        /* =================================================
           EFEITO DE PELÍCULA AO ROLAR
        ================================================= */

        const graoTobey =
            document.querySelector(
                ".tobey-grao"
            );


        if (graoTobey) {

            let frameScrollTobey =
                null;


            window.addEventListener(
                "scroll",
                () => {

                    if (frameScrollTobey) {
                        return;
                    }


                    frameScrollTobey =
                        requestAnimationFrame(
                            () => {

                                const deslocamento =
                                    window.scrollY *
                                    0.025;


                                graoTobey.style.transform =
                                    `translateY(
                                        ${deslocamento}px
                                    )`;


                                frameScrollTobey =
                                    null;

                            }
                        );

                },

                { passive: true }

            );

        }


        /* =================================================
           FILM STRIP / DETALHES CINEMATOGRÁFICOS
        ================================================= */

        const tirasFilme =
            document.querySelectorAll(
                ".film-strip"
            );


        tirasFilme.forEach(
            (tira, indice) => {

                tira.style.animationDelay =
                    `${indice * 0.3}s`;

            }
        );


        /* =================================================
           INICIALIZAR TIMELINE
        ================================================= */

        if (botoesTimeline.length > 0) {

            const botaoInicial =
                document.querySelector(
                    '.timeline-btn[data-filme="2002"]'
                );


            if (botaoInicial) {

                botaoInicial.classList.add(
                    "ativo"
                );

            }

        }


        atualizarSimbionte();

    }


    /* =====================================================
       FIM DA PARTE 1
       NÃO FECHE O DOMContentLoaded AQUI.

       PARTE 2 ENTRA EXATAMENTE ABAIXO:
       ANDREW GARFIELD / OSCORP
    ===================================================== */
        /* =====================================================
       03 — ANDREW GARFIELD
       OSCORP / INVESTIGAÇÃO / ENGENHARIA
    ===================================================== */

    if (paginaAndrew) {

        console.log(
            "%cEARTH-120703 // OSCORP DATABASE",
            "color:#42a5ff;font-weight:bold;"
        );


        /* =================================================
           ELEMENTOS PRINCIPAIS DO TERMINAL
        ================================================= */

        const botoesOscorp =
            document.querySelectorAll(
                ".arquivo-oscorp"
            );

        const oscorpCodigo =
            document.getElementById(
                "oscorpCodigo"
            );

        const oscorpTitulo =
            document.getElementById(
                "oscorpTitulo"
            );

        const oscorpTexto =
            document.getElementById(
                "oscorpTexto"
            );

        const oscorpStatus =
            document.getElementById(
                "oscorpStatus"
            );

        const terminalOscorp =
            document.querySelector(
                ".investigacao-terminal"
            );

        const terminalConteudo =
            document.querySelector(
                ".terminal-conteudo"
            );

        const terminalScan =
            document.querySelector(
                ".terminal-scan"
            );


        /* =================================================
           BANCO DE DADOS OSCORP
        ================================================= */

        const arquivosOscorp = {

            aranhas: {

                codigo:
                    "OSCORP // BIO-LAB // 01",

                titulo:
                    "ARANHAS GENETICAMENTE MODIFICADAS",

                texto:
                    "Registro biológico relacionado aos experimentos genéticos conduzidos pela Oscorp. As aranhas do laboratório foram desenvolvidas como parte de pesquisas avançadas envolvendo alterações genéticas.",

                status:
                    "ACESSO PARCIAL // ARQUIVO BIOLÓGICO",

                nivel:
                    "NÍVEL 04",

                progresso:
                    82

            },


            connors: {

                codigo:
                    "OSCORP // SCIENCE // 02",

                titulo:
                    "DR. CURT CONNORS",

                texto:
                    "Pesquisador ligado aos estudos de regeneração genética da Oscorp. Seus experimentos buscavam utilizar características de outras espécies para recuperar tecidos e membros humanos.",

                status:
                    "ARQUIVO RESTRITO // PESQUISADOR OSCORP",

                nivel:
                    "NÍVEL 07",

                progresso:
                    91

            },


            parker: {

                codigo:
                    "OSCORP // CLASSIFIED // 03",

                titulo:
                    "PETER PARKER",

                texto:
                    "Registro identificado nos sistemas da Oscorp. Conexões entre Peter Parker, Richard Parker e pesquisas internas da empresa foram encontradas. Parte das informações permanece classificada.",

                status:
                    "DADOS CLASSIFICADOS // ACESSO LIMITADO",

                nivel:
                    "NÍVEL 10",

                progresso:
                    97

            }

        };


        let arquivoOscorpAtual = null;

        let terminalOcupado = false;

        let digitacaoAtual = 0;


        /* =================================================
           EFEITO DE DIGITAÇÃO
        ================================================= */

        async function digitarTextoOscorp(
            elemento,
            texto,
            velocidade = 12
        ) {

            if (!elemento) {
                return;
            }


            const minhaDigitacao =
                ++digitacaoAtual;


            elemento.textContent = "";


            for (
                let indice = 0;
                indice < texto.length;
                indice++
            ) {

                if (
                    minhaDigitacao !==
                    digitacaoAtual
                ) {
                    return;
                }


                elemento.textContent +=
                    texto[indice];


                /*
                   Pequena variação para não parecer
                   uma máquina digitando sempre no
                   mesmo intervalo.
                */

                if (
                    texto[indice] === "." ||
                    texto[indice] === ","
                ) {

                    await esperar(
                        velocidade * 3
                    );

                } else {

                    await esperar(
                        velocidade
                    );

                }

            }

        }


        /* =================================================
           TEXTO EMBARALHADO / DESCRIPTOGRAFIA
        ================================================= */

        async function descriptografarOscorp(
            elemento,
            texto
        ) {

            if (!elemento) {
                return;
            }


            const caracteres =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&";


            const ciclos = 10;


            for (
                let ciclo = 0;
                ciclo < ciclos;
                ciclo++
            ) {

                let resultado = "";


                for (
                    let indice = 0;
                    indice < texto.length;
                    indice++
                ) {

                    const caractereReal =
                        texto[indice];


                    if (
                        caractereReal === " " ||
                        caractereReal === "/" ||
                        caractereReal === "-"
                    ) {

                        resultado +=
                            caractereReal;

                        continue;

                    }


                    /*
                       Conforme os ciclos avançam,
                       mais letras verdadeiras aparecem.
                    */

                    const limite =
                        texto.length *
                        (ciclo / ciclos);


                    if (indice < limite) {

                        resultado +=
                            caractereReal;

                    } else {

                        resultado +=
                            caracteres[
                                Math.floor(
                                    Math.random() *
                                    caracteres.length
                                )
                            ];

                    }

                }


                elemento.textContent =
                    resultado;


                await esperar(35);

            }


            elemento.textContent =
                texto;

        }


        /* =================================================
           ALTERAR STATUS DO TERMINAL
        ================================================= */

        function statusOscorp(
            mensagem,
            estado = ""
        ) {

            if (!oscorpStatus) {
                return;
            }


            oscorpStatus.textContent =
                mensagem;


            oscorpStatus.dataset.estado =
                estado;

        }


        /* =================================================
           EFEITO DE SCAN DO TERMINAL
        ================================================= */

        function executarScanOscorp() {

            if (!terminalScan) {
                return;
            }


            terminalScan.classList.remove(
                "ativo"
            );


            /*
               Força o navegador a reiniciar
               a animação CSS.
            */

            void terminalScan.offsetWidth;


            terminalScan.classList.add(
                "ativo"
            );


            setTimeout(() => {

                terminalScan.classList.remove(
                    "ativo"
                );

            }, 1000);

        }


        /* =================================================
           ABRIR ARQUIVO OSCORP
        ================================================= */

        async function abrirArquivoOscorp(
            nomeArquivo
        ) {

            const arquivo =
                arquivosOscorp[nomeArquivo];


            if (
                !arquivo ||
                terminalOcupado
            ) {
                return;
            }


            terminalOcupado = true;

            arquivoOscorpAtual =
                nomeArquivo;


            /* BOTÃO ATIVO */

            botoesOscorp.forEach(
                (botao) => {

                    botao.classList.toggle(
                        "ativo",
                        botao.dataset.arquivo ===
                            nomeArquivo
                    );

                }
            );


            /* TERMINAL ENTRA EM PROCESSAMENTO */

            if (terminalOscorp) {

                terminalOscorp.classList.add(
                    "processando"
                );

            }


            statusOscorp(
                "SOLICITANDO ACESSO...",
                "processando"
            );


            executarScanOscorp();


            await esperar(320);


            statusOscorp(
                "VERIFICANDO CREDENCIAIS...",
                "processando"
            );


            await esperar(350);


            if (oscorpCodigo) {

                await descriptografarOscorp(
                    oscorpCodigo,
                    arquivo.codigo
                );

            }


            statusOscorp(
                `ACESSO AUTORIZADO // ${arquivo.nivel}`,
                "autorizado"
            );


            await esperar(250);


            if (oscorpTitulo) {

                await descriptografarOscorp(
                    oscorpTitulo,
                    arquivo.titulo
                );

            }


            await esperar(120);


            if (oscorpTexto) {

                await digitarTextoOscorp(
                    oscorpTexto,
                    arquivo.texto,
                    7
                );

            }


            statusOscorp(
                arquivo.status,
                "concluido"
            );


            if (terminalOscorp) {

                terminalOscorp.classList.remove(
                    "processando"
                );


                terminalOscorp.classList.add(
                    "arquivo-aberto"
                );

            }


            terminalOcupado = false;

        }


        /* =================================================
           BOTÕES DOS ARQUIVOS
        ================================================= */

        botoesOscorp.forEach((botao) => {

            botao.addEventListener(
                "click",
                () => {

                    const arquivo =
                        botao.dataset.arquivo;


                    if (!arquivo) {
                        return;
                    }


                    abrirArquivoOscorp(
                        arquivo
                    );

                }
            );

        });


        /* =================================================
           TERMINAL — EFEITO DE COORDENADAS DO MOUSE
        ================================================= */

        if (
            terminalConteudo &&
            permiteHover
        ) {

            terminalConteudo.addEventListener(
                "mousemove",
                (evento) => {

                    const area =
                        terminalConteudo
                            .getBoundingClientRect();


                    const x =
                        (
                            evento.clientX -
                            area.left
                        ) /
                        area.width;


                    const y =
                        (
                            evento.clientY -
                            area.top
                        ) /
                        area.height;


                    terminalConteudo.style.setProperty(
                        "--mouse-x",
                        `${x * 100}%`
                    );


                    terminalConteudo.style.setProperty(
                        "--mouse-y",
                        `${y * 100}%`
                    );

                }
            );

        }


        /* =================================================
           OSCORP DATABASE — STATUS GLOBAL
        ================================================= */

        const statusGlobalOscorp =
            document.querySelector(
                ".andrew-sistema-status"
            );


        if (statusGlobalOscorp) {

            /*
               Pequena inicialização para dar sensação
               de que a página conectou ao banco.
            */

            const textoOriginal =
                statusGlobalOscorp.innerHTML;


            statusGlobalOscorp.innerHTML =
                "<span></span> CONECTANDO À OSCORP...";


            setTimeout(() => {

                statusGlobalOscorp.innerHTML =
                    "<span></span> AUTENTICANDO...";

            }, 450);


            setTimeout(() => {

                statusGlobalOscorp.innerHTML =
                    textoOriginal;

                statusGlobalOscorp.classList.add(
                    "online"
                );

            }, 900);

        }


        /* =================================================
           HERO — SCANNER DA OSCORP
        ================================================= */

        const heroAndrew =
            document.querySelector(
                ".hero-andrew"
            );


        const imagemHeroAndrew =
            document.querySelector(
                ".hero-andrew-imagem"
            );


        const scanHeroAndrew =
            document.querySelector(
                ".andrew-scan-hero"
            );


        if (heroAndrew) {

            setTimeout(() => {

                heroAndrew.classList.add(
                    "sistema-carregado"
                );

            }, 350);

        }


        if (scanHeroAndrew) {

            /*
               Scanner inicial do personagem.
            */

            setTimeout(() => {

                scanHeroAndrew.classList.add(
                    "escaneando"
                );

            }, 650);


            setTimeout(() => {

                scanHeroAndrew.classList.remove(
                    "escaneando"
                );

            }, 2300);

        }


        /* =================================================
           HERO — MOVIMENTO LEVE DA IMAGEM
        ================================================= */

        if (
            imagemHeroAndrew &&
            permiteHover
        ) {

            imagemHeroAndrew.addEventListener(
                "mousemove",
                (evento) => {

                    const area =
                        imagemHeroAndrew
                            .getBoundingClientRect();


                    const x =
                        (
                            evento.clientX -
                            area.left
                        ) /
                        area.width;


                    const y =
                        (
                            evento.clientY -
                            area.top
                        ) /
                        area.height;


                    const moverX =
                        (x - 0.5) * 5;


                    const moverY =
                        (y - 0.5) * 5;


                    const imagem =
                        imagemHeroAndrew
                            .querySelector("img");


                    if (!imagem) {
                        return;
                    }


                    imagem.style.transform =
                        `scale(1.025)
                         translate(
                            ${moverX}px,
                            ${moverY}px
                         )`;

                }
            );


            imagemHeroAndrew.addEventListener(
                "mouseleave",
                () => {

                    const imagem =
                        imagemHeroAndrew
                            .querySelector("img");


                    if (!imagem) {
                        return;
                    }


                    imagem.style.transform =
                        "scale(1) translate(0,0)";

                }
            );

        }


        /* =================================================
           WEB-SHOOTER
        ================================================= */

        const dispararTeia =
            document.getElementById(
                "dispararTeia"
            );


        const efeitoTeia =
            document.getElementById(
                "efeitoTeia"
            );


        let teiaEmUso =
            false;


        let quantidadeDisparos =
            0;


        async function usarWebShooter() {

            if (
                teiaEmUso ||
                !dispararTeia
            ) {
                return;
            }


            teiaEmUso =
                true;


            quantidadeDisparos++;


            const textoOriginal =
                dispararTeia.innerHTML;


            dispararTeia.disabled =
                true;


            dispararTeia.innerHTML =
                "<span>◉</span> CARREGANDO...";


            await esperar(180);


            dispararTeia.innerHTML =
                "<span>◉</span> PRESSÃO OK";


            await esperar(160);


            /* DISPARO */

            if (efeitoTeia) {

                efeitoTeia.classList.remove(
                    "disparada"
                );


                void efeitoTeia.offsetWidth;


                efeitoTeia.classList.add(
                    "disparada"
                );

            }


            dispararTeia.innerHTML =
                "<span>◉</span> TEIA DISPARADA";


            /*
               Pequena reação visual na página.
            */

            body.classList.add(
                "andrew-teia-disparada"
            );


            await esperar(480);


            body.classList.remove(
                "andrew-teia-disparada"
            );


            if (efeitoTeia) {

                efeitoTeia.classList.remove(
                    "disparada"
                );

            }


            /*
               A cada terceiro disparo,
               fazemos uma checagem rápida.
            */

            if (
                quantidadeDisparos % 3 === 0
            ) {

                dispararTeia.innerHTML =
                    "<span>◉</span> VERIFICANDO CARTUCHO...";


                await esperar(450);


                dispararTeia.innerHTML =
                    "<span>✓</span> CARTUCHO OK";


                await esperar(400);

            }


            dispararTeia.innerHTML =
                textoOriginal;


            dispararTeia.disabled =
                false;


            teiaEmUso =
                false;

        }


        if (dispararTeia) {

            dispararTeia.addEventListener(
                "click",
                usarWebShooter
            );

        }


        /* =================================================
           MIRA DO HERO
        ================================================= */

        const miraAndrew =
            document.querySelector(
                ".andrew-mira"
            );


        if (
            miraAndrew &&
            imagemHeroAndrew &&
            permiteHover
        ) {

            imagemHeroAndrew.addEventListener(
                "mousemove",
                (evento) => {

                    const area =
                        imagemHeroAndrew
                            .getBoundingClientRect();


                    const x =
                        limitar(
                            evento.clientX -
                                area.left,
                            0,
                            area.width
                        );


                    const y =
                        limitar(
                            evento.clientY -
                                area.top,
                            0,
                            area.height
                        );


                    miraAndrew.style.left =
                        `${x}px`;


                    miraAndrew.style.top =
                        `${y}px`;

                }
            );

        }


        /* =================================================
           DADOS DO ARQUIVO — EFEITO DE LEITURA
        ================================================= */

        const dadosAndrew =
            document.querySelectorAll(
                ".dado-andrew"
            );


        dadosAndrew.forEach(
            (dado, indice) => {

                dado.addEventListener(
                    "mouseenter",
                    () => {

                        if (!permiteHover) {
                            return;
                        }


                        dado.dataset.lendo =
                            "true";


                        setTimeout(() => {

                            if (
                                dado.dataset.lendo ===
                                "true"
                            ) {

                                dado.classList.add(
                                    "dado-lido"
                                );

                            }

                        }, 180 + indice * 20);

                    }
                );


                dado.addEventListener(
                    "mouseleave",
                    () => {

                        dado.dataset.lendo =
                            "false";

                    }
                );

            }
        );


        /* =================================================
           HABILIDADES — IDENTIFICAÇÃO
        ================================================= */

        const habilidadesAndrew =
            document.querySelectorAll(
                ".habilidade-andrew"
            );


        habilidadesAndrew.forEach(
            (habilidade, indice) => {

                habilidade.dataset.registro =
                    String(indice + 1)
                        .padStart(2, "0");


                habilidade.addEventListener(
                    "click",
                    () => {

                        habilidadesAndrew.forEach(
                            (item) => {

                                item.classList.remove(
                                    "selecionada"
                                );

                            }
                        );


                        habilidade.classList.add(
                            "selecionada"
                        );

                    }
                );

            }
        );


        /* =================================================
           MOVIMENTO / STREET NYC
        ================================================= */

        const secaoMovimento =
            document.querySelector(
                ".movimento-andrew"
            );


        if (
            secaoMovimento &&
            "IntersectionObserver" in window
        ) {

            const observerMovimento =
                new IntersectionObserver(

                    (entradas) => {

                        entradas.forEach(
                            (entrada) => {

                                body.classList.toggle(
                                    "andrew-em-movimento",
                                    entrada.isIntersecting
                                );

                            }
                        );

                    },

                    {
                        threshold: 0.35
                    }

                );


            observerMovimento.observe(
                secaoMovimento
            );

        }


        /* =================================================
           PARALLAX LEVE DO HERO
        ================================================= */

        if (heroAndrew) {

            let frameAndrew =
                null;


            window.addEventListener(
                "scroll",
                () => {

                    if (frameAndrew) {
                        return;
                    }


                    frameAndrew =
                        requestAnimationFrame(
                            () => {

                                const scroll =
                                    window.scrollY;


                                /*
                                   Só trabalha enquanto o hero
                                   estiver relativamente próximo.
                                */

                                if (
                                    scroll <
                                    window.innerHeight *
                                        1.3
                                ) {

                                    heroAndrew.style.setProperty(
                                        "--andrew-scroll",
                                        `${scroll * 0.06}px`
                                    );

                                }


                                frameAndrew =
                                    null;

                            }
                        );

                },

                { passive: true }

            );

        }


        /* =================================================
           LINK DIRETO PARA INVESTIGAÇÃO
        ================================================= */

        const linkInvestigacao =
            document.querySelector(
                'a[href="#investigacao"]'
            );


        if (linkInvestigacao) {

            linkInvestigacao.addEventListener(
                "click",
                () => {

                    /*
                       Quando chegar ao terminal,
                       ele ganha um pequeno pulso.
                    */

                    setTimeout(() => {

                        if (!terminalOscorp) {
                            return;
                        }


                        terminalOscorp.classList.add(
                            "terminal-destacado"
                        );


                        setTimeout(() => {

                            terminalOscorp.classList.remove(
                                "terminal-destacado"
                            );

                        }, 1200);

                    }, 650);

                }
            );

        }


        /* =================================================
           INICIALIZAÇÃO DO TERMINAL
        ================================================= */

        if (oscorpStatus) {

            oscorpStatus.textContent =
                "AGUARDANDO SELEÇÃO DE ARQUIVO...";

        }


        if (oscorpCodigo) {

            oscorpCodigo.textContent =
                "OSCORP // DATABASE";

        }


        /*
           Não abrimos automaticamente um arquivo.
           A ideia é o usuário realmente investigar.
        */

    }


    /* =====================================================
       FIM DA PARTE 2

       NÃO COLOQUE }); AQUI.

       A PARTE 3 ENTRA LOGO ABAIXO:
       TOM HOLLAND — STARK / HUD

       E A PARTE 3 VAI FECHAR:
       });
    ===================================================== */
        /* =====================================================
       04 — TOM HOLLAND
       STARK / HUD / TECNOLOGIA
    ===================================================== */

   /* =========================================================
   TOM HOLLAND — V2.1
   STARK SYSTEM / INTERAÇÕES
========================================================= */

if (paginaTom) {

    /* =====================================================
       ELEMENTOS PRINCIPAIS
    ===================================================== */

    const heroTom = document.querySelector(".hero-tom");

    const statusTom = document.querySelector(".tom-status");
    const codigoTom = document.querySelector(".tom-codigo");

    const botaoScan = document.getElementById("iniciarScan");
    const resultadoScan = document.getElementById("resultadoScan");

    const hudImagem = document.querySelector(".hud-imagem");
    const barrasSistema = document.querySelectorAll(".barra-sistema span");

    const modulosTom = document.querySelectorAll(".modulo-tom");

    const fasesTom = document.querySelectorAll(".fase-tom");

    const evolucaoTom = document.querySelector(".evolucao-tom");
    const evolucaoItens = document.querySelectorAll(".evolucao-item");
    const evolucaoConectores = document.querySelectorAll(".evolucao-conector");

    const ameacasTom = document.querySelectorAll(".ameaca-tom");

    const logsTom = document.querySelectorAll(".log-item");

    let scanExecutando = false;
    let notificacaoTimer = null;


    /* =====================================================
       NOTIFICAÇÃO STARK
    ===================================================== */

    function mostrarNotificacaoTom(texto, duracao = 2600) {

        let notificacao =
            document.getElementById("notificacaoTom");

        if (!notificacao) {

            notificacao = document.createElement("div");

            notificacao.id = "notificacaoTom";
            notificacao.className = "notificacao-tom";

            notificacao.setAttribute(
                "aria-live",
                "polite"
            );

            document.body.appendChild(notificacao);
        }


        notificacao.textContent = texto;

        notificacao.classList.add("ativa");


        clearTimeout(notificacaoTimer);


        notificacaoTimer = setTimeout(() => {

            notificacao.classList.remove("ativa");

        }, duracao);
    }


    /* =====================================================
       INICIALIZAÇÃO DO SISTEMA
    ===================================================== */

    async function iniciarSistemaTom() {

        body.classList.add("tom-inicializando");


        if (statusTom) {

            statusTom.innerHTML = `
                <span class="status-ponto"></span>
                SISTEMA INICIANDO
            `;
        }


        if (codigoTom) {

            codigoTom.textContent =
                "STARK_OS // BOOT";
        }


        await esperar(450);


        if (codigoTom) {

            codigoTom.textContent =
                "CARREGANDO HUD // 38%";
        }


        await esperar(350);


        if (codigoTom) {

            codigoTom.textContent =
                "SPIDER_SYSTEM // 72%";
        }


        await esperar(350);


        if (statusTom) {

            statusTom.innerHTML = `
                <span class="status-ponto"></span>
                CONECTANDO SENSORES
            `;
        }


        if (codigoTom) {

            codigoTom.textContent =
                "STARK_OS // 94%";
        }


        await esperar(400);


        if (statusTom) {

            statusTom.innerHTML = `
                <span class="status-ponto"></span>
                SISTEMA ONLINE
            `;
        }


        if (codigoTom) {

            codigoTom.textContent =
                "STARK_OS // SPIDER_SYSTEM";
        }


        body.classList.remove("tom-inicializando");

        body.classList.add(
            "tom-online",
            "sistema-carregado"
        );


        setTimeout(() => {

            mostrarNotificacaoTom(
                "STARK_OS // SISTEMA DO HOMEM-ARANHA ONLINE"
            );

        }, 250);
    }


    iniciarSistemaTom();


    /* =====================================================
       BARRAS DO TRAJE
    ===================================================== */

    const niveisSistema = [
        "98%",
        "94%",
        "91%",
        "96%",
        "100%"
    ];


    barrasSistema.forEach((barra, indice) => {

        barra.style.setProperty(
            "--nivel",
            niveisSistema[indice] || "100%"
        );

    });


    const sistemaTraje =
        document.querySelector(".sistema-traje");


    if (sistemaTraje && barrasSistema.length) {

        const observerBarras =
            new IntersectionObserver(

                entradas => {

                    entradas.forEach(entrada => {

                        if (!entrada.isIntersecting) {
                            return;
                        }


                        barrasSistema.forEach(
                            (barra, indice) => {

                                setTimeout(() => {

                                    barra.classList.add(
                                        "barra-ativa"
                                    );

                                }, indice * 160);

                            }
                        );


                        observerBarras.unobserve(
                            entrada.target
                        );

                    });

                },

                {
                    threshold: 0.28
                }

            );


        observerBarras.observe(sistemaTraje);
    }


    /* =====================================================
       SCANNER PRINCIPAL
    ===================================================== */

    const etapasScan = [

        {
            texto:
                "CALIBRANDO SENSORES...",
            tempo: 650
        },

        {
            texto:
                "ANALISANDO ESTRUTURA DO TRAJE...",
            tempo: 800
        },

        {
            texto:
                "VERIFICANDO LANÇADORES DE TEIA...",
            tempo: 750
        },

        {
            texto:
                "TESTANDO SISTEMA DE COMUNICAÇÃO...",
            tempo: 700
        },

        {
            texto:
                "ANALISANDO SISTEMA DE COMBATE...",
            tempo: 750
        },

        {
            texto:
                "VERIFICANDO SENSORES DE MOVIMENTO...",
            tempo: 700
        }

    ];


    async function executarScanTom() {

        if (
            scanExecutando ||
            !botaoScan ||
            !resultadoScan
        ) {
            return;
        }


        scanExecutando = true;

        botaoScan.disabled = true;

        botaoScan.textContent =
            "SCAN EM ANDAMENTO";


        body.classList.remove(
            "tom-scan-concluido"
        );

        body.classList.add(
            "tom-scan-ativo"
        );


        mostrarNotificacaoTom(
            "STARK_OS // INICIANDO DIAGNÓSTICO",
            1800
        );


        for (
            let i = 0;
            i < etapasScan.length;
            i++
        ) {

            const etapa = etapasScan[i];


            resultadoScan.textContent =
                `[${String(i + 1).padStart(2, "0")}/${String(etapasScan.length).padStart(2, "0")}] ${etapa.texto}`;


            if (hudImagem) {

                hudImagem.dataset.scan =
                    String(i + 1);
            }


            await esperar(etapa.tempo);
        }


        resultadoScan.textContent =
            "SCAN CONCLUÍDO // TODOS OS SISTEMAS OPERACIONAIS";


        body.classList.remove(
            "tom-scan-ativo"
        );

        body.classList.add(
            "tom-scan-concluido"
        );


        botaoScan.textContent =
            "EXECUTAR NOVO SCAN";

        botaoScan.disabled = false;


        mostrarNotificacaoTom(
            "DIAGNÓSTICO CONCLUÍDO // NENHUMA FALHA CRÍTICA DETECTADA",
            3300
        );


        scanExecutando = false;


        setTimeout(() => {

            body.classList.remove(
                "tom-scan-concluido"
            );

        }, 5500);
    }


    if (botaoScan) {

        botaoScan.addEventListener(
            "click",
            executarScanTom
        );

    }


    /* =====================================================
       TECLA S = SCANNER
       SÓ FUNCIONA PRÓXIMO DO SISTEMA DO TRAJE
    ===================================================== */

    document.addEventListener(
        "keydown",
        evento => {

            if (
                evento.key.toLowerCase() !== "s" ||
                scanExecutando ||
                !sistemaTraje
            ) {
                return;
            }


            const rect =
                sistemaTraje.getBoundingClientRect();


            const sistemaVisivel =
                rect.top < window.innerHeight * 0.75 &&
                rect.bottom > window.innerHeight * 0.25;


            if (sistemaVisivel) {

                executarScanTom();

            }

        }
    );


    /* =====================================================
       MÓDULOS DO TRAJE
    ===================================================== */

    const nomesModulos = {

        visual:
            "LENTES TÁTICAS // SISTEMA VISUAL OPERACIONAL",

        teia:
            "WEB SYSTEM // LANÇADORES DE TEIA PRONTOS",

        combate:
            "COMBAT SYSTEM // ASSISTÊNCIA ATIVA",

        sensor:
            "SENSOR SYSTEM // ALERTA DE PERIGO ATIVO",

        comunicacao:
            "COMMUNICATION // CANAL OPERACIONAL",

        protecao:
            "PROTECTION // ESTRUTURA DO TRAJE ESTÁVEL"

    };


    function selecionarModuloTom(modulo) {

        modulosTom.forEach(item => {

            item.classList.remove(
                "selecionado"
            );

        });


        modulo.classList.add(
            "selecionado"
        );


        const tipo =
            modulo.dataset.modulo;


        mostrarNotificacaoTom(
            nomesModulos[tipo] ||
            "MÓDULO SELECIONADO"
        );

    }


    modulosTom.forEach(modulo => {

        modulo.setAttribute(
            "tabindex",
            "0"
        );


        modulo.setAttribute(
            "role",
            "button"
        );


        modulo.addEventListener(
            "click",
            () => {

                selecionarModuloTom(
                    modulo
                );

            }
        );


        modulo.addEventListener(
            "keydown",
            evento => {

                if (
                    evento.key === "Enter" ||
                    evento.key === " "
                ) {

                    evento.preventDefault();

                    selecionarModuloTom(
                        modulo
                    );

                }

            }
        );

    });


    /* =====================================================
       PERFIL DO PETER
    ===================================================== */

    const perfilTom =
        document.querySelector(".perfil-tom");


    if (perfilTom) {

        const observerPerfil =
            new IntersectionObserver(

                entradas => {

                    entradas.forEach(entrada => {

                        if (!entrada.isIntersecting) {
                            return;
                        }


                        perfilTom.classList.add(
                            "perfil-identificado"
                        );


                        mostrarNotificacaoTom(
                            "IDENTIDADE CONFIRMADA // PETER PARKER",
                            2200
                        );


                        observerPerfil.unobserve(
                            perfilTom
                        );

                    });

                },

                {
                    threshold: 0.42
                }

            );


        observerPerfil.observe(perfilTom);
    }


    /* =====================================================
       TRAJETÓRIA
       2017 → 2019 → 2021
    ===================================================== */

    function ativarFaseTom(
        faseAtiva,
        indice
    ) {

        fasesTom.forEach(fase => {

            fase.classList.remove(
                "fase-ativa"
            );

        });


        faseAtiva.classList.add(
            "fase-ativa"
        );


        body.classList.remove(
            "tom-fase-2017",
            "tom-fase-2019",
            "tom-fase-2021"
        );


        const anos = [
            "2017",
            "2019",
            "2021"
        ];


        const ano =
            anos[indice];


        if (ano) {

            body.classList.add(
                `tom-fase-${ano}`
            );

        }

    }


    if (fasesTom.length) {

        const observerFases =
            new IntersectionObserver(

                entradas => {

                    entradas.forEach(entrada => {

                        if (
                            !entrada.isIntersecting
                        ) {
                            return;
                        }


                        const indice =
                            [...fasesTom]
                                .indexOf(
                                    entrada.target
                                );


                        ativarFaseTom(
                            entrada.target,
                            indice
                        );

                    });

                },

                {
                    threshold: 0.46,
                    rootMargin:
                        "-8% 0px -8% 0px"
                }

            );


        fasesTom.forEach(fase => {

            observerFases.observe(fase);

        });

    }


    /* =====================================================
       EVOLUÇÃO DOS TRAJES
    ===================================================== */

    let evolucaoExecutada = false;


    async function executarEvolucaoTom() {

        if (evolucaoExecutada) {
            return;
        }


        evolucaoExecutada = true;


        for (
            let i = 0;
            i < evolucaoItens.length;
            i++
        ) {

            evolucaoItens[i]
                .classList.add(
                    "evolucao-ativa"
                );


            if (
                i > 0 &&
                evolucaoConectores[i - 1]
            ) {

                evolucaoConectores[i - 1]
                    .classList.add(
                        "evolucao-ativa"
                    );

            }


            await esperar(430);
        }


        mostrarNotificacaoTom(
            "SUIT EVOLUTION // TRAJETÓRIA CARREGADA",
            2500
        );

    }


    if (
        evolucaoTom &&
        evolucaoItens.length
    ) {

        const observerEvolucao =
            new IntersectionObserver(

                entradas => {

                    entradas.forEach(entrada => {

                        if (!entrada.isIntersecting) {
                            return;
                        }


                        executarEvolucaoTom();


                        observerEvolucao.unobserve(
                            entrada.target
                        );

                    });

                },

                {
                    threshold: 0.35
                }

            );


        observerEvolucao.observe(
            evolucaoTom
        );

    }


    /* =====================================================
       AMEAÇAS
    ===================================================== */

    const nomesAmeacas = [
        "ABUTRE // ADRIAN TOOMES",
        "MYSTERIO // QUENTIN BECK",
        "DUENDE VERDE // NORMAN OSBORN"
    ];


    ameacasTom.forEach(
        (ameaca, indice) => {

            ameaca.addEventListener(
                "mouseenter",
                () => {

                    ameacasTom.forEach(item => {

                        item.classList.remove(
                            "ameaca-ativa"
                        );

                    });


                    ameaca.classList.add(
                        "ameaca-ativa"
                    );

                }
            );


            ameaca.addEventListener(
                "mouseleave",
                () => {

                    ameaca.classList.remove(
                        "ameaca-ativa"
                    );

                }
            );


            /*
               No celular não bloqueamos o link.
               A animação visual acontece pelo toque
               e a página do vilão continua abrindo.
            */

            ameaca.addEventListener(
                "pointerdown",
                () => {

                    ameaca.classList.add(
                        "ameaca-ativa"
                    );

                }
            );


            ameaca.setAttribute(
                "data-identificacao",
                nomesAmeacas[indice] ||
                "AMEAÇA IDENTIFICADA"
            );

        }
    );


    /* =====================================================
       LOGS — ENTRADA PROGRESSIVA
    ===================================================== */

    if (logsTom.length) {

        const observerLogs =
            new IntersectionObserver(

                entradas => {

                    entradas.forEach(entrada => {

                        if (!entrada.isIntersecting) {
                            return;
                        }


                        const indice =
                            [...logsTom]
                                .indexOf(
                                    entrada.target
                                );


                        setTimeout(() => {

                            entrada.target.classList.add(
                                "log-ativo"
                            );

                        }, indice * 110);


                        observerLogs.unobserve(
                            entrada.target
                        );

                    });

                },

                {
                    threshold: 0.2
                }

            );


        logsTom.forEach(log => {

            observerLogs.observe(log);

        });

    }


    /* =====================================================
       PARALLAX MUITO LEVE NO HERO
    ===================================================== */

    const imagemHeroTom =
        document.querySelector(
            ".hero-tom-imagem"
        );


    if (
        heroTom &&
        imagemHeroTom &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        heroTom.addEventListener(
            "mousemove",
            evento => {

                const rect =
                    heroTom.getBoundingClientRect();


                const x =
                    (
                        evento.clientX -
                        rect.left
                    ) /
                    rect.width -
                    0.5;


                const y =
                    (
                        evento.clientY -
                        rect.top
                    ) /
                    rect.height -
                    0.5;


                imagemHeroTom.style.setProperty(
                    "--tom-mouse-x",
                    `${x * 7}px`
                );


                imagemHeroTom.style.setProperty(
                    "--tom-mouse-y",
                    `${y * 5}px`
                );

            }
        );


        heroTom.addEventListener(
            "mouseleave",
            () => {

                imagemHeroTom.style.setProperty(
                    "--tom-mouse-x",
                    "0px"
                );


                imagemHeroTom.style.setProperty(
                    "--tom-mouse-y",
                    "0px"
                );

            }
        );

    }


    /* =====================================================
       STATUS CONFORME A ÁREA DA PÁGINA
    ===================================================== */

    const secoesSistema = [

        {
            elemento:
                document.querySelector(
                    ".sistema-traje"
                ),

            codigo:
                "STARK_OS // SUIT_DIAGNOSTIC"
        },

        {
            elemento:
                document.querySelector(
                    ".perfil-tom"
                ),

            codigo:
                "PROFILE // PETER_PARKER"
        },

        {
            elemento:
                document.querySelector(
                    ".modulos-tom"
                ),

            codigo:
                "SPIDER_SYSTEM // MODULES"
        },

        {
            elemento:
                document.querySelector(
                    ".fases-tom"
                ),

            codigo:
                "ARCHIVE // TIMELINE"
        },

        {
            elemento:
                document.querySelector(
                    ".evolucao-tom"
                ),

            codigo:
                "SUIT // EVOLUTION"
        },

        {
            elemento:
                document.querySelector(
                    ".ameacas-tom"
                ),

            codigo:
                "THREAT_DATABASE // ACTIVE"
        },

        {
            elemento:
                document.querySelector(
                    ".logs-tom"
                ),

            codigo:
                "STARK_DATABASE // LOGS"
        }

    ].filter(
        item => item.elemento
    );


    if (
        secoesSistema.length &&
        codigoTom
    ) {

        const observerSistema =
            new IntersectionObserver(

                entradas => {

                    const visiveis =
                        entradas
                            .filter(
                                entrada =>
                                    entrada.isIntersecting
                            )
                            .sort(
                                (a, b) =>
                                    b.intersectionRatio -
                                    a.intersectionRatio
                            );


                    if (!visiveis.length) {
                        return;
                    }


                    const secao =
                        secoesSistema.find(
                            item =>
                                item.elemento ===
                                visiveis[0].target
                        );


                    if (secao) {

                        codigoTom.textContent =
                            secao.codigo;

                    }

                },

                {
                    threshold: [
                        0.2,
                        0.35,
                        0.5
                    ]
                }

            );


        secoesSistema.forEach(item => {

            observerSistema.observe(
                item.elemento
            );

        });

    }


    /* =====================================================
       ESTADO INICIAL
    ===================================================== */

    if (resultadoScan) {

        resultadoScan.textContent =
            "SISTEMA PRONTO // AGUARDANDO COMANDO";

    }

}

    /* =====================================================
       05 — SISTEMA GLOBAL FINAL
    ===================================================== */


    /* -----------------------------------------------------
       REDUZIR ANIMAÇÕES
       Respeita configuração do dispositivo
    ----------------------------------------------------- */

    const prefereMenosMovimento =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefereMenosMovimento) {

        body.classList.add(
            "movimento-reduzido"
        );

    }


    /* -----------------------------------------------------
       MARCAR PÁGINA COMO CARREGADA
    ----------------------------------------------------- */

    requestAnimationFrame(() => {

        body.classList.add(
            "pagina-carregada"
        );

    });


    /* -----------------------------------------------------
       TRATAMENTO DE IMAGENS QUE NÃO CARREGARAM
    ----------------------------------------------------- */

    const imagensPersonagens =
        document.querySelectorAll("img");


    imagensPersonagens.forEach((imagem) => {

        imagem.addEventListener(
            "error",
            () => {

                imagem.classList.add(
                    "imagem-indisponivel"
                );


                console.warn(
                    `MIRANHA // Imagem não encontrada: ${imagem.src}`
                );

            }
        );

    });


    /* -----------------------------------------------------
       FINALIZAÇÃO
    ----------------------------------------------------- */

    console.log(
        "%cMIRANHA V2 // PERSONAGENS.JS CARREGADO",
        "color:#ffffff;background:#b32025;padding:4px 8px;font-weight:bold;"
    );


}); // FIM DO DOMContentLoaded