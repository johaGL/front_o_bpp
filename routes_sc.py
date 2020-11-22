from flask import Flask, render_template, request, url_for, redirect
import os
import jinja2
from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
import json
from output_fun import * 


app = Flask(__name__)
@app.route('/')
@app.route('/results_sc', methods = ['POST', 'GET'] )
def results_sc(): 
	#data = request.args['data']
	data = '{"loglik" : [["value", "-3216.54"]],\
		"phylos" : [["phy1", "singleblahblah"]],\
		"models": [["m1_theta1","65656"],\
			 ["m2_kappa" ,"9898989"]],\
		"roots" : [["none","not given for this model"]],\
		"processes" : [["pr1=Nonhomog" , "wwwwww"],["pr1=Nonhomog" , "wwwwww"],["pr1=Nonhomog" , "wwwwww"],["pr1=Nonhomog" , "wwwwww"],["pr1=Nonhomog" , "wwwwww"]]}'
	nwkpaths = ["path1", "onsaitrecupererautantdepathsarbresresultats"]
	strtest = ''.join(open('test/treemine.nhx','rt').readlines())
	return render_template('results_sc.html', title = 'results', DATA=data, NWKFILEPATHS = nwkpaths, TEST=strtest)
	if request.method == 'POST':
		return "in progress++"
		
if __name__ == '__main__':
	app.run(debug=True)
