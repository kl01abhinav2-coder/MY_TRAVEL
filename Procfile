release: python manage.py collectstatic --no-input --clear
web: gunicorn bharatyatra.wsgi --log-file - --bind 0.0.0.0:$PORT
