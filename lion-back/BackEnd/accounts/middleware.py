from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse

class CustomExceptionMiddleware(MiddlewareMixin):
    def process_exception(self, request, exception):
        if hasattr(request, '_auth_response'):
            return request._auth_response
        return None
