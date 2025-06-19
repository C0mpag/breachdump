from flask import Flask, render_template, request
import os
import requests

app = Flask(__name__)

DATA_FILE = os.environ.get("DATA_FILE", "data/breached_emails.txt")
SCRAPE_URL = os.environ.get("SCRAPE_URL")


def load_local_emails():
    try:
        with open(DATA_FILE, "r") as f:
            return set(line.strip().lower() for line in f if line.strip())
    except FileNotFoundError:
        return set()


def fetch_remote_emails():
    if not SCRAPE_URL:
        return set()
    try:
        resp = requests.get(SCRAPE_URL, timeout=10)
        resp.raise_for_status()
        content = resp.text
        return set(line.strip().lower() for line in content.splitlines() if line.strip())
    except Exception:
        return set()


@app.route('/', methods=['GET', 'POST'])
def index():
    result = None
    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        if email:
            emails = load_local_emails()
            emails.update(fetch_remote_emails())
            result = email in emails
    return render_template('index.html', result=result)


if __name__ == '__main__':
    app.run(debug=True)
