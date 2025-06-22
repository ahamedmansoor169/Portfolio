from django.shortcuts import render

def index(request):
    return render(request, "portfolio_app/index.html")

def about(request):
    return render(request, "portfolio_app/about.html")

def contact(request):
    return render(request, "portfolio_app/contact.html")

def projects(request):
    return render(request, "portfolio_app/projects.html")

def services(request):
    return render(request, "portfolio_app/services.html")
