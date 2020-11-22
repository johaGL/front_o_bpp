 /*
 This javascript needs tag:
 <span hidden id="show2">{{data}}</span>
 existing in results.html
*/
// ALL VARIABLES  COME FROM FLASK :
//https://stackoverflow.com/questions/42499535/passing-a-json-object-from-flask-to-javascript

// ===== show in textarea the output parameters:

function paramsResults(){
    var DATASTR = document.getElementById('DATA').innerHTML;
    var jsonobj = JSON.parse(DATASTR); //very important
    var paramsString = jsonobj.models.momo;
    var display = document.createElement("TEXTAREA"); // https://www.w3schools.com/js/js_htmldom_nodes.asp
    display.setAttribute("id","pulledparameters");

    var t = document.createTextNode(paramsString); 
    display.appendChild(t);
    document.body.appendChild(display);
    var papa = document.getElementById("childElement");
    var parentDiv = papa.parentNode;
    parentDiv.insertBefore(display, papa); //insertAfter does not exist
    //adding another textarea
    
    var concatvars = " % ";
    //note: parameters nested lists (li) are known containing only two values
    for (let prop in jsonobj.models){
        concatvars = concatvars + prop + "-%-";
        for (let li in jsonobj.models[prop]){
            tmp = jsonobj.models[prop][li][0] +"::"+ jsonobj.models[prop][li][1];
            concatvars = concatvars +  "__" + tmp;
        }TextBoxContainer
    }
    var display2 = document.createElement("TEXTAREA"); 
    display2.setAttribute("id","pulledparameters");
    var t = document.createTextNode(concatvars); 
    display2.appendChild(t);
    document.body.appendChild(display2);
    var papa2 = document.getElementById("childElementk");
    var parentDiv2 = papa2.parentNode;
    parentDiv2.insertBefore(display2, papa2);
};

function RecreateDynamicTextboxes(){
    var values = "abcdef";
    for (var i=0;i<values.length;i++) {
        var parent = "";
        if (i == 0 ){
            parent = "EndTextBoxContainer";
        }
        else{
            parent = i-1;
        }
        tmp = values[i];
        var display = document.createElement("TEXTAREA");
        var label = document.createElement("label");
        display.setAttribute("id",i);
        label.setAttribute("id",i);
        var t = document.createTextNode(tmp+i);
        var l = document.createTextNode(tmp+i);
        display.appendChild(t);
        label.appendChild(l);
        var papa = document.getElementById(parent);
        var parentDiv = papa.parentNode;
        parentDiv.insertBefore(display,papa);
        var papabox = document.getElementById(i);
        var parentDivbox = papabox.parentNode;
        parentDivbox.insertBefore(label,papabox);
        //parentDivbox.insertBefore(label,papabox);
    };
    
}; 

//function GetDynamicTextBox(){
  //  var value = "experience";
    //return '<input name = "DynamicTextBox" label="PPPPP" type="text" value = "' + value + '" />' ;
//
//};

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

window.onload = paramsResults(), RecreateDynamicTextboxes();


