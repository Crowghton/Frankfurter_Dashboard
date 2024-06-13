from django.shortcuts import render
from django.http import HttpResponse
from datetime import date
import requests
from django.template import loader
import json


def frankfurter(request):
    if request.method == 'GET':
        #GET call, modify for only CAD, USD and EUR, todo: relace latest with a timestamp from 2 years ago
        payload ={'to' : 'CAD,USD,EUR'}
        today = str(date.today())
        two_years_prior= str(int(today.split('-')[0])-2) + today[4:]
        r= requests.get('https://www.frankfurter.app/'+str(two_years_prior)+'..', params=payload)
        print(r.url)
        first=True
        output="["
        for data in r.text.split("rates:")[0].split("},"):
            if (first):
                first=False
                continue;
            row='{"date": ' +data.split(":")[0] + ', "EUR": 1, "CAD": ' + data.split('"CAD":')[1] +'},'
            output=output+ row  
            #print(row)
        #template = loader.get_template('display.html')
        #return HttpResponse(template.render() + str(r.text) )
        output=output[:-4]+']'
        print(output)
        return HttpResponse( output )
    else:
        return HttpResponse('404')
# Create your views here.


