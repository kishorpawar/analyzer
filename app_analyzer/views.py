# Create your views here.
from django.shortcuts import render_to_response
from django.core.context_processors import request

def home(request):
    
    return render_to_response("base.html")

def gender(request):
    
    print "gender view called."
    return render_to_response("gender.html")