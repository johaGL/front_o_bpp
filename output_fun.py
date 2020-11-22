import math
import glob
import os
import json

cwd = os.getcwd()

def filetostring(dir_fullpath, regexpat):
    f_given = glob.glob(os.path.join(dir_fullpath,regexpat))
    stri_l = open(f_given[0], 'rt').readlines()
    stri_format = [i.replace("'","").replace("\\","").replace(";","").strip() for i in stri_l ]
    stri_format2 = [i.replace("/","").replace("+","").replace("#","") for i in stri_format ]
    stri = ''.join(stri_format2)
    return stri

def dictionnary(resdir,userdir):
    Upath = os.path.join(cwd,resdir,userdir)
    #paramsstring = filetostring(Upath, "*params.txt")
    dicti = {}
    dicti["paramsout"] = filetostring(Upath, "*params.txt")
    dicti["newick"] = filetostring(Upath, "*.dnd")
    return dicti

#def stringlikejson(resdir,userdir):
#    Upath = os.path.join(cwd,resdir,userdir)
#    stri = ""
#    stri += '{"paramsout" : "'+ filetostring(Upath, "*.dnd") +'"}'
#    return stri
#    # '{"toto" : "yeah...mystring" }'

def stringlikejson(resdir, userdir):
    Upath = os.path.join(cwd, resdir, userdir)
    nwk = filetostring(Upath, "*.dnd")
    tmp = '{"newick" : "mystringnwk"}'
    nwk_strdict = tmp.replace("mystringnwk",nwk)
    return nwk_strdict


def getjustnewick(resdir,userdir):
    Upath = os.path.join(cwd,resdir,userdir)
    strinwk = filetostring(Upath, "*.dnd")
    return strinwk


def dictio2json(mydictio):
    myjson = json.dumps(str(mydictio),sort_keys=True)
    return myjson


"""
returns pow given two integers in a txt file:
8
2
"""
def getpower(filepth):
    txtcnt = open(filepth, 'rt')
    nb_l = [i.replace('\n','') for i in txtcnt.readlines()]
    return math.pow(int(nb_l[0]), int(nb_l[1]))


if __name__ == '__main__':
    dirresu = "RESULTS/"
    #user_project = "user001_runExmpl"
    print(getpower(dirresu+"hellokit.txt"))
    print(cwd)
    data = stringlikejson("RESULTS","user001")
	#datastr = str(dictio2json(data)) 
    print(data)



