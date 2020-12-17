 /*
 This javascript needs tag:
 <span hidden id="show2">{{data}}</span>
 existing in results.html
*/
function setcheckboxesstatus(){
    var inputs = document.getElementsByTagName("input");
    for(var i=0; i<inputs.length; i++){
    if(inputs[i].getAttribute('type')==='checkbox'){
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
        if (i === (alist.length)-1 ){
            parent = refparent;
        }
        else{
            j = i+1;
            parent = categ+j;
        }
        var display = document.createElement("TEXTAREA");
        var label = document.createElement("label");
        display.setAttribute("id", categ+i);
        display.style.height = "30px";
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
        console.log("whaaaaaat")
    };  
}; 


function RecreateDynamicTextboxesB(container,alist,categ){
    for (var i=0; i<alist.length; i++) {
        tmp = alist[i];
        parent = tmp[0];
        var display = document.createElement("TEXTAREA");
        var label = document.createElement("label");
        display.setAttribute("id", parent+categ);
        //display.style.height = "30px";
        label.setAttribute("id",parent+categ);
        var t = document.createTextNode(tmp[1]); //value
        var l = document.createTextNode(parent+":");
        display.appendChild(t);
        label.appendChild(l);
        $(display).appendTo(container);
        var papabox = document.getElementById(parent+categ);
        var parentDivbox = papabox.parentNode;
        parentDivbox.insertBefore(label,papabox);
    };  
}; 

function assignDynTextboxes(values,categ){
    var DATASTR = document.getElementById('DATA').innerHTML;
    var jsonobj = JSON.parse(DATASTR); //very important
    RecreateDynamicTextboxesB("#LOGLIK",jsonobj.loglik,"loglik");
    RecreateDynamicTextboxesB("#PHYLOS",jsonobj.phylos,"phylos");
    //add model subsections in accordion style:
    let k = 0;
    for (var key in jsonobj.models){
        let tmpstr = '<input type="radio" id="'+"M"+k+'" checked aria-hidden="true" name="accordion">';
        $(tmpstr).appendTo("#MODELS");
        let tmpstrb = '<label for="'+"M"+k+'" aria-hidden="true">'+key+'</label>';
        $(tmpstrb).appendTo("#MODELS");
        let mystr = '<div id='+key+'></div>';
        //then add all parameters belonging i model 
        $(mystr).appendTo("#MODELS");
        RecreateDynamicTextboxesB("#"+key,jsonobj.models[key],"models");
        k++;
    };
    let j = 0;
    for (var key in jsonobj.processes){;
        let tmpstr = '<input type="radio" id="'+"P"+j+'" checked aria-hidden="true" name="accordion">';
        $(tmpstr).appendTo("#PROCESSES");
        let tmpstrb = '<label for="'+"P"+j+'" aria-hidden="true">'+key+'</label>';
        $(tmpstrb).appendTo("#PROCESSES");
        let mystr = '<div id='+key+'></div>';
        $(mystr).appendTo("#PROCESSES");
        RecreateDynamicTextboxesB("#"+key,jsonobj.processes[key],"models");
        j++;
    }
    //RecreateDynamicTextboxesB("#PROCESSES",jsonobj.processes,"processes");
    RecreateDynamicTextboxesB("#ROOTS",jsonobj.roots,"roots");
};

function clearandreloadparams(){
    $('#parameters').val('');
};


// == TREE STUFF
//http://bl.ocks.org/spond/30926a292ac4f49e1c6c7d900be65f94
function onlyshowbuttons(){
    var THETREES = document.getElementById("THETREES").innerHTML;
    var jstrees = JSON.parse(THETREES)
    for (let i=0;i<jstrees.trees.length;i++){
        newButton = document.createElement('input');
        newButton.type = 'button';
        newButton.value = jstrees.trees[i][0];
        newButton.id = jstrees.trees[i][0];
        $(newButton).appendTo("#treebuttonscontainer");
    }
};

function treebuttons(){
    var THETREES = document.getElementById("THETREES").innerHTML;
    var jstrees = JSON.parse(THETREES)
    //buttonContainer = document.getElementById("treebuttonscontainer");
    //is an array of tuples ['filename', ASTRING_IN_NEWICK ]
    for (let i=0;i<jstrees.trees.length;i++){
        newButton = document.createElement('input');
        newButton.type = 'button';
        newButton.value = jstrees.trees[i][0];
        newButton.id = jstrees.trees[i][0];
        newButton.onclick = function () {
            //alert('very easy here to make function to display tree !!!! You pressed '+this.id);
            treedisplay(jstrees.trees[i][1]);//the second elem of the tuple is tree
          };
        //buttonContainer.appendChild(newButton);
        $(newButton).appendTo("#treebuttonscontainer");
    }
}

function my_menu_title(node){
    return "Copy Subtree as Newick";
};
//this function contains tree(ATREE).[...] which controls attr/actions
//function treedisplay(height,width) ===> TODO:  must be done !!!
function treedisplay(ATREE){
    var height = 700;
    var width = 500;
    //var ATREE = document.getElementById('ATREE').innerHTML;
    d3.text(ATREE, function(error, newick){
        var tree = d3.layout.phylotree()
            .svg(d3.select("#tree_display"))
            .options({
                'zoom' : true
            })
            .size([height,width]);

        tree(ATREE).layout();

        $("#layout").on("click", function(e) {
            tree.radial($(this).prop("checked")).placenodes().update();
            });//end tree(ATREE) main function containing attributes and actions
        
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

   
window.onload = assignDynTextboxes, onlyshowbuttons, treebuttons, setcheckboxesstatus;
