from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

# Load secret key from environment or fallback (not recommended for production)
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'replace-this-with-a-secure-key')

# DEBUG should be False in production; can be set via env variable for flexibility
DEBUG = os.getenv('DJANGO_DEBUG', 'False').lower() in ['true', '1', 'yes']

ALLOWED_HOSTS = [
    ".railway.app",
    "localhost",
    "127.0.0.1",
]



INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'main',
]


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = 'bharatyatra.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
            ],
        },
    },
]

WSGI_APPLICATION = 'bharatyatra.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'

# Directory where static files will be collected to
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Additional directories to look for static files (useful in development)
STATICFILES_DIRS = [BASE_DIR / 'static']

# Use WhiteNoise storage backend to serve compressed static files with cache busting
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Optional but recommended production security settings
SECURE_SSL_REDIRECT = os.getenv('DJANGO_SECURE_SSL', 'True').lower() in ['true', '1', 'yes']
SESSION_COOKIE_SECURE = os.getenv('DJANGO_SECURE_SSL', 'True').lower() in ['true', '1', 'yes']
CSRF_COOKIE_SECURE = os.getenv('DJANGO_SECURE_SSL', 'True').lower() in ['true', '1', 'yes']
SECURE_HSTS_SECONDS = 3600 if not DEBUG else 0
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Logging: send errors and critical exceptions to stdout so Railway captures them
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'WARNING',
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
        'django.request': {
            'handlers': ['console'],
            'level': 'ERROR',
            'propagate': False,
        },
    },
}

