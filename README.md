# README.md
## Text Summarizer AI

### Descrição
Projeto simples em Flask + OpenAI para resumir arquivos .txt enviados pelo usuário via drag-and-drop.

### Como usar
```bash
# Instalar dependências
cd backend
pip install -r requirements.txt

# Criar .env com sua chave OpenAI
echo "OPENAI_API_KEY=sk-xxxx" > .env

# Rodar servidor
python app.py
```

Acesse `index.html` no navegador para testar.
