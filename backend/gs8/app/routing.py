# routing.py
from django.urls import path
from django.urls import re_path
# from .consumers import * # Import your consumer
from .consumers import * 

websocket_urlpatterns = [
    re_path(r'ws/asc', myConsumer.as_asgi()),  # WebSocket URL
    re_path(r'ws/interval',send_interval.as_asgi()), 
    
]
