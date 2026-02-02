import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bharatyatra.settings')
application = None

# Ensure STATIC_ROOT directory exists to avoid runtime warnings when
# the container starts and Django's staticfiles expects the folder.
try:
	from django.conf import settings
	static_root = getattr(settings, 'STATIC_ROOT', None)
	if static_root:
		os.makedirs(static_root, exist_ok=True)
except Exception:
	# If Django isn't fully set up yet, defer creation; the release/build
	# step should handle collectstatic. Silently ignore errors here.
	pass

application = get_wsgi_application()
