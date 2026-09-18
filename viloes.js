/* =========================================================
   VILÕES.JS — MIRANHA
   Interações dos arquivos 001–009
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    function text(sel, value) {
        const el = $(sel);
        if (el) el.textContent = value;
    }

    function width(sel, value) {
        const el = $(sel);
        if (el) el.style.width = value;
    }

    function on(sel, cls = "ativa") {
        const el = $(sel);
        if (el) el.classList.add(cls);
    }

    function off(sel, cls = "ativa") {
        const el = $(sel);
        if (el) el.classList.remove(cls);
    }

    function disable(btn, state = true) {
        if (!btn) return;
        btn.disabled = state;
        btn.style.opacity = state ? ".55" : "";
        btn.style.cursor = state ? "wait" : "";
    }

    /* =====================================================
       ENTRADA DOS ARQUIVOS
       ===================================================== */

    const entrada = $("#entradaVilao");

    if (entrada) {
        setTimeout(() => entrada.classList.add("saindo"), 1450);
        setTimeout(() => entrada.remove(), 2200);
    }

    /* =====================================================
       REVELAÇÃO DAS SEÇÕES
       ===================================================== */

    const sections = $$(".secao-animada");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visivel");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: .12 });

        sections.forEach(section => observer.observe(section));
    } else {
        sections.forEach(section => section.classList.add("visivel"));
    }

    /* =====================================================
       MENU
       ===================================================== */

    const menu = $(".menu-vilao");

    window.addEventListener("scroll", () => {
        if (menu) {
            menu.classList.toggle("menu-rolado", window.scrollY > 40);
        }
    }, { passive: true });

    /* =====================================================
       001 — DUENDE VERDE
       Instabilidade de Norman / segunda personalidade
       ===================================================== */

    const ativarDuende = $("#ativarDuende");

    if (ativarDuende) {
        ativarDuende.addEventListener("click", async () => {
            disable(ativarDuende);

            text("#resultadoInstabilidade", "ANALISANDO NORMAN OSBORN...");
            await sleep(700);

            text("#resultadoInstabilidade", "ATIVIDADE NEURAL INSTÁVEL.");
            on("#interferenciaDuende");
            await sleep(650);

            text("#resultadoInstabilidade", "SEGUNDA PERSONALIDADE DETECTADA.");
            on("#alertaDuende");
            await sleep(650);

            on("#aparicaoDuende");
            text("#resultadoInstabilidade", "NORMAN OSBORN NÃO ESTÁ RESPONDENDO.");
            await sleep(1300);

            off("#aparicaoDuende");
            off("#interferenciaDuende");

            text("#resultadoInstabilidade", "⚠ NORMAN NÃO ESTÁ MAIS NO CONTROLE.");
            await sleep(1200);

            off("#alertaDuende");
            disable(ativarDuende, false);
        });
    }

    /* =====================================================
       002 — DOUTOR OCTOPUS
       Tentativa de desconectar os quatro braços
       ===================================================== */

    const desconectar = $("#desconectarBracos");

    if (desconectar) {
        desconectar.addEventListener("click", async () => {
            disable(desconectar);
            document.body.classList.add("bracos-ativos");

            const statuses = $$(".braco-status");

            for (let i = 0; i < 4; i++) {
                text("#resultadoDesconexao", `BRAÇO 0${i + 1} — DESCONECTANDO...`);

                if (statuses[i]) {
                    statuses[i].textContent = "DESCONECTANDO";
                }

                await sleep(520);
            }

            text("#resultadoDesconexao", "CHIP INIBIDOR: INOPERANTE.");

            statuses.forEach(el => {
                el.textContent = "COMANDO RECUSADO";
                el.classList.add("alerta");
            });

            on("#alarmeOctopus");
            on("#falhaOctopus");
            await sleep(850);

            off("#falhaOctopus");
            on("#alertaOctopus");

            text(
                "#resultadoDesconexao",
                "⚠ COMANDO RECUSADO — CONTROLE NEURAL DOS BRAÇOS ATIVO."
            );

            await sleep(1500);

            off("#alarmeOctopus");
            off("#alertaOctopus");
            disable(desconectar, false);
        });
    }

    if (document.body.classList.contains("pagina-octopus")) {
        window.addEventListener("scroll", () => {
            document.body.classList.toggle(
                "bracos-ativos",
                window.scrollY > window.innerHeight * .8
            );
        }, { passive: true });
    }

    /* =====================================================
       003 — HOMEM-AREIA
       Análise molecular / dissolução
       ===================================================== */

    const analisarAreia = $("#analisarAreia");

    if (analisarAreia) {
        analisarAreia.addEventListener("click", async () => {
            disable(analisarAreia);

            text("#resultadoAreia", "ANALISANDO ESTRUTURA MOLECULAR...");
            text("#porcentagemHumana", "31%");
            text("#porcentagemAreia", "69%");
            width(".molecular-barra.humano", "31%");
            width(".molecular-barra.areia", "69%");

            await sleep(850);

            text("#resultadoAreia", "RECALCULANDO COMPOSIÇÃO...");
            text("#porcentagemHumana", "08%");
            text("#porcentagemAreia", "92%");
            width(".molecular-barra.humano", "8%");
            width(".molecular-barra.areia", "92%");

            document.body.classList.add("areia-intensa");
            await sleep(850);

            text("#estabilidadeAreia", "ERRO");
            width(".molecular-barra.estabilidade", "5%");

            on("#ondaAreia");

            $$(".estrutura-areia h2, .estrutura-areia .titulo-areia").forEach(el => {
                el.classList.add("dissolvendo");
            });

            await sleep(1000);

            text(
                "#resultadoAreia",
                "ESTRUTURA HUMANA NÃO ENCONTRADA. SUJEITO COMPLETAMENTE RECONSTRUÍDO."
            );

            on("#alertaAreia");
            await sleep(1400);

            off("#ondaAreia");
            off("#alertaAreia");

            $$(".dissolvendo").forEach(el => {
                el.classList.remove("dissolvendo");
            });

            disable(analisarAreia, false);
        });
    }

    if (document.body.classList.contains("pagina-areia")) {
        const transformacao = $("#transformacao");

        window.addEventListener("scroll", () => {
            if (!transformacao) return;

            const r = transformacao.getBoundingClientRect();

            document.body.classList.toggle(
                "areia-intensa",
                r.top < innerHeight * .8 && r.bottom > 0
            );
        }, { passive: true });
    }

    /* =====================================================
       004 — VENOM
       Simbiose / invasão da interface
       ===================================================== */

    const analisarVenom = $("#analisarVenom");

    if (analisarVenom) {
        analisarVenom.addEventListener("click", async () => {
            disable(analisarVenom);

            const result = "#resultadoVenom";

            text(result, "ANALISANDO HOSPEDEIRO...");
            text("#statusEddie", "DETECTADO");
            await sleep(650);

            text("#statusSimbionte", "DETECTADO");
            await sleep(650);

            text("#statusSimbiotico", "100%");
            text(result, "INICIANDO SEPARAÇÃO...");
            await sleep(800);

            text("#statusSeparacao", "ERRO");
            text(result, "SEPARANDO HOSPEDEIRO... ERRO");

            on("#infeccaoVenom");
            document.body.classList.add("venom-invadindo");
            await sleep(700);

            text(result, "TENTATIVA 02... ERRO");
            await sleep(650);

            text("#statusEddie", "█████████");
            text("#statusSimbionte", "█████████");
            text("#statusSeparacao", "IMPOSSÍVEL");

            text(
                result,
                "⚠ SISTEMA COMPROMETIDO — NÃO É POSSÍVEL DETERMINAR ONDE EDDIE TERMINA."
            );

            on("#alertaVenom");
            await sleep(900);

            on("#venomAparicao");
            await sleep(1450);

            off("#venomAparicao");
            off("#infeccaoVenom");
            off("#alertaVenom");

            document.body.classList.remove("venom-invadindo");

            text(result, "NÓS SOMOS VENOM.");
            disable(analisarVenom, false);
        });
    }

    /* Venom recua visualmente na área da fraqueza sonora */
    if (document.body.classList.contains("pagina-venom")) {
        const fraqueza = $(".fraqueza-venom");

        if (fraqueza && "IntersectionObserver" in window) {
            const obsSom = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    document.body.classList.toggle(
                        "venom-recuando",
                        entry.isIntersecting
                    );
                });
            }, { threshold: .35 });

            obsSom.observe(fraqueza);
        }
    }

    /* =====================================================
       005 — LAGARTO
       DNA humano → DNA reptiliano
       ===================================================== */

    const analisarDNA = $("#analisarDNA");

    if (analisarDNA) {
        const setDNA = (h, r, e, status) => {
            text("#dnaHumano", h + "%");
            text("#dnaReptiliano", r + "%");
            text("#estabilidadeLagarto", e);

            width("#barraHumano", h + "%");
            width("#barraReptiliano", r + "%");
            width("#barraEstabilidadeLagarto", e === "ERRO" ? "8%" : e);

            if (status) {
                text("#statusDNA", status);
            }
        };

        analisarDNA.addEventListener("click", async () => {
            disable(analisarDNA);

            text("#resultadoDNA", "ANALISANDO DNA...");
            setDNA(94, 6, "91%", "MUTAÇÃO DETECTADA");
            await sleep(800);

            text("#resultadoDNA", "RECALCULANDO...");
            setDNA(61, 39, "68%", "MUTAÇÃO ATIVA");
            await sleep(750);

            setDNA(27, 73, "31%", "⚠ MUTAÇÃO ACELERADA");
            document.body.classList.add("contaminado");
            await sleep(750);

            setDNA(8, 92, "ERRO", "DNA REPTILIANO DOMINANTE");

            on("#garraLagarto");
            await sleep(650);

            text("#dnaHumano", "ERRO");
            text("#dnaReptiliano", "DOMINANTE");

            text(
                "#resultadoDNA",
                "SUJEITO: CURT CONNORS // STATUS: NÃO CONFIRMADO"
            );

            await sleep(700);

            on("#aparicaoLagarto");
            on("#alertaLagarto");

            text("#resultadoDNA", "NOVA IDENTIFICAÇÃO: O LAGARTO");
            await sleep(1300);

            off("#aparicaoLagarto");
            off("#alertaLagarto");
            off("#garraLagarto");

            disable(analisarDNA, false);
        });
    }

    /* A página começa científica e se contamina perto da mutação */
    if (document.body.classList.contains("pagina-lagarto")) {
        const mutacao = $("#mutacao");

        if (mutacao && "IntersectionObserver" in window) {
            const obsLagarto = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    document.body.classList.add("contaminado");
                }
            }, { threshold: .28 });

            obsLagarto.observe(mutacao);
        }
    }

    /* =====================================================
       006 — ELECTRO
       Sobrecarga / perda da rede / apagão
       ===================================================== */

    const iniciarSobrecarga =
        $("#iniciarSobrecarga") ||
        $("#analisarElectro") ||
        $("#iniciarContencao");

    if (iniciarSobrecarga) {
        const setEle = (c, t, e, status) => {
            text("#cargaElectro", c);
            text("#tensaoElectro", t);
            text("#estabilidadeElectro", e);

            width("#barraCargaElectro", c.includes("%") ? c : "100%");
            width("#barraTensaoElectro", t.includes("%") ? t : "100%");
            width("#barraEstabilidadeElectro", e.includes("%") ? e : "8%");

            if (status) {
                text("#statusEnergia", status);
            }
        };

        iniciarSobrecarga.addEventListener("click", async () => {
            disable(iniciarSobrecarga);

            text("#resultadoElectro", "ANALISANDO FONTE...");
            setEle("18%", "24%", "92%", "ESTÁVEL");
            await sleep(700);

            text("#resultadoElectro", "ABSORÇÃO DETECTADA");
            setEle("42%", "51%", "70%", "ELEVANDO");
            await sleep(650);

            setEle("71%", "78%", "43%", "INSTÁVEL");
            await sleep(650);

            text("#resultadoElectro", "⚠ SOBRECARGA");
            setEle("96%", "ERRO", "12%", "CRÍTICO");

            document.body.classList.add("sobrecarga");
            on("#interferenciaElectro");
            await sleep(650);

            setEle("█████", "█████", "ERRO", "PERDIDO");

            text(
                "#resultadoElectro",
                "⚠ LIMITE EXCEDIDO — CONTROLE DA REDE PERDIDO"
            );

            on("#apagaoElectro", "ativo");
            await sleep(950);

            on("#flashElectro", "ativo");
            on("#descargaElectro");
            on("#alertaElectro");
            await sleep(500);

            on("#aparicaoElectro");
            await sleep(1200);

            off("#aparicaoElectro");
            off("#descargaElectro");
            off("#alertaElectro");
            off("#interferenciaElectro");
            off("#apagaoElectro", "ativo");
            off("#flashElectro", "ativo");

            document.body.classList.remove("sobrecarga");

            disable(iniciarSobrecarga, false);
        });
    }

    /* Pequenos pulsos elétricos durante a rolagem */
    if (document.body.classList.contains("pagina-electro")) {
        let ultimoPulso = 0;

        window.addEventListener("scroll", () => {
            const agora = Date.now();

            if (agora - ultimoPulso < 2500) return;
            if (window.scrollY < window.innerHeight) return;

            ultimoPulso = agora;

            on("#descargaElectro");

            setTimeout(() => {
                off("#descargaElectro");
            }, 300);
        }, { passive: true });
    }

    /* =====================================================
       007 — MYSTERIO
       Realidade falsa / drones / duplicação
       ===================================================== */

    const analisarMysterio = $("#analisarMysterio");

    if (analisarMysterio) {
        const setMyst = (real, proj, conf, status) => {
            text("#imagemRealMysterio", real + "%");
            text("#projecaoMysterio", proj + "%");
            text("#confiabilidadeMysterio", conf + "%");

            width("#barraImagemReal", real + "%");
            width("#barraProjecao", proj + "%");
            width("#barraConfiabilidade", conf + "%");

            if (status) {
                text("#statusMysterio", status);
            }
        };

        analisarMysterio.addEventListener("click", async () => {
            disable(analisarMysterio);

            text("#resultadoMysterio", "VERIFICANDO REALIDADE...");
            setMyst(100, 0, 100, "VERIFICADA");
            text("#statusRealidadeMenu", "VERIFICADA");
            await sleep(700);

            text("#resultadoMysterio", "ANOMALIA DETECTADA");
            setMyst(72, 28, 74, "INSTÁVEL");
            text("#statusRealidadeMenu", "INSTÁVEL");

            on("#glitchMysterio", "ativo");
            await sleep(650);

            text("#resultadoMysterio", "RECALCULANDO...");
            setMyst(41, 59, 43, "INCONSISTENTE");
            await sleep(650);

            text("#resultadoMysterio", "⚠ MÚLTIPLAS FONTES VISUAIS");
            setMyst(12, 88, 8, "FALSA");

            text("#statusRealidadeMenu", "FALSA");
            document.body.classList.add("realidade-falsa");

            on("#duplicacaoMysterio");
            await sleep(750);

            text("#resultadoMysterio", "LOCALIZANDO QUENTIN BECK... ERRO");
            await sleep(650);

            text(
                "#resultadoMysterio",
                "⚠ DRONES DETECTADOS — REALIDADE COMPROMETIDA"
            );

            on("#erroRealidade", "ativo");
            on("#aparicaoMysterio");
            await sleep(1300);

            off("#aparicaoMysterio");
            off("#duplicacaoMysterio");
            off("#glitchMysterio", "ativo");

            await sleep(800);

            off("#erroRealidade", "ativo");
            disable(analisarMysterio, false);
        });
    }

    if (document.body.classList.contains("pagina-mysterio")) {
        const falso = $(".arquivo-falso-mysterio");

        if (falso && "IntersectionObserver" in window) {
            const obsMysterio = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    setTimeout(() => {
                        falso.classList.add("revelado");
                    }, 1100);
                }
            }, { threshold: .4 });

            obsMysterio.observe(falso);
        }
    }

    /* =====================================================
       008 — HARRY / NOVO DUENDE
       Legado de Norman → obsessão → novo alvo
       ===================================================== */

    const abrirNorman = $("#abrirArquivoNorman");

    if (abrirNorman) {
        abrirNorman.addEventListener("click", async () => {
            disable(abrirNorman);

            const r = "#resultadoLegadoHarry";

            text(r, "SOLICITANDO ACESSO...");
            await sleep(600);

            text(r, "ARQUIVO: NORMAN_OSBORN_001 // CONFIDENCIAL");
            await sleep(650);

            text(r, "QUEBRANDO BLOQUEIO...");
            on("#interferenciaHarry");
            await sleep(700);

            text(r, "ACESSO CONCEDIDO // CODINOME: DUENDE VERDE");

            on("#memoriaNorman");
            document.body.classList.add("legado-ativo");
            await sleep(850);

            text(
                r,
                "EQUIPAMENTOS LOCALIZADOS // NOVO USUÁRIO: HARRY OSBORN"
            );

            await sleep(650);

            text(r, "SINCRONIZANDO LEGADO... 41%");
            await sleep(450);

            text(r, "SINCRONIZANDO LEGADO... 76%");
            await sleep(450);

            text(r, "SINCRONIZANDO LEGADO... 100%");
            await sleep(650);

            text(r, "ANALISANDO PETER PARKER...");

            text("#relacaoPeterHarry", "MELHOR AMIGO");
            width("#barraRelacaoHarry", "100%");
            await sleep(700);

            text("#relacaoPeterHarry", "SUSPEITO");
            width("#barraRelacaoHarry", "48%");
            await sleep(700);

            text("#relacaoPeterHarry", "ALVO");
            width("#barraRelacaoHarry", "8%");

            on("#alvoPeterHarry");
            on("#alertaHarry");

            text("#statusHarryMenu", "INSTÁVEL");
            await sleep(750);

            on("#aparicaoHarry");

            text(
                r,
                "⚠ PADRÃO OSBORN DETECTADO // IDENTIFICAÇÃO ATUALIZADA: NOVO DUENDE"
            );

            await sleep(1300);

            off("#aparicaoHarry");
            off("#memoriaNorman");
            off("#alvoPeterHarry");
            off("#alertaHarry");
            off("#interferenciaHarry");

            text("#statusHarryMenu", "NOVO DUENDE");

            disable(abrirNorman, false);
        });
    }

    /* =====================================================
       009 — ABUTRE
       Radar / caça aérea / rota de interceptação
       IDs ajustados ao abutre.html FINAL
       ===================================================== */

    const rastrearAbutre =
        $("#iniciarRastreamento") ||
        $("#rastrearAbutre");

    if (rastrearAbutre) {
        rastrearAbutre.addEventListener("click", async () => {
            disable(rastrearAbutre);

            document.body.classList.add("modo-caca");

            text("#statusRadarMenu", "ATIVO");
            text("#statusRastreamento", "VARRENDO");
            text("#resultadoRastreamento", "SISTEMA DE RASTREAMENTO ATIVO");

            on("#radarGlobalAbutre");

            await sleep(650);

            text("#resultadoRastreamento", "VARRENDO ESPAÇO AÉREO...");
            text("#altitudeAbutre", "840 M");
            text("#velocidadeAbutre", "126 KM/H");
            text("#rotaAbutre", "VARREDURA 360°");

            await sleep(700);

            text("#resultadoRastreamento", "ALVO NÃO ENCONTRADO");
            text("#alvoAbutre", "NÃO IDENTIFICADO");

            await sleep(650);

            text("#resultadoRastreamento", "MOVIMENTO DETECTADO — RASTREANDO...");
            text("#rotaAbutre", "CALCULANDO");

            on("#interferenciaAbutre");

            await sleep(650);

            text("#resultadoRastreamento", "ASSINATURA LOCALIZADA");
            text("#alvoAbutre", "HOMEM-ARANHA");
            text("#rotaAbutre", "INTERCEPTAÇÃO");

            on("#pontoAlvoAbutre");
            on("#radarAlvo");

            await sleep(700);

            text("#distanciaAbutre", "420 M");
            text("#resultadoRastreamento", "⚠ APROXIMAÇÃO RÁPIDA");

            await sleep(450);
            text("#distanciaAbutre", "180 M");

            await sleep(420);
            text("#distanciaAbutre", "63 M");

            await sleep(420);
            text("#distanciaAbutre", "12 M");

            text("#statusRastreamento", "INTERCEPTAÇÃO");
            text("#statusRadarMenu", "ALVO TRAVADO");

            on("#sombraAsasAbutre");

            await sleep(850);

            on("#alertaAbutre");

            text(
                "#resultadoRastreamento",
                "⚠ ABUTRE EM ROTA DE INTERCEPTAÇÃO"
            );

            await sleep(700);

            on("#aparicaoAbutre");

            await sleep(1200);

            off("#aparicaoAbutre");
            off("#sombraAsasAbutre");
            off("#alertaAbutre");
            off("#interferenciaAbutre");
            off("#pontoAlvoAbutre");
            off("#radarAlvo");

            text("#statusRadarMenu", "ATIVO");
            text("#statusRastreamento", "ALVO LOCALIZADO");

            document.body.classList.remove("modo-caca");

            disable(rastrearAbutre, false);
        });
    }

    /* =====================================================
       EFEITOS LEVES DE MOVIMENTO
       Apenas desktop e sem atrapalhar leitura
       ===================================================== */

    if (window.matchMedia("(pointer: fine)").matches) {
        const cards = $$(
            ".arma-duende, " +
            ".capacidade-octopus, " +
            ".capacidade-areia, " +
            ".capacidade-venom, " +
            ".capacidade-lagarto, " +
            ".capacidade-electro, " +
            ".drone-mysterio, " +
            ".arma-harry, " +
            ".capacidade-abutre"
        );

        cards.forEach(card => {
            card.addEventListener("mousemove", event => {
                const rect = card.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) / rect.width - .5;

                const y =
                    (event.clientY - rect.top) / rect.height - .5;

                card.style.transform =
                    `perspective(700px)
                     rotateX(${y * -3}deg)
                     rotateY(${x * 3}deg)
                     translateY(-5px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }
});
