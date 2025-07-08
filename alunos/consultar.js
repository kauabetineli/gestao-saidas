document.addEventListener("DOMContentLoaded", () => {
      const urlParams = new URLSearchParams(window.location.search);
      const codAluno = urlParams.get("codAluno");

      if (codAluno) {
          document.getElementById("codigo").value = codAluno;

      //     fazer codigo de fetch
      }
  });