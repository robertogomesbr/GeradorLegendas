const btn = document.getElementById("btnAvancar");

const params = new URLSearchParams(window.location.search);
const mediaId = params.get("mediaId");

btn.addEventListener("click", () => {
    if (!mediaId) {
        alert("Mídia não encontrada");
        return;
    }

    window.location.href = `/private/legenda/manual.html?mediaId=${mediaId}`;
});
