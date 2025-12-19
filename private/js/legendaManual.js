(async () => {
    const container = document.getElementById('playerContainer');
    const btnAdd = document.getElementById('btnAdd');
    const legendaDisplay = document.getElementById('legendaDisplay');
    const timeline = document.getElementById('timeline');

    const modal = document.getElementById('legendaModal');
    const modalTitulo = document.getElementById('modalTitulo');
    const legendaInput = document.getElementById('legendaInput');
    const btnConfirmar = document.getElementById('btnConfirmarLegenda');
    const btnCancelarModal = document.getElementById('btnCancelarLegenda');

    const estiloModal = document.getElementById('estiloModal');
    const estiloFonte = document.getElementById('estiloFonte');
    const estiloTamanho = document.getElementById('estiloTamanho');
    const estiloCorTexto = document.getElementById('estiloCorTexto');
    const estiloCorFundo = document.getElementById('estiloCorFundo');
    const estiloTransparencia = document.getElementById('estiloTransparencia');
    const estiloPosicao = document.getElementById('estiloPosicao');

    const btnCancelarEstilo = document.getElementById('btnCancelarEstilo');
    const btnSalvarEstilo = document.getElementById('btnSalvarEstilo');

    const params = new URLSearchParams(window.location.search);
    const mediaId = params.get('mediaId');

    if (!mediaId) {
        alert('Arquivo não encontrado');
        location.href = '/private/home.html';
        return;
    }

    const resMedia = await fetch(`/medias/${mediaId}`);
    const mediaData = await resMedia.json();

    const ext = mediaData.arquivo.split('.').pop().toLowerCase();
    const src = `/uploads/${mediaData.arquivo}`;

    let media;
    if (['mp4', 'webm'].includes(ext)) {
        container.innerHTML = `<video controls><source src="${src}"></video>`;
        media = container.querySelector('video');
    } else {
        container.innerHTML = `<audio controls><source src="${src}"></audio>`;
        media = container.querySelector('audio');
    }

    const legendas = [];
    let legendaSelecionada = null;

    async function carregarLegendas() {
        const res = await fetch(`/legendas/${mediaId}`);
        const data = await res.json();

        legendas.length = 0;
        legendas.push(...data);
    }


    function renderTimeline() {
        if (!media.duration) return;

        timeline.innerHTML = '';

        legendas.forEach(l => {
            const bloco = document.createElement('div');
            bloco.className = 'legenda-bloco';
            bloco.innerText = l.texto;

            const inicioPct = (l.inicio / media.duration) * 100;
            const duracaoPct = ((l.fim - l.inicio) / media.duration) * 100;

            bloco.style.left = `${inicioPct}%`;
            bloco.style.width = `${duracaoPct}%`;

            bloco.addEventListener('click', () => {
                legendaSelecionada = l;
                legendaInput.value = l.texto;
                modalTitulo.innerText = 'Editar legenda';
                modal.classList.remove('hidden');
                legendaInput.focus();

                media.currentTime = l.inicio;
            });


            timeline.appendChild(bloco);
        });
    }


    btnAdd.addEventListener('click', () => {
        legendaSelecionada = null;
        modalTitulo.innerText = 'Nova legenda';
        legendaInput.value = '';
        modal.classList.remove('hidden');
        legendaInput.focus();
    });

    btnConfirmar.addEventListener('click', async () => {
        if (!legendaInput.value.trim()) return;

        if (legendaSelecionada) {
            const duracao = legendaSelecionada.fim - legendaSelecionada.inicio;
            const novoInicio = media.currentTime;
            const novoFim = novoInicio + duracao;

            const res = await fetch(`/legendas/${legendaSelecionada.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    inicio: novoInicio,
                    fim: novoFim,
                    texto: legendaInput.value
                })
            });

            const atualizada = await res.json();

            const index = legendas.findIndex(l => l.id === atualizada.id);
            if (index !== -1) legendas[index] = atualizada;

        } else {

            const res = await fetch('/legendas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mediaId,
                    inicio: media.currentTime,
                    fim: media.currentTime + 2,
                    texto: legendaInput.value
                })
            });

            const salva = await res.json();
            legendas.push(salva);
        }

        modal.classList.add('hidden');
        legendaInput.value = '';
        legendaSelecionada = null;
        renderTimeline();
    });

    btnAdd.innerText = 'Adicionar Texto';
    btnAdd.style.backgroundColor = '';

    btnCancelarModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        legendaSelecionada = null;
    });

    let estiloLegenda = {
        fonte: 'Arial',
        tamanho: 24,
        cor_texto: '#ffffff',
        cor_fundo: '#000000',
        transparencia: 0.75,
        posicao_y: 'bottom'
    };

    function aplicarEstiloLegenda() {
        const span = legendaDisplay.querySelector('span');
        if (!span) return;

        span.style.fontFamily = estiloLegenda.fonte;
        span.style.fontSize = `${estiloLegenda.tamanho}px`;
        span.style.color = estiloLegenda.cor_texto;

        span.style.backgroundColor = estiloLegenda.cor_fundo;
        span.style.opacity = estiloLegenda.transparencia;
        span.style.padding = '6px 10px';
        span.style.borderRadius = '6px';

        legendaDisplay.style.top = '';
        legendaDisplay.style.bottom = '';
        legendaDisplay.style.transform = '';

        if (estiloLegenda.posicao_y === 'top') {
            legendaDisplay.style.top = '8%';
        } else if (estiloLegenda.posicao_y === 'center') {
            legendaDisplay.style.top = '50%';
            legendaDisplay.style.transform = 'translateY(-50%)';
        } else {
            legendaDisplay.style.bottom = '8%';
        }
    }


    document.querySelectorAll('.btn-side').forEach((btn, i) => {
        if (i > 0 && i < 6) {
            btn.addEventListener('click', () => {
                abrirModalEstilo();
            });
        }
    });


    function abrirModalEstilo() {
        estiloFonte.value = estiloLegenda.fonte;
        estiloTamanho.value = estiloLegenda.tamanho;
        estiloCorTexto.value = estiloLegenda.cor_texto;
        estiloCorFundo.value = estiloLegenda.cor_fundo;
        estiloTransparencia.value = estiloLegenda.transparencia;
        estiloPosicao.value = estiloLegenda.posicao_y;

        estiloModal.classList.remove('hidden');
    }

    [
        estiloFonte,
        estiloTamanho,
        estiloCorTexto,
        estiloCorFundo,
        estiloTransparencia,
        estiloPosicao
    ].forEach(el => {
        el.addEventListener('input', () => {
            estiloLegenda = {
                fonte: estiloFonte.value,
                tamanho: Number(estiloTamanho.value),
                cor_texto: estiloCorTexto.value,
                cor_fundo: estiloCorFundo.value,
                transparencia: Number(estiloTransparencia.value),
                posicao_y: estiloPosicao.value
            };
            aplicarEstiloLegenda();
        });
    });


    btnCancelarEstilo.addEventListener('click', () => {
        estiloModal.classList.add('hidden');
    });

    btnSalvarEstilo.addEventListener('click', async () => {
        estiloModal.classList.add('hidden');

        await fetch(`/legenda-estilo/${mediaId}`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(estiloLegenda)
        });
    });



    media.addEventListener('timeupdate', () => {
        const atual = legendas.find(l =>
            media.currentTime >= l.inicio &&
            media.currentTime < l.fim
        );

        legendaDisplay.innerHTML = atual ? `<span>${atual.texto}</span>` : '';

        aplicarEstiloLegenda();
    });


    media.addEventListener('loadedmetadata', async () => {
        await carregarLegendas();

        const resEstilo = await fetch(`/legenda-estilo/${mediaId}`, {
            credentials: 'include'
        });
        if (resEstilo.ok) {
            const estiloDB = await resEstilo.json();
            if (estiloDB) {
                estiloLegenda = {
                    fonte: estiloDB.fonte,
                    tamanho: estiloDB.tamanho,
                    cor_texto: estiloDB.cor_texto,
                    cor_fundo: estiloDB.cor_fundo,
                    transparencia: estiloDB.transparencia,
                    posicao_y: estiloDB.posicao_y
                };
            }
        }

        renderTimeline();
    });


    const btnCancelar = document.getElementById('btnCancelar');
    btnCancelar.addEventListener('click', () => {
        location.href = `/private/modo.html?mediaId=${mediaId}`;
    });

    const btnSalvarProjeto = document.getElementById('btn-salvar');

    btnSalvarProjeto.addEventListener('click', async () => {
        await fetch(`/legenda-estilo/${mediaId}`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(estiloLegenda)
        });

        location.href = `/private/exportar.html?mediaId=${mediaId}`;
    });

})();
