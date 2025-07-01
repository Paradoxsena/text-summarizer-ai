const dropArea = document.getElementById('drop-area');
const summaryDiv = document.getElementById('summary');
const loader = document.getElementById('loader');
const clearBtn = document.getElementById('clear-btn');
const downloadBtn = document.getElementById('download-btn');

dropArea.addEventListener('dragover', e => {
  e.preventDefault();
  dropArea.style.borderColor = 'blue';
});

dropArea.addEventListener('dragleave', () => {
  dropArea.style.borderColor = '#ccc';
});

dropArea.addEventListener('drop', async e => {
  e.preventDefault();
  dropArea.style.borderColor = '#ccc';
  const file = e.dataTransfer.files[0];

  if (!file.name.endsWith('.txt') && !file.name.endsWith('.docx')) {
    summaryDiv.textContent = 'Apenas arquivos .txt ou .docx são suportados.';
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  loader.classList.remove('hidden');
  summaryDiv.textContent = '';

  try {
    const res = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    summaryDiv.textContent = data.summary || data.error;
  } catch (error) {
    summaryDiv.textContent = 'Erro ao processar o arquivo.';
  } finally {
    loader.classList.add('hidden');
  }
});

clearBtn.addEventListener('click', () => {
  summaryDiv.textContent = '';
});

downloadBtn.addEventListener('click', () => {
  const text = summaryDiv.textContent;
  if (!text) return;

  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'resumo.txt';
  link.click();
});


