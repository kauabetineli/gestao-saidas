document.addEventListener("DOMContentLoaded", () => {
    let res = document.getElementById("listagem")
    res.innerHTML = "Buscando dados..."
    // n-point https://www.npoint.io/docs/f08bccd6086c1ae4a90d
    fetch('https://api.npoint.io/f08bccd6086c1ae4a90d/')
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

        data.forEach(professor => {
            tabela += `
                <tr>
                    <td>${professor.codProfessor}</td>
                    <td>${professor.nome}</td>
                    <td>${professor.sobrenome}</td>
                    <td>${professor.matricula}</td>
                    <td>${professor.telefone}</td>
                    <td>${professor.email}</td>
                </tr>
            `;
        });

        tabela += `</tbody></table>`;
        res.innerHTML = tabela;
    })


    // alert("DOM carregado com DOMContentLoaded!");
  });