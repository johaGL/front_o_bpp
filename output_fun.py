import math
import glob
import os
import json

cwd = os.getcwd()


def getparampaths(relativedir):
    """Returns a list of files params.txt which
     must be len==1, otherwise returns error"""
    Upath = os.path.join(cwd,relativedir)
    lf_params = glob.glob(os.path.join(Upath,"*params.txt"))
    if len(lf_params) > 1:
        return  "ERROR several 'params.txt' files found, expected 1" 
    else:
        return lf_params

def getnewickpaths(relativedir):
    """returns a list of files dnd, accepting all possible suffix"""
    Upath = os.path.join(cwd, relativedir)
    lf_newicks = glob.glob(os.path.join(Upath,"*dnd*"))
    nhxfiles_l = glob.glob(os.path.join(Upath,"*.nhx*"))
    lf_newicks += nhxfiles_l
    return lf_newicks

def file2list(onefile): #DO NOT use with newick EVER!
    stri_l = open(onefile, 'rt').readlines()
    stril_format = [i.replace("'","").replace("\\","").replace(";","").strip() for i in stri_l ]
    stril_format2 = [i.replace("/","").replace(" ","").replace("#","") for i in stril_format ]
    return stril_format2


def formattingparams(listofparamsfiles):
    """  OUTPUT is a 'json shaped' string as follows :
'{"loglik" : [["value", "-3216.54"]],\
		"phylos" : [["phy1", "...."]],\
		"models": {"model1_T92" : [["M1_theta1","...."],\
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
        d["processes"] = {}
        d["models"] = {}
        for elemline in L:
            if 'Loglikelihood' in elemline:
                d["loglik"] = [["value", elemline.split('=')[1]]]
            elif 'phylo' and 'data' in elemline:
                tmp = elemline.split("(")
                d["phylos"].append([tmp[0], tmp[1].strip(")")])
            elif 'process' and 'id' in elemline:
                prdc = {}
                tmp = elemline.split("),")
                prdsc_init_l = tmp[0].split('=(')[0].split("(")
                tt = prdsc_init_l[0].replace("=","_")
                sfx = tt.replace("process","").split("_")[0]
                prdc[tt] = []
                prdc[tt].append([ prdsc_init_l[1]+sfx, tmp[0].split('=(')[1]])
                #d["processes"].append([ tmp[0].split('=(')[0], tmp[0].split('=(')[1]])
                prdc[tt].append([tmp[1].split('=(')[0]+sfx, tmp[1].split('=(')[1]])
                prdc[tt].append(["tree/rate/root_freq"+sfx, tmp[2].strip(")")])
                d["processes"].update(prdc)
            elif 'model' in elemline:
                tmpdc = {}
                if not 'process' in elemline:
                    tmp = elemline.replace(")","").split("(")
                    modlabel = tmp[0]
                    modelparams = tmp[1].split(",")
                    prepnumname = modlabel.replace("model","").split("=")
                    numbermod = prepnumname[0] #p.ex: '2'
                    namemod = prepnumname[1]#p.ex: "T92"
                    mykey = "model"+numbermod+"_"+namemod
                    tmpdc[mykey] = []
                    for parval in modelparams:
                        lpv = parval.split("=")
                        value = lpv[1]
                        tmpdc[mykey].append([namemod+"_"+lpv[0]+"_"+str(numbermod), value])
                d["models"].update(tmpdc)
            elif 'root_freq' and 'values' in elemline:
                tmp = elemline.split("=(")
                d["roots"].append([tmp[0].replace("("," "), tmp[1].strip(")")])
        if d["roots"] == []:
            d["roots"].append(["none","not given for this model"])
        print(d["processes"])
        return str(d).replace("'",'"')
    else:
        return "ERROR, only one file params.txt must exist" 

def getprofilepath(relativedir):
    """Returns profile path"""
    Upath = os.path.join(cwd,relativedir)
    lf_profile = glob.glob(os.path.join(Upath,"*profile"))
    if len(lf_profile) > 1:
        return  "ERROR several 'profile' files found, expected 1" 
    else:
        return lf_profile

def getBranchesProfile(filepath):
    print(filepath)
    try:
        stri_l = open(filepath[0], 'rt').readlines()
        header = stri_l[0].strip().split("\t")
        bottom = stri_l[-1].strip().split("\t")
        dico = {}
        k = len(header)
        for i in range(k):
            #depending on suffix ('_1' for example)
            #add to respective tree key
            if 'BrLen' in header[i]:
                tmp = header[i].split("_")
                suffix = tmp[1]
                name = tmp[0].replace('BrLen','')
                if not "branchestree_"+suffix in dico.keys():
                    dico["branchestree_"+suffix] = {}
                    dico["branchestree_"+suffix][int(name)] = bottom[i]
                else:
                    dico["branchestree_"+suffix][int(name)] = bottom[i]
        print(dico)  
        return dico
    except:
        print("unable to extract branches profile")

### all unnecessary functions deleted



if __name__ == '__main__':
    dirresu = "RESULTS/"
    #user_project = "user001_runExmpl"
    print(cwd)
    #data = stringlikejson("RESULTS","user001")
	#datastr = str(dictio2json(data)) 
    locnewresu = "user01multiProcNHX_Res_001/" 
    #locnewresu = "multiData_Res/"  
    print("")
    print(formattingparams(getparampaths(locnewresu)))
    newickpaths = getnewickpaths(locnewresu)
    strtest = ''.join(open(newickpaths[0], 'rt').readlines())
    print(getBranchesProfile(getprofilepath(locnewresu)))
    print(newickpaths)
    




