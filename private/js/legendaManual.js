const container = document.getElementById('playerContainer');

const params = new URLSearchParams(window.location.search);
const file = params.get('file');

if (!file) {
    alert('Arquivo não encontrado');
    window.location.href = '/private/home.html';
}

const ext = file.split('.').pop().toLowerCase();

const src = `/uploads/${file}`;

if (['mp4','webm','ogg'].includes(ext)) {

    container.innerHTML = `<video controls width="800"><source src="${src}">Seu navegador não suporta vídeo.</video>`;

} else if (['mp3','wav','ogg'].includes(ext)) {

    container.innerHTML = `<audio controls><source src="${src}">Seu navegador não suporte aúdio.</audio>`;

} else {

    alert('Formato não suportado');
    window.location.href = '/private/home.html';

}