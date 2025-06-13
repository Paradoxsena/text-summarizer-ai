# backend/summarizer.py
import os
import openai
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def summarize_text(text):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Resuma o seguinte texto de forma clara e objetiva."},
            {"role": "user", "content": text}
        ],
        max_tokens=300
    )
    return response.choices[0].message.content.strip()