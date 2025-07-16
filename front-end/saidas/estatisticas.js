document.addEventListener("DOMContentLoaded", () => {
      const ctx = document.getElementById('myChart');
  
      fetch(`http://localhost:8081/saida/estatisticas`)
          .then(res => {
              if (!res.ok) throw new Error("Erro ao buscar estatísticas");
              return res.json();
          })
          .then(data => {
              const contagemPorLocal = {};
  
              data.forEach(item => {
                  const local = item.localDestino;
                  const qtd = item.quantidade;
                  if (contagemPorLocal[local]) {
                      contagemPorLocal[local] += qtd;
                  } else {
                      contagemPorLocal[local] = qtd;
                  }
              });
  
              const rotulos = Object.keys(contagemPorLocal);
              const valores = Object.values(contagemPorLocal);
  
              new Chart(ctx, {
                  type: 'bar',
                  data: {
                      labels: rotulos,
                      datasets: [{
                          label: 'Total de Visitas por Local',
                          data: valores,
                          backgroundColor: '#F3F3F3',
                          borderColor: '#0744B8',
                          borderWidth: 2
                      }]
                  },
                  options: {
                      scales: {
                          y: {
                              beginAtZero: true
                          }
                      }
                  }
              });
          })
          .catch(error => {
              console.error("Erro ao carregar dados do gráfico:", error);
          });
  });