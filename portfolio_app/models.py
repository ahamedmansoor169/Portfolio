from django.db import models

# Create your models here.
class Contact(models.Model):
    name = models.CharField(max_length=250, null=True, blank=True)
    email = models.EmailField(null=True,blank=True)
    phone_number = models.CharField(max_length=15, null=True,blank=True)
    service = models.CharField(max_length=250, null=True, blank=True)
    message = models.TextField(null=True, blank=True)