const btn = document.getElementById("btnAvancar");
const form = document.getElementById("form-modo");

const params = new URLSearchParams(window.location.search);
document.getElementById("inputFile").value = params.get("file");

btn.addEventListener("click", () => {
    form.submit();
});
