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
	#userfolder = request.args['userfolder']
	#userfolder = "user01multiProcNHX_Res_001/"
	userfolder = "testTreeParams/"
	data = formattingparams(getparampaths(userfolder)) #json-like string, it works ok downstream
	newickpaths = getnewickpaths(userfolder) # a list of newick files in this folder
	strtest = ''.join(open(newickpaths[0], 'rt').readlines())
	#strtest = ''.join(open('testTreeParams/SPOND.dnd_1','rt').readlines())
	return render_template('results_sc.html', title = 'results', DATA=data,  TEST=strtest)
	if request.method == 'POST':
		return "in progress++"
		
if __name__ == '__main__':
	app.run(debug=True)
