document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const usuario = document.getElementById('usuarioLogin').value;
            const senha = document.getElementById('senhaLogin').value;

            if (!usuario || !senha) {
                alert('Preencha login e senha!');
                return;
            }

            try {
                const resp = await fetch("/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ usuario, senha }),
                });

                const dados = await resp.json();

                if (!resp.ok) {
                    alert(dados.erro || "Erro ao fazer login");
                    return;
                }

                localStorage.setItem("usuario", JSON.stringify(dados.usuario));
                window.location.href = "home.html";
            } catch (err) {
                console.error(err);
                alert("Falha na conexão do servidor.");
            }
        });
    }
});