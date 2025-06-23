from django.urls import path
from portfolio_app import views
from portfolio_project import settings
from django.conf.urls.static import static

urlpatterns = [
    path("",views.index, name="index"),
    path("about/",views.about, name="about"),
    path("contact/",views.contact, name="contact"),
    path("projects/",views.projects, name="projects"),
    path("services/",views.services, name="services"),
]

if settings.DEBUG == True or False:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)