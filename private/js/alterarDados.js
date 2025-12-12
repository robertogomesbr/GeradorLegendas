document.addEventListener("DOMContentLoaded", async () => {
    const usuarioInput = document.querySelector('input[name="usuario"]');
    const emailInput = document.querySelector('input[name="email"]');
    const senhaInput = document.querySelector('input[name="senha"]');
    const btnSalvar = document.getElementById('btnSalvar');

    try {
        const resp = await fetch('/me-dados');
        if (!resp.ok) throw new Error("Erro ao buscar dados");
        const dados = await resp.json();
        usuarioInput.value = dados.usuario;
        emailInput.value = dados.email;
    } catch (err) {
        console.error(err);
        alert("Erro ao carregar dados");
    }

    btnSalvar.addEventListener("click", async () => {
        const usuario = usuarioInput.value;
        const email = emailInput.value;
        const senha = senhaInput.value;

        if (!usuario || !email || !senha) {
            alert("Preencha todos os campos");
            return;
        }

        try {
            const resp = await fetch('/alterar', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, email, senha }),
            });

            const dados = await resp.json();
            if (!resp.ok) {
                alert(dados.erro || "Erro ao alterar dados");
                return;
            }

            alert(dados.msg);
        } catch (err) {
            console.error(err);
            alert("Erro ao conectar com o servidor");
        }
    });
});
