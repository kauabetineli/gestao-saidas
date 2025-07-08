document.addEventListener("DOMContentLoaded", () => {
    let res = document.getElementById("listagem")
    res.innerHTML = "Buscando dados..."
    // n-point https://www.npoint.io/docs/e406bcc22a2e7636e2e8
    fetch('https://api.npoint.io/e406bcc22a2e7636e2e8')
    .then(response => response.json())
    .then(data => {
        let tabela = `
            <table border="0" cellpadding="6">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Matrícula</th>
                        <th>Telefone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
        `;

        data.forEach(aluno => {
            tabela += `
                <tr>
                    <td>${aluno.codAluno}</td>
                    <td>${aluno.nome}</td>
                    <td>${aluno.sobrenome}</td>
                    <td>${aluno.matricula}</td>
                    <td>${aluno.telefone}</td>
                    <td>${aluno.email}</td>
                </tr>
            `;
        });

        tabela += `</tbody></table>`;
        res.innerHTML = tabela;
    })
});

