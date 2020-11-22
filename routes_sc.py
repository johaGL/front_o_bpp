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
		"models": [["m1_theta1","65656"],\
		 	 ["m2_kappa" ,"9898989"]], "processes" : [["pr1=Nonhomog" , "wwwwww"],["pr1=Nonhomog" , "wwwwww"],["pr1=Nonhomog" , "wwwwww"],["pr1=Nonhomog" , "wwwwww"],["pr1=Nonhomog" , "wwwwww"],["pr1=Nonhomog" , "wwwwww"]]}'
	nwkpaths = ["path1", "onsaitrecupererautantdepathsarbresresultats"]
	return render_template('results_sc.html', title = 'results', DATA=data, NWKFILEPATHS = nwkpaths)
	if request.method == 'GET':
		return "in progress++"
		
if __name__ == '__main__':
	app.run(debug=True)
