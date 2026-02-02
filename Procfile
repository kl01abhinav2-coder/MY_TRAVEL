release: mkdir -p /app/staticfiles && python manage.py collectstatic --no-input
web: gunicorn bharatyatra.wsgi --log-file - --bind 0.0.0.0:$PORT
