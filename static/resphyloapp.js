 /*
 This javascript needs tag:
 <span hidden id="show2">{{data}}</span>
 existing in results.html
*/
function setcheckboxesstatus(){
    var inputs = document.getElementsByTagName("input");
    for(var i=0; i<inputs.length; i++){
    if(inputs[i].getAttribute('type')=='checkbox'){
        input[i].checked = false; //this sets all checkboxes as unchecked
    };
}};

function deduplicatestring(dubiousstr){
	var fullspan = dubiousstr.length;
    if ( fullspan % 2 === 0){ 
        var m = fullspan/2;
        var str1 = dubiousstr.slice(0,m);
        var str2 = dubiousstr.slice(m,fullspan);
        if (str1 === str2){
            return str1;
        } else { return dubiousstr;
        }		
    }else{
        return dubiousstr;
    }
};

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


function my_menu_title(node){
    return "Copy Subtree as Newick";
};


//this function contains tree(TEST).[...] which controls attr/actions
//function treedisplay(height,width) ===> TODO:  must be done !!!
function treedisplay(){
    var height = 700;
    var width = 500;
    var TEST = document.getElementById('TEST').innerHTML;
    d3.text(TEST, function(error, newick){
        var tree = d3.layout.phylotree()
            .svg(d3.select("#tree_display"))
            .options({
                'zoom' : true
            })
            .size([height,width]);

        tree(TEST).layout();

        $("#layout").on("click", function(e) {
            tree.radial($(this).prop("checked")).placenodes().update();
            });//end tree(TEST) main function containing attributes and actions
        
        function fix(subtreenewick){
            let newstr = subtreenewick
            tree.get_nodes()
                .filter((l)=>d3.layout.phylotree.is_leafnode(l))
                .forEach(function(leaf){
                    //deduplucate at all possible levels ! 
                    let tmp = leaf.name; //at the level of get_nodes()
                    leaf.name = deduplicatestring(tmp);
                    //at the level of newick format
                    let res = newstr.replace(tmp+tmp, leaf.name);
                    newstr = res;
                });
            return newstr;
        };
      
        tree.get_nodes()
        .filter((n)=> !d3.layout.phylotree.is_leafnode (n))
            .forEach(function(tree_node){
                d3.layout.phylotree.add_custom_menu(tree_node, my_menu_title,
                function()  {
                        let save_root = tree.get_nodes()[0];
                        tree.get_nodes()[0] = tree_node;
                        let newicksubtree = tree.get_newick();
                        d3.select("#newick_holder").text(fix(newicksubtree));
                        tree.get_nodes()[0] = save_root;
                    }
                    ,(n)=>!d3.layout.phylotree.is_leafnode (n)
            );//end addcustom menu
        });//end select subtree 
        });//end d3.text 
    };

   
window.onload = assignDynTextboxes,setcheckboxesstatus;
