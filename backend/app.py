from flask import Flask, request, jsonify
from flask_cors import CORS
from summarizer import summarize_text
import os
from docx import Document

app = Flask(__name__)
CORS(app)

def extract_text(file):
    filename = file.filename.lower()
    if filename.endswith(".txt"):
        return file.read().decode('utf-8')
    elif filename.endswith(".docx"):
        doc = Document(file)
        return "\n".join([para.text for para in doc.paragraphs])
    else:
        return None

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files.get('file')
    if not file:
        return jsonify({"error": "Nenhum arquivo enviado."}), 400

    content = extract_text(file)
    if content is None:
        return jsonify({"error": "Formato de arquivo não suportado. Use .txt ou .docx"}), 400

    summary = summarize_text(content)
    return jsonify({"summary": summary})

if __name__ == '__main__':
    app.run(debug=True)