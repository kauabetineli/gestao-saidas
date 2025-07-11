let res = document.getElementById("listagem");

document.addEventListener("DOMContentLoaded", () => {
  listar();
});

// PENDENTE
// NEGADO
// AGUARDANDO RETORNO
// RETORNOU
function gerenciarSaida(permissao, codSaida) {
  if (permissao === "NEGADO") {
    if (!confirm("Tem certeza que deseja negar a saída?")) {
      return;
    }
  }

  fetch(`http://localhost:8081/saida/permissao/${codSaida}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(permissao),
  }).then(() => location.reload());
}

function listar() {
  res.innerHTML = "Buscando dados...";
  // n-point https://www.npoint.io/docs/e406bcc22a2e7636e2e8
  // fetch('https://api.npoint.io/e406bcc22a2e7636e2e8')
  fetch("http://localhost:8081/saida")
    .then((response) => response.json())
    .then((data) => {
      // <th>Código</th>
      let tabela = `
            <table border="0" cellpadding="6">
                <thead>
                    <tr>
                        
                        <th class="col-data">Solicitação</th>
                        <th class="col-motivo">Motivo</th>
                        <th class="col-status">Status</th>
                        <th>Destino</th>
                        <th>Aluno</th>
                        <th>Professor</th>
                        <th>&nbsp</th>
                    </tr>
                </thead>
                <tbody>
        `;

      data.forEach((saida) => {
        const [dataStr, horaCompleta] = saida.dataSolicitacao.split("T");

        // para remover os milissegundos
        const hora = horaCompleta.split(".")[0];

        // formata a data pra dd/mm/aaaa"
        const [ano, mes, dia] = dataStr.split("-");
        const dataFormatada = `${dia}/${mes}/${ano}`;
        // <td>${saida.codSaida}</td>

        let botoes = "";

        if (saida.status === "AGUARDANDO RETORNO") {
          // para botao de retorno
          botoes = `
        <span class="material-symbols-outlined finalizado" onclick="gerenciarSaida('FINALIZADO', ${saida.codSaida})" style="color: #FFA500; font-size: 80%; cursor: pointer; border: 1px solid #FFA500">redo</span>
		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
		`;
        } else {
          // para permitir ou negar
          botoes = `
        <span class="material-symbols-outlined permitir" onclick="gerenciarSaida('AGUARDANDO RETORNO', ${saida.codSaida})" style="color:rgb(0, 163, 0); font-size: 80%; cursor: pointer; border: 1px solid rgb(0, 163, 0)">check</span>
        &nbsp&nbsp&nbsp&nbsp
        <span class="material-symbols-outlined negar" onclick="gerenciarSaida('NEGADO', ${saida.codSaida})" style="color:rgb(184, 7, 7); font-size: 80%; cursor: pointer; border: 1px solid rgb(184, 7, 7)">close</span>
    `;
        }

        tabela += `
			<tr>
				<td class="col-data">${dataFormatada} ${hora}</td>
				<td class="col-motivo">${saida.motivo}</td>
				<td class="col-status">${saida.status}</td>
				<td>${saida.localDestino}</td>
				<td>${saida.nomeAluno}</td>
				<td>${saida.nomeProfessor}</td>
				<td>
					${botoes}
					&nbsp&nbsp&nbsp&nbsp
					<a href="consultar.html?codSaida=${saida.codSaida}" target="_blank" class="btn-consultar">
						<span class="material-symbols-outlined" id="search-alunos" style="color: #0744B8; font-size: 100%;">search</span>
					</a>
				</td>
			</tr>
		`;

        // tabela += `
        //     <tr>

        //         <td class="col-data">${dataFormatada} ${hora}</td>
        //         <td class="col-motivo">${saida.motivo}</td>
        //         <td>${saida.status}</td>
        //         <td>${saida.localDestino}</td>
        //         <td>${saida.nomeAluno}</td>
        //         <td>${saida.nomeProfessor}</td>
        //         <td>
        //             <span class="material-symbols-outlined permitir" onclick="gerenciarSaida('PERMITIDO', ${saida.codSaida})" style="color:rgb(0, 163, 0); font-size: 80%; cursor: pointer; border: 1px solid rgb(0, 163, 0)">check</span>
        //             &nbsp&nbsp&nbsp&nbsp

        //             <span class="material-symbols-outlined negar" onclick="gerenciarSaida('NEGADO', ${saida.codSaida})" style="color:rgb(184, 7, 7); font-size: 80%; cursor: pointer; border: 1px solid rgb(184, 7, 7)">close</span>
        //             &nbsp&nbsp&nbsp&nbsp

        //             <a href="consultar.html?codSaida=${saida.codSaida}" target="_blank" class="btn-consultar">
        //                 <span class="material-symbols-outlined" id="search-alunos" style="color: #0744B8; font-size: 100%;">search</span>
        //             </a>
        //         </td>
        //     </tr>
        // `;
      });
      // coisa do enzo
      // <span class="material-symbols-outlined" id="search-alunos" style="color: #0744B8; font-size: 85%;">edit</span>
      tabela += `</tbody></table>`;
      res.innerHTML = tabela;
    });
}
