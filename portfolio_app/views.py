from django.shortcuts import render, redirect
from portfolio_app.models import Contact
from django.contrib import messages

def index(request):
    return render(request, "portfolio_app/index.html")

def about(request):
    return render(request, "portfolio_app/about.html")

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('conEmail')
        phone_number = request.POST.get('conPhone')
        service = request.POST.get('conService')
        message = request.POST.get('conMessage')

        conatct = Contact.objects.create(
            name = name,
            email = email,
            phone_number = phone_number,
            service = service,
            message = message
        )        
        messages.success(request, 'Your message has been sent successfully!')
        return redirect('contact')
    return render(request, "portfolio_app/contact.html")

def projects(request):
    return render(request, "portfolio_app/projects.html")

def services(request):
    return render(request, "portfolio_app/services.html")
