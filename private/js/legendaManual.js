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

        legendas.length = 0; // limpa
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


    media.addEventListener('timeupdate', () => {
        const atual = legendas.find(l =>
            media.currentTime >= l.inicio &&
            media.currentTime < l.fim
        );

        legendaDisplay.innerHTML = atual ? `<span>${atual.texto}</span>` : '';
    });

    media.addEventListener('loadedmetadata', async () => {
        await carregarLegendas();
        renderTimeline();
    });

    const btnCancelar = document.getElementById('btnCancelar');
    btnCancelar.addEventListener('click', () => {
        location.href = `/private/modo.html?mediaId=${mediaId}`;
    });
})();
