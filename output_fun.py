import math
import glob
import os
import json

cwd = os.getcwd()


def getparampaths(relativedir):
    """Returns a list of files params.txt"""
    Upath = os.path.join(cwd,relativedir)
    lf_params = glob.glob(os.path.join(Upath,"*params.txt"))
    return lf_params

def getnewickpaths(relativedir):
    """returns a list of files dnd, accepting all possible suffix"""
    Upath = os.path.join(cwd, relativedir)
    lf_newicks = glob.glob(os.path.join(Upath,"*dnd*"))
    if (lf_newicks == []):
        lf_newicks = glob.glob(os.path.join(Upath,"*.nhx*"))
    return lf_newicks

def file2list(onefile):
    stri_l = open(onefile, 'rt').readlines()
    stril_format = [i.replace("'","").replace("\\","").replace(";","").strip() for i in stri_l ]
    stril_format2 = [i.replace("/","").replace(" ","").replace("#","") for i in stril_format ]
    return stril_format2


def formattingparams(listofparamsfiles):
    """  OUTPUT is string as follows :
'{"loglik" : [["value", "-3216.54"]],\
		"phylos" : [["phy1", "...."]],\
		"models": [["M1_theta1","...."],\
			 ["..." ,"..."]],\
		"roots" : [["none","not given for this model"]],\
		"processes" : [["pr1=Nonhomog" , "..."], ..."""
    """attention: only double quotes (")  
         are accepted later by json PARSE"""
    if len(listofparamsfiles) == 1:
        """we expect only one file"""
        L = file2list(listofparamsfiles[0])
        d = {}
        d["phylos"] = []
        d["roots"] = []
        d["processes"] = []
        d["models"] = []
        for elemline in L:
            if 'Loglikelihood' in elemline:
                d["loglik"] = [["value", elemline.split('=')[1]]]
            elif 'phylo' and 'data' in elemline:
                tmp = elemline.split("(")
                d["phylos"].append([tmp[0], tmp[1]])
            elif 'process' and 'id' in elemline:
                tmp = elemline.split("),")
                d["processes"].append([ tmp[0].split('=(')[0], tmp[0].split('=(')[1]])
                d["processes"].append([tmp[1].split('=(')[0],tmp[1].split('=(')[1]])
                d["processes"].append(["tree/rate/root_freq",tmp[2]])
            elif 'model' in elemline:
                if not 'process' in elemline:
                    tmp = elemline.replace(")","").split("(")
                    mod = tmp[0]+"__"
                    modelparams = tmp[1].split(",")
                    for parval in modelparams:
                        lpv = parval.split("=")
                        d["models"].append([mod+lpv[0],lpv[1]])
            elif 'root_freq' and 'values' in elemline:
                tmp = elemline.split("=(")
                d["roots"].append([tmp[0],tmp[1]])
        if d["roots"] == []:
            d["roots"].append(["none","not given for this model"])
        print(d["processes"])
        return str(d).replace("'",'"')
    else:
        return "ERROR several parameters.txt files found, expected 1" 



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

#def dictio2json(mydictio):
#    myjson = json.dumps(str(mydictio),sort_keys=True)
#    return myjson

if __name__ == '__main__':
    dirresu = "RESULTS/"
    #user_project = "user001_runExmpl"
    print(cwd)
    #data = stringlikejson("RESULTS","user001")
	#datastr = str(dictio2json(data)) 
    locnewresu = "user01multiProcNHX_Res_001/"
    print("")
    print(formattingparams(getparampaths(locnewresu)))
    newickpaths = getnewickpaths(locnewresu)
    strtest = ''.join(open(newickpaths[0], 'rt').readlines())
    print(strtest)
    




