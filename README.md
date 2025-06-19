# breachdump

This is a simple demonstration website that lets you check if an email address appears in a list of breached emails. The application uses Flask and can optionally fetch a public list of breached emails from a URL.

## Running

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. (Optional) Set `SCRAPE_URL` to a URL containing newline separated emails you are authorized to access:
   ```bash
   export SCRAPE_URL="https://example.com/breaches.txt"
   ```
3. Start the server:
   ```bash
   python app.py
   ```
4. Open `http://localhost:5000` in your browser and enter an email to check.

The default dataset is located in `data/breached_emails.txt` and is provided only as an example. Replace or extend it with your own sources.

## Disclaimer

Use this project responsibly. Only query or scrape data that you are legally permitted to access and ensure you comply with the terms of any external sites or APIs you use.
