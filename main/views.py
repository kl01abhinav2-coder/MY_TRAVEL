from django.shortcuts import render
from django.http import HttpResponse
import logging

logger = logging.getLogger(__name__)


def index(request):
    try:
        return render(request, 'index.html')
    except Exception:
        # Log the full exception to stdout (captured by Railway logs)
        logger.exception('Error rendering index.html')
        return HttpResponse('Temporary error serving the page. Admin alerted.', status=500)
