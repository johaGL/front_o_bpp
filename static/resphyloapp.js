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
            j = i+1;
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
    var jsonobj = JSON.parse(DATASTR); //very importants
    RecreateDynamicTextboxes("EndTextBoxPhylos",jsonobj.phylos,"phylos");
    RecreateDynamicTextboxes("EndTextBoxModels",jsonobj.models,"models");
    RecreateDynamicTextboxes("EndTextBoxLoglik",jsonobj.loglik,"loglik");
    RecreateDynamicTextboxes("EndTextBoxProcesses",jsonobj.processes,"processes");
    RecreateDynamicTextboxes("EndTextBoxRoots",jsonobj.roots,"roots");
    
};

function clearandreloadparams(){
    $('#parameters').val('');
};

// == TREE STUFF
//http://bl.ocks.org/spond/30926a292ac4f49e1c6c7d900be65f94

function treedisplay(){
    var height = 500;
    var width = 200;
    var TEST = document.getElementById('TEST').innerHTML;
    d3.text(TEST, function(error, newick){
        var tree = d3.layout.phylotree().svg(d3.select("#tree_display"));
        let branchColoring = d3.interpolateRgb("#0000FF","#FF0000"); // a color scheme for p-values

      tree(TEST).traverse_and_compute ((node,datum)=>{
             if (node.annotation) { 
                let attribute_dict = {};
                node.annotation.split (":").forEach ((d)=>{
                    let tag_value = d.split ("=");
                    if (tag_value.length == 2) {
                        attribute_dict[tag_value[0]] = tag_value[1];
                    }
                });
                node['nhx_attr'] = attribute_dict;
             }
         }).style_edges((element, edge)=>{
         
            if (edge.target['nhx_attr']) { 
                let tags = [];    
                for (k in edge.target['nhx_attr']) {
                    tags.push ("<b>" + k + "</b> : " + edge.target['nhx_attr'][k]);
                }       
                $(d3.select(element).node()[0]).popover ({
                    'container': 'body',
                    'html' : true,
                    'placement' : "left",
                    'content' : tags.join ("<br>"),
                    'trigger' : 'hover'
                });
            }
         })
        .layout();
        }); 
    };

window.onload = assignDynTextboxes;

// NOTE: ALL VARIABLES  COME FROM FLASK :
//https://stackoverflow.com/questions/42499535/passing-a-json-object-from-flask-to-javascript


