let res = document.getElementById("listagem")

document.addEventListener("DOMContentLoaded", () => {
    res.innerHTML = "Buscando dados..."
    // n-point https://www.npoint.io/docs/e406bcc22a2e7636e2e8
    // fetch('https://api.npoint.io/e406bcc22a2e7636e2e8')
	fetch('http://localhost:8081/saida')
    .then(response => response.json())
    .then(data => {
        let tabela = `
            <table border="0" cellpadding="6">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Data e Horário</th>
                        <th>Motivo</th>
                        <th>Status</th>
                        <th>Destino</th>
                        <th>Aluno</th>
                        <th>Professor</th>
                        <th>&nbsp</th>
                    </tr>
                </thead>
                <tbody>
        `;
        

        data.forEach(saida => {
            const [dataStr, horaCompleta] = saida.dataSolicitacao.split("T");

            // para remover os milissegundos
            const hora = horaCompleta.split(".")[0];

            // formata a data pra dd/mm/aaaa"
            const [ano, mes, dia] = dataStr.split("-");
            const dataFormatada = `${dia}/${mes}/${ano}`;
            tabela += `
                <tr>
                    <td>${saida.codSaida}</td>
                    <td>${dataFormatada} ${hora}</td>
                    <td>${saida.motivo}</td>
                    <td>${saida.status}</td>
                    <td>${saida.localDestino}</td>
                    <td>${saida.nomeAluno}</td>
                    <td>${saida.nomeProfessor}</td>
                    <td>
                        <span class="material-symbols-outlined" id="search-alunos" style="color:rgb(0, 163, 0); font-size: 100%; cursor: pointer; border: 1px solid rgb(0, 163, 0)">check</span>
                        &nbsp&nbsp&nbsp&nbsp

                        <span class="material-symbols-outlined" id="search-alunos" style="color:rgb(184, 7, 7); font-size: 100%; cursor: pointer; border: 1px solid rgb(184, 7, 7)">close</span>
                        &nbsp&nbsp&nbsp&nbsp
                        
                        <a href="consultar.html?codSaida=${saida.codSaida}" target="_blank" class="btn-consultar">
                            <span class="material-symbols-outlined" id="search-alunos" style="color: #0744B8; font-size: 100%;">search</span>
                        </a>
                    </td>
                </tr>
            `;
        });
        // coisa do enzo
        // <span class="material-symbols-outlined" id="search-alunos" style="color: #0744B8; font-size: 85%;">edit</span>
        tabela += `</tbody></table>`;
        res.innerHTML = tabela;
	})

    // alert("DOM carregado com DOMContentLoaded!");
});