from deep_translator import GoogleTranslator
import cohere
import os
from dotenv import load_dotenv

load_dotenv()
cohere_api_key = os.getenv("COHERE_API_KEY")
co = cohere.Client(cohere_api_key)

def summarize_text(text):
    try:
        response = co.summarize(
            text=text,
            length='medium',         # ou 'short', 'long'
            format='paragraph',      # ou 'bullets'
            model='command',         # modelo padrão
            additional_command='Resuma o seguinte texto de forma clara e objetiva.'
        )
        translated = GoogleTranslator(source='auto', target='pt').translate(response.summary)
        return translated


    except Exception as e:
        print(f"[Erro ao resumir o texto] → {e}")
        return "Erro ao gerar resumo. Verifique a chave da API ou o conteúdo enviado."


# Teste rápido no terminal:
if __name__ == "__main__":
    texto_exemplo = input("Digite o texto que deseja resumir:\n")
    print("\nResumo gerado:\n")
    print(summarize_text(texto_exemplo))