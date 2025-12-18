(async () => {
    const container = document.getElementById('playerContainer');
    const btnAdd = document.getElementById('btnAdd');
    const legendaInput = document.getElementById('legendaInput');
    const legendaDisplay = document.getElementById('legendaDisplay');

    const params = new URLSearchParams(window.location.search);
    const mediaId = params.get('mediaId');

    if (!mediaId) {
        alert('Arquivo não encontrado');
        window.location.href = '/private/home.html';
        return;
    }

    const resMedia = await fetch(`/medias/${mediaId}`);
    const mediaData = await resMedia.json();

    const ext = mediaData.arquivo.split('.').pop().toLowerCase();
    const src = `/uploads/${mediaData.arquivo}`;

    let media;

    if (['mp4', 'webm'].includes(ext)) {
        container.innerHTML = `<video controls width="800"><source src="${src}"></video>`;
        media = container.querySelector('video');
    } else {
        container.innerHTML = `<audio controls><source src="${src}"></audio>`;
        media = container.querySelector('audio');
    }

    const legendas = [];

    async function carregarLegendas() {
        const res = await fetch(`/legendas/${mediaId}`);
        const data = await res.json();

        data.forEach(l => legendas.push(l));
    }

    await carregarLegendas();

    btnAdd.addEventListener('click', async () => {
        try {
            if (!legendaInput.value.trim()) return;

            const legenda = {
                mediaId,
                inicio: media.currentTime,
                fim: media.currentTime + 2,
                texto: legendaInput.value
            };

            const res = await fetch('/legendas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(legenda)
            });

            if (!res.ok) {
                throw new Error('Erro ao salvar legenda');
            }

            const salva = await res.json();
            legendas.push(salva);

            legendaInput.value = '';
        } catch (err) {
            console.error(err);
            alert('Erro ao adicionar legenda');
        }
    });

    media.addEventListener('timeupdate', () => {
        const atual = legendas.find(l =>
            media.currentTime >= l.inicio &&
            media.currentTime < l.fim
        );

        legendaDisplay.innerText = atual ? atual.texto : '';
    });
})();
