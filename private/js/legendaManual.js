const container = document.getElementById('playerContainer');
const btnAdd = document.getElementById('btnAdd');
const legendaInput = document.getElementById('legendaInput');
const legendaDisplay = document.getElementById('legendaDisplay');

const params = new URLSearchParams(window.location.search);
const file = params.get('file');

if (!file) {
    alert('Arquivo não encontrado');
    window.location.href = '/private/home.html';
}

const ext = file.split('.').pop().toLowerCase();

const src = `/uploads/${file}`;

let media;

if (['mp4','webm'].includes(ext)) {

    container.innerHTML = `<video controls width="800"><source src="${src}">Seu navegador não suporta vídeo.</video>`;

    media = container.querySelector('video');

} else if (['mp3','wav','ogg'].includes(ext)) {

    container.innerHTML = `<audio controls><source src="${src}">Seu navegador não suporte aúdio.</audio>`;

    media = container.querySelector('audio');

} else {

    alert('Formato não suportado');
    window.location.href = '/private/home.html';

}

const legendas = [];

btnAdd.addEventListener('click', () => {
    if(!legendaInput.value.trim()) return; 

    legendas.push({
        texto: legendaInput.value,
        tempo: media.currentTime
    });

    legendaInput.value = '';
    console.log(legendas);
});

media.addEventListener('timeupdate', () => {
    const atual = legendas.find((l) =>
        media.currentTime >= l.tempo && media.currentTime < l.tempo + 2
    );

    legendaDisplay.innerText = atual ? atual.texto : '';
});