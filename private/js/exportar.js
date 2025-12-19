(async () => {
    const params = new URLSearchParams(window.location.search);
    const mediaId = params.get('mediaId');

    if (!mediaId) {
        alert('Media não encontrada');
        return;
    }

    const res = await fetch(`/legendas/${mediaId}`);
    const legendas = await res.json();

    function formatarTempo(segundos) {
        const h = String(Math.floor(segundos / 3600)).padStart(2, '0');
        const m = String(Math.floor((segundos % 3600) / 60)).padStart(2, '0');
        const s = String(Math.floor(segundos % 60)).padStart(2, '0');
        const ms = String(Math.floor((segundos % 1) * 1000)).padStart(3, '0');

        return `${h}:${m}:${s},${ms}`;
    }

    function gerarSRT() {
        return legendas.map((l, i) => {
            return `${i + 1}
${formatarTempo(l.inicio)} --> ${formatarTempo(l.fim)}
${l.texto}
`;
        }).join('\n');
    }

    const preview = document.getElementById('preview');
    const conteudoSRT = gerarSRT();
    preview.textContent = conteudoSRT;

    document.getElementById('btnExportarSRT').addEventListener('click', () => {
        const blob = new Blob([conteudoSRT], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'legendas.srt';
        a.click();

        setTimeout(() => {
            URL.revokeObjectURL(url);
            location.href = '/private/home.html';
        }, 500);

    });

    document.getElementById('btnVoltar').addEventListener('click', () => {
        location.href = `/legenda/manual?mediaId=${mediaId}`;
    });
})();
