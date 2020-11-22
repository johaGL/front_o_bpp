 /*
 This javascript needs tag:
 <span hidden id="show2">{{data}}</span>
 existing in results.html
*/
function RecreateDynamicTextboxes(refparent,alist,categ){
    for (var i=(alist.length)-1; i>=0; i--) {
        var parent = "";
        tmp = alist[i];
        if (i == (alist.length)-1 ){
            parent = refparent;
        }
        else{
            j = i+1
            parent = categ+j;
        }
        var display = document.createElement("TEXTAREA");
        var label = document.createElement("label");
        display.setAttribute("id", categ+i);
        display.style.height = "20px";
        label.setAttribute("id",categ+i);
        var t = document.createTextNode(tmp[1]);
        var l = document.createTextNode(tmp[0]+":");
        display.appendChild(t);
        label.appendChild(l);
        var papa = document.getElementById(parent);
        var parentDiv = papa.parentNode;
        parentDiv.insertBefore(display,papa);
        var papabox = document.getElementById(categ+i);
        var parentDivbox = papabox.parentNode;
        parentDivbox.insertBefore(label,papabox);
    };  
}; 

function assignDynTextboxes(values,categ){
    var DATASTR = document.getElementById('DATA').innerHTML;
    var jsonobj = JSON.parse(DATASTR); //very important
    //note: parameters nested lists (li) are known containing only two values
    /*for (let prop in jsonobj.models){
        for (let li in jsonobj.models[prop]){
            tmp = jsonobj.models[prop][li][0] +"::"+ jsonobj.models[prop][li][1];
            concatvars = concatvars +  "__" + tmp;
        };
    };*/
    var models = jsonobj.models;
    RecreateDynamicTextboxes("EndTextBoxModels",models,"models");
    var loglik = jsonobj.loglik;
    RecreateDynamicTextboxes("EndTextBoxLoglik",loglik,"loglik");
    var processes = jsonobj.processes;
    RecreateDynamicTextboxes("EndTextBoxProcesses",processes,"processes");

};

function reloadparams(){
    return alert("tofix");
};


// == TREE STUFF
//http://bl.ocks.org/spond/30926a292ac4f49e1c6c7d900be65f94

function treedisplay(){
    var height = 1000;
    var width = 800;
    //var hiddenspandatatree = document.getElementById('show2').innerHTML;
    //var jsonobj = JSON.parse(hiddenspandatatree);
    //var treeNewickString = jsonobj.newick;
	
    d3.text(treeNewickString, function(error, newick){
        var tree = d3.layout.phylotree()
            .svg(d3.select("#tree_display"))
            .options({ 
                'left-right-spacing': 'fit-to-size',
                'top-bottom-spacing': 'fit-to-size',
                'selectable': true,
                'zoom':true,
                'right-offset':1, //this fixes the prlm right side, 
                        // but only works in d3version5 and npm
                'left-offset':0,
                'collapsible':false
            }).size([height,width])
            .node_circle_size(2);
        tree(treeNewickString)
            .layout();

        $("#layout").on("click", function(e) {
            tree.radial($(this).prop("checked")).placenodes().update();
            });
        });
    };

window.onload = assignDynTextboxes;

// NOTE: ALL VARIABLES  COME FROM FLASK :
//https://stackoverflow.com/questions/42499535/passing-a-json-object-from-flask-to-javascript


