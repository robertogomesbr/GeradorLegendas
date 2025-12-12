document.addEventListener("DOMContentLoaded", function () {

    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const usuario = document.getElementById('usuarioCadastro').value;
            const email = document.getElementById('emailCadastro').value;
            const senha = document.getElementById('senhaCadastro').value;

            if (!usuario || !email || !senha) {
                alert('Preencha todos os campos!');
                return;
            }

            try {
                const resp = await fetch("/cadastrar", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ usuario, email, senha }),
                });

                const dados = await resp.json();

                if (!resp.ok) {
                    alert(dados.erro || "Erro ao cadastrar");
                    return;
                }

                alert("Cadastro realizado com sucesso!");
                window.location.href = "index.html";
            } catch (err) {
                console.error(err);
                alert("Falha na conexão do servidor.");
            }

        });
    }
});