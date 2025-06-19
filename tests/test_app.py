import os
import sys
import tempfile
from flask.testing import FlaskClient

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import app


def test_index_get():
    client: FlaskClient = app.app.test_client()
    resp = client.get('/')
    assert resp.status_code == 200


def test_check_local_email():
    # Create temporary data file
    with tempfile.NamedTemporaryFile('w', delete=False) as f:
        f.write('foo@example.com\n')
        temp_name = f.name
    os.environ['DATA_FILE'] = temp_name
    client = app.app.test_client()
    resp = client.post('/', data={'email': 'foo@example.com'})
    assert b'found in a breach' in resp.data
    os.remove(temp_name)
    os.environ.pop('DATA_FILE')
