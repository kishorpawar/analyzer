from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
 
from Analyzer import  constants

# Create your models here.

class Personal(models.Model):
    first_name  = models.CharField(max_length = 100)
    middle_name = models.CharField(max_length = 100, null = True)
    last_name   = models.CharField(max_length = 100)
    date_of_birth   = models.DateField()
    gender      = models.CharField(max_length = 1, choices = constants.GENDER)
    preffered_contact = PhoneNumberField()
    secondary_contact = PhoneNumberField(blank = True)
    email       = models.EmailField(max_length = 100)
    citizenship = models.CharField(max_length = 100)
    passport_no = models.CharField(max_length = 300)
    
    class Meta:
        db_table    = "an_personal_info"
        
    
class Admission(models.Model):
    candidate   = models.ForeignKey(Personal)
    session     = models.CharField(max_length = 50, choices = constants.SESSION)
    year        = models.DateField()
    degree      = models.CharField(max_length = 300, choices = constants.DEGREES)
    program     = models.CharField(max_length = 300)
    specialization = models.CharField(max_length = 300, null = True)
    last_school = models.CharField(max_length = 300)
    address     = models.CharField(max_length = 300, null = True)
    city        = models.CharField(max_length = 100, null = True)
    year_gratuated = models.DateField()
    
    class Meta:
        db_table    = "an_admission_info"

class Experience(models.Model):
    candidate   = models.ForeignKey(Personal)
    job_title   = models.CharField(max_length = 100)
    employer    = models.CharField(max_length = 100)
    duration    = models.SmallIntegerField()
    
    class Meta:
        db_table    = "an_experience_info"
  

class TestScore(models.Model):
    candidate   = models.ForeignKey(Personal)
    test        = models.CharField(max_length = 10, choices = constants.TESTS)
    test_type   = models.CharField(max_length = 20, choices = constants.TEST_TYPES, null = True)
    score       = models.FloatField()
    
    class Meta:
        db_table    = "an_test_score"