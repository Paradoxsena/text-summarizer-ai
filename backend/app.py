from flask import Flask, request, jsonify
from flask_cors import CORS
from summarizer import summarize_text
import os

app = Flask(__name__)
CORS(app)  # Permite requisições do frontend

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files.get('file')
    if not file:
        return jsonify({"error": "Nenhum arquivo enviado."}), 400

    content = file.read().decode('utf-8')
    summary = summarize_text(content)
    return jsonify({"summary": summary})

if __name__ == '__main__':
    app.run(debug=True)