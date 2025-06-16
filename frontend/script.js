const dropArea = document.getElementById("drop-area");
const summaryDiv = document.getElementById("summary");
const summaryContainer = document.getElementById("summary-container");
const loadingDiv = document.getElementById("loading");

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.style.borderColor = "#4b47d1";
  dropArea.style.backgroundColor = "#eef0ff";
});

dropArea.addEventListener("dragleave", () => {
  dropArea.style.borderColor = "#6c63ff";
  dropArea.style.backgroundColor = "#f9f9ff";
});

dropArea.addEventListener("drop", async (e) => {
  e.preventDefault();
  dropArea.style.borderColor = "#6c63ff";
  dropArea.style.backgroundColor = "#f9f9ff";

  const file = e.dataTransfer.files[0];
  if (!file || !file.name.endsWith(".txt")) {
    alert("Por favor, envie apenas arquivos .txt");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  loadingDiv.style.display = "block";
  summaryContainer.style.display = "none";

  try {
    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    summaryDiv.textContent = data.summary || data.error;
    summaryContainer.style.display = "block";
  } catch (error) {
    summaryDiv.textContent = "Erro ao conectar com o servidor.";
    summaryContainer.style.display = "block";
  } finally {
    loadingDiv.style.display = "none";
  }
});

function clearSummary() {
  summaryDiv.textContent = "";
  summaryContainer.style.display = "none";
}

function downloadSummary() {
  const text = summaryDiv.textContent;
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.download = "resumo.txt";
  link.href = window.URL.createObjectURL(blob);
  link.click();
}
