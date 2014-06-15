from django.conf.urls import patterns, include, url
from django.contrib import admin
from tastypie.api import Api

from app_analyzer.api import AdmissinoResource, ExperienceResource, \
                            PersonalResource,TestScoreResource

v1_api = Api(api_name="an_v1")
v1_api.register(PersonalResource())
v1_api.register(AdmissinoResource())
v1_api.register(ExperienceResource())
v1_api.register(TestScoreResource())

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'app_analyzer.views.home', name='home'),
    url(r'^gender/$', 'app_analyzer.views.gender', name='gender'),
    # url(r'^Analyzer/', include('Analyzer.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    #url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(v1_api.urls)),
)
