from tastypie.resources import ModelResource
from tastypie import fields

from app_analyzer.models import Admission, Experience, Personal, TestScore
from tastypie.constants import ALL

class PersonalResource(ModelResource):        
    class Meta:
        queryset = Personal.objects.all()
        resource_name = "personal"
        filtering = {
            "gender":ALL,
            "date_of_birth":ALL,
            "citizenship":ALL,
                     }
        

class AdmissinoResource(ModelResource):
    
    candidate = fields.ForeignKey(PersonalResource,"candidate")
    class Meta:
        queryset = Admission.objects.all()
        resource_name = "admission"
        filtering = {
            "session"   : ALL,
            "year"      : ALL,
            "degree"    : ALL,
            "program"   : ALL,
            "specialization": ALL,
            "year_graduated": ALL
                     }
    
class ExperienceResource(ModelResource):
    
    candidate = fields.ForeignKey(PersonalResource,"candidate")
    class Meta:
        queryset = Experience.objects.all()
        resource_name = "experience"
        filtering = {
            "job_title" : ALL,
            "employer"  : ALL,
            "duration"  : ALL
                     }

        
class TestScoreResource(ModelResource):
    
    candidate = fields.ForeignKey(PersonalResource,"candidate")
    class Meta:
        queryset = TestScore.objects.all()
        resource_name = "testscore"
        filtering = {
            "test"   : ALL,
            "test_type" : ALL,
            "score"     : ALL
                     }