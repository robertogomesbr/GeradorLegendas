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

  const res = await fetch(`/medias/${mediaId}`);
  const mediaData = await res.json();

  const ext = mediaData.arquivo.split('.').pop().toLowerCase();
  const src = `/uploads/${mediaData.arquivo}`;

  let media;

  if (['mp4','webm'].includes(ext)) {
    container.innerHTML = `<video controls width="800"><source src="${src}"></video>`;
    media = container.querySelector('video');
  } else {
    container.innerHTML = `<audio controls><source src="${src}"></audio>`;
    media = container.querySelector('audio');
  }

  const legendas = [];

  btnAdd.addEventListener('click', () => {
    if (!legendaInput.value.trim()) return;

    legendas.push({
      inicio: media.currentTime,
      fim: media.currentTime + 2,
      texto: legendaInput.value
    });

    legendaInput.value = '';
  });

  media.addEventListener('timeupdate', () => {
    const atual = legendas.find(l =>
      media.currentTime >= l.inicio &&
      media.currentTime < l.fim
    );

    legendaDisplay.innerText = atual ? atual.texto : '';
  });
})();
