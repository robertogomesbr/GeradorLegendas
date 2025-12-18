const btn = document.getElementById("btnAvancar");
const form = document.getElementById("form-modo");

const params = new URLSearchParams(window.location.search);
document.getElementById("mediaId").value = params.get("mediaId");

btn.addEventListener("click", () => {
    form.submit();
});
