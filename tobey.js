/* =========================================================
   MIRANHA — TOBEY.JS
   JavaScript exclusivo da página Tobey

   FUNÇÕES:
   1. Menu suave
   2. Timeline 2002 / 2004 / 2007
   3. Carrossel dos 4 trajes
   4. Indicadores dos trajes
   5. Painel de informações dos trajes
   6. Modo visual do traje preto
   7. Botão do simbionte
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. CONFIRMA QUE ESTAMOS NA PÁGINA TOBEY
    ===================================================== */

    const paginaTobey = document.querySelector(".pagina-tobey");

    if (!paginaTobey) {
        return;
    }


    /* =====================================================
       2. MENU — ROLAGEM SUAVE
    ===================================================== */

    const linksInternos = document.querySelectorAll(
        '.pagina-tobey a[href^="#"]'
    );

    linksInternos.forEach((link) => {

        link.addEventListener("click", (event) => {

            const destinoId = link.getAttribute("href");

            if (!destinoId || destinoId === "#") {
                return;
            }

            const destino = document.querySelector(destinoId);

            if (!destino) {
                return;
            }

            event.preventDefault();

            destino.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       3. TIMELINE — DADOS DOS FILMES
    ===================================================== */

    const timelineDados = {

        "2002": {
            ano: "2002",
            titulo: "HOMEM-ARANHA",
            subtitulo: "O NASCIMENTO DO HERÓI",
            texto:
                "Peter Parker descobre seus poderes e aprende que grandes habilidades também trazem grandes responsabilidades.",
            vilao: "DUENDE VERDE",
            imagem: "img/tobey-2002.jpg"
        },

        "2004": {
            ano: "2004",
            titulo: "HOMEM-ARANHA 2",
            subtitulo: "O PESO DA RESPONSABILIDADE",
            texto:
                "Peter enfrenta o conflito entre sua vida pessoal e a responsabilidade de continuar sendo o Homem-Aranha.",
            vilao: "DOUTOR OCTOPUS",
            imagem: "img/tobey-2004.jpg"
        },

        "2007": {
            ano: "2007",
            titulo: "HOMEM-ARANHA 3",
            subtitulo: "O LADO SOMBRIO",
            texto:
                "Novos inimigos e o simbionte levam Peter a enfrentar uma versão mais sombria de si mesmo.",
            vilao: "HOMEM-AREIA / VENOM",
            imagem: "img/tobey-2007.jpg"
        }

    };


    /* =====================================================
       4. ELEMENTOS DA TIMELINE
    ===================================================== */

    const timelineBotoes =
        document.querySelectorAll(".timeline-btn");

    const timelineImagem =
        document.getElementById("timelineImagem");

    const timelineAno =
        document.getElementById("timelineAno");

    const timelineTitulo =
        document.getElementById("timelineTitulo");

    const timelineSubtitulo =
        document.getElementById("timelineSubtitulo");

    const timelineTexto =
        document.getElementById("timelineTexto");

    const timelineVilao =
        document.getElementById("timelineVilao");


    /* =====================================================
       5. TROCAR FILME DA TIMELINE
    ===================================================== */

    function trocarFilme(ano) {

        const filme = timelineDados[ano];

        if (!filme) {
            return;
        }


        /* BOTÃO ATIVO */

        timelineBotoes.forEach((botao) => {

            const ativo =
                botao.dataset.filme === ano;

            botao.classList.toggle(
                "ativo",
                ativo
            );

        });


        /* TROCA DOS TEXTOS */

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


        /* TROCA DA IMAGEM */

        if (timelineImagem) {

            timelineImagem.style.opacity = "0";

            setTimeout(() => {

                timelineImagem.src =
                    filme.imagem;

                timelineImagem.alt =
                    filme.titulo;

                timelineImagem.style.opacity =
                    "1";

            }, 180);

        }

    }


    /* CLIQUE NOS ANOS */

    timelineBotoes.forEach((botao) => {

        botao.addEventListener(
            "click",
            () => {

                const ano =
                    botao.dataset.filme;

                trocarFilme(ano);

            }
        );

    });


    /* =====================================================
       6. CARROSSEL DOS TRAJES
    ===================================================== */

    const trajes = [
        {
            chave: "lutador",
            codigo: "WARDROBE // FILE 01",
            numero: "01",
            status: "ORIGEM",
            titulo: "HUMAN SPIDER",
            texto:
                "O primeiro uniforme improvisado utilizado por Peter antes de assumir definitivamente a identidade do Homem-Aranha.",
            tipo: "IMPROVISADO",
            fase: "ORIGEM",
            arquivo: "2002"
        },

        {
            chave: "classico",
            codigo: "WARDROBE // FILE 02",
            numero: "02",
            status: "HERÓI",
            titulo: "TRAJE CLÁSSICO",
            texto:
                "O uniforme que define a identidade visual do Homem-Aranha e acompanha Peter durante sua jornada como herói.",
            tipo: "CLÁSSICO",
            fase: "HERÓI",
            arquivo: "2002"
        },

        {
            chave: "danificado",
            codigo: "WARDROBE // FILE 03",
            numero: "03",
            status: "BATALHA",
            titulo: "TRAJE DANIFICADO",
            texto:
                "O traje após confrontos intensos, mostrando visualmente o desgaste e o custo físico da vida de Peter como Homem-Aranha.",
            tipo: "DANIFICADO",
            fase: "BATALHA",
            arquivo: "2002"
        },

        {
            chave: "preto",
            codigo: "WARDROBE // FILE 04",
            numero: "04",
            status: "SYMBIOTE DETECTED",
            titulo: "TRAJE PRETO",
            texto:
                "O simbionte modifica o uniforme e amplifica o poder de Peter, enquanto também começa a afetar seu comportamento.",
            tipo: "SIMBIONTE",
            fase: "LADO SOMBRIO",
            arquivo: "2007"
        }
    ];


    /* =====================================================
       7. ELEMENTOS DO CARROSSEL
    ===================================================== */

    const interfaceTrajes =
        document.querySelector(
            ".trajes-tobey-interface"
        );

    const cardsTrajes =
        Array.from(
            document.querySelectorAll(
                ".tobey-traje-card"
            )
        );

    const indicadoresTrajes =
        Array.from(
            document.querySelectorAll(
                ".tobey-traje-indicador"
            )
        );

    const botaoAnterior =
        document.getElementById(
            "tobeyTrajeAnterior"
        );

    const botaoProximo =
        document.getElementById(
            "tobeyTrajeProximo"
        );

    const contadorTraje =
        document.getElementById(
            "tobeyTrajeContador"
        );


    /* PAINEL DE DETALHES */

    const trajeCodigo =
        document.getElementById(
            "tobeyTrajeCodigo"
        );

    const trajeNumero =
        document.getElementById(
            "tobeyTrajeNumero"
        );

    const trajeStatus =
        document.getElementById(
            "tobeyTrajeStatus"
        );

    const trajeTitulo =
        document.getElementById(
            "tobeyTrajeTitulo"
        );

    const trajeTexto =
        document.getElementById(
            "tobeyTrajeTexto"
        );

    const trajeTipo =
        document.getElementById(
            "tobeyTrajeTipo"
        );

    const trajeFase =
        document.getElementById(
            "tobeyTrajeFase"
        );

    const trajeArquivo =
        document.getElementById(
            "tobeyTrajeArquivo"
        );


    let trajeAtual = 0;


    /* =====================================================
       8. ATUALIZAR CARROSSEL
    ===================================================== */

    function atualizarTraje(indice) {

        if (!trajes.length) {
            return;
        }


        /* LOOP */

        if (indice < 0) {
            indice =
                trajes.length - 1;
        }

        if (indice >= trajes.length) {
            indice = 0;
        }


        trajeAtual = indice;

        const traje =
            trajes[trajeAtual];


        /* CARDS */

        cardsTrajes.forEach(
            (card, index) => {

                card.classList.toggle(
                    "ativo",
                    index === trajeAtual
                );

            }
        );


        /* INDICADORES */

        indicadoresTrajes.forEach(
            (indicador, index) => {

                indicador.classList.toggle(
                    "ativo",
                    index === trajeAtual
                );

            }
        );


        /* CONTADOR */

        if (contadorTraje) {

            const numero =
                String(trajeAtual + 1)
                    .padStart(2, "0");

            contadorTraje.textContent =
                `${numero} / 04`;

        }


        /* DATA ATTRIBUTE DA INTERFACE */

        if (interfaceTrajes) {

            interfaceTrajes.dataset.trajeAtual =
                traje.chave;

        }


        /* DETALHES */

        if (trajeCodigo) {
            trajeCodigo.textContent =
                traje.codigo;
        }

        if (trajeNumero) {
            trajeNumero.textContent =
                traje.numero;
        }

        if (trajeStatus) {
            trajeStatus.textContent =
                traje.status;
        }

        if (trajeTitulo) {
            trajeTitulo.textContent =
                traje.titulo;
        }

        if (trajeTexto) {
            trajeTexto.textContent =
                traje.texto;
        }

        if (trajeTipo) {
            trajeTipo.textContent =
                traje.tipo;
        }

        if (trajeFase) {
            trajeFase.textContent =
                traje.fase;
        }

        if (trajeArquivo) {
            trajeArquivo.textContent =
                traje.arquivo;
        }

    }


    /* =====================================================
       9. SETA ANTERIOR
    ===================================================== */

    if (botaoAnterior) {

        botaoAnterior.addEventListener(
            "click",
            () => {

                atualizarTraje(
                    trajeAtual - 1
                );

            }
        );

    }


    /* =====================================================
       10. SETA PRÓXIMO
    ===================================================== */

    if (botaoProximo) {

        botaoProximo.addEventListener(
            "click",
            () => {

                atualizarTraje(
                    trajeAtual + 1
                );

            }
        );

    }


    /* =====================================================
       11. INDICADORES CLICÁVEIS
    ===================================================== */

    indicadoresTrajes.forEach(
        (indicador, index) => {

            indicador.addEventListener(
                "click",
                () => {

                    atualizarTraje(index);

                }
            );

        }
    );


    /* =====================================================
       12. TECLADO

       Quando o usuário estiver com o mouse
       sobre o carrossel:
       ← traje anterior
       → próximo traje
    ===================================================== */

    const secaoTrajes =
        document.getElementById(
            "trajesTobey"
        );

    let mouseNosTrajes = false;


    if (secaoTrajes) {

        secaoTrajes.addEventListener(
            "mouseenter",
            () => {

                mouseNosTrajes = true;

            }
        );


        secaoTrajes.addEventListener(
            "mouseleave",
            () => {

                mouseNosTrajes = false;

            }
        );

    }


    document.addEventListener(
        "keydown",
        (event) => {

            if (!mouseNosTrajes) {
                return;
            }

            if (event.key === "ArrowLeft") {

                atualizarTraje(
                    trajeAtual - 1
                );

            }

            if (event.key === "ArrowRight") {

                atualizarTraje(
                    trajeAtual + 1
                );

            }

        }
    );


    /* =====================================================
       13. SWIPE NO CELULAR
    ===================================================== */

    const carrossel =
        document.getElementById(
            "tobeyTrajesCarrossel"
        );

    let toqueInicioX = 0;
    let toqueFimX = 0;


    if (carrossel) {

        carrossel.addEventListener(
            "touchstart",
            (event) => {

                toqueInicioX =
                    event.changedTouches[0]
                        .screenX;

            },
            {
                passive: true
            }
        );


        carrossel.addEventListener(
            "touchend",
            (event) => {

                toqueFimX =
                    event.changedTouches[0]
                        .screenX;

                const distancia =
                    toqueFimX -
                    toqueInicioX;


                /* EVITA DISPARAR COM TOQUE PEQUENO */

                if (
                    Math.abs(distancia) < 45
                ) {
                    return;
                }


                if (distancia < 0) {

                    atualizarTraje(
                        trajeAtual + 1
                    );

                } else {

                    atualizarTraje(
                        trajeAtual - 1
                    );

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       14. SIMBIONTE
    ===================================================== */

    const botaoSimbionte =
        document.getElementById(
            "ativarSimbionte"
        );

    const simbionteStatus =
        document.getElementById(
            "simbionteStatus"
        );


    function atualizarSimbionte() {

        const ativo =
            paginaTobey.classList.contains(
                "simbionte-ativo"
            );


        if (simbionteStatus) {

            simbionteStatus.textContent =
                ativo
                    ? "SIMBIOSE ATIVA"
                    : "SIMBIOSE INATIVA";

        }


        if (botaoSimbionte) {

            botaoSimbionte.textContent =
                ativo
                    ? "REMOVER SIMBIOSE"
                    : "ATIVAR SIMBIOSE";

            botaoSimbionte.setAttribute(
                "aria-pressed",
                String(ativo)
            );

        }

    }


    if (botaoSimbionte) {

        botaoSimbionte.addEventListener(
            "click",
            () => {

                paginaTobey.classList.toggle(
                    "simbionte-ativo"
                );

                atualizarSimbionte();

            }
        );

    }


    /* =====================================================
       15. ESTADO INICIAL
    ===================================================== */

    atualizarTraje(0);

    atualizarSimbionte();


    /* =====================================================
       16. FIM
    ===================================================== */

    console.log(
        "MIRANHA // TOBEY SYSTEM ONLINE"
    );

});
  