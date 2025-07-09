let entradaNome = document.getElementById("buscaNome")
let res = document.getElementById("listagem")

entradaNome.addEventListener("input", () => {
	fetch(`http://localhost:8081/professor/buscar?nome=${encodeURIComponent(entradaNome.value)}`)
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
						<th>&nbsp</th>
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
				<td>
					<a href="consultar.html?codProfessor=${professor.codProfessor}" target="_blank" class="btn-consultar">
						<span class="material-symbols-outlined" id="search-alunos" style="color: #0744B8; font-size: 100%;">search</span>
					</a>
				</td>
			</tr>
		`;
	});

	tabela += `</tbody></table>`;
	res.innerHTML = tabela;
})
})

document.addEventListener("DOMContentLoaded", () => {
    res.innerHTML = "Buscando dados..."
    // n-point https://www.npoint.io/docs/e406bcc22a2e7636e2e8
    // fetch('https://api.npoint.io/e406bcc22a2e7636e2e8')
	fetch('http://localhost:8081/professor')
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
                        <th>&nbsp</th>
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
                    <td>
                        <a href="consultar.html?codProfessor=${professor.codProfessor}" target="_blank" class="btn-consultar">
							<span class="material-symbols-outlined" id="search-alunos" style="color: #0744B8; font-size: 100%;">search</span>
                        </a>
                    </td>
                </tr>
            `;
        });

        tabela += `</tbody></table>`;
        res.innerHTML = tabela;
	})

    // alert("DOM carregado com DOMContentLoaded!");
});

