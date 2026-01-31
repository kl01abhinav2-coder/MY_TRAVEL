# BharatYatra - Django Minimal Scaffold

This converts your static site into a minimal Django project so you can run it with `python manage.py runserver 8000`.

Quick start:

1. Create and activate a virtual environment (recommended)
   - python -m venv .venv
   - .\.venv\Scripts\activate
2. Install dependencies
   - pip install -r requirements.txt
3. Run migrations (creates SQLite DB file)
   - python manage.py migrate
4. Start the dev server on port 8000
   - python manage.py runserver 8000

Notes:
- This is a minimal scaffold: no authentication backend is provided (the site includes a demo client-side login stored in localStorage).
- To deploy in production, generate a secure SECRET_KEY and set DEBUG=False, configure ALLOWED_HOSTS, and serve static files properly.
