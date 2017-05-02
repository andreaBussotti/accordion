var nRow = 0;   //counter row element with function expander

function Accordion(options){
  var accordion = document.getElementById("my-accordion");          // Get DOM content to append

  accordion.appendChild(addBoxDiv(options.mainTitle,null));         //  add box Main title

  options.panels.forEach(function(item, index){                     //  cicle for anyuone elements of the panels
    accordion.appendChild(addBoxDiv(item, index));                  //  add box any elements panels
    nRow++;                                                         //increment counter row
  });
};

function addBoxDiv(item, index){                                                          // add new box ROW
  var description = !!item.content;                                                       // defined bulean if element content exsist
  var div = document.createElement("div");                                                //  create element tag
  div.id = "row" + index;                                                                 // defined id attribute
  div.className += "box_row box_border ";

  div.className += !!item.content? "box_desc " : "box_no_desc ";                          // Controll if content exsist

  if (index !== null) {                                                                   // if elements options panels
    // Add arrow expand
    div.appendChild(addExpand("expand_more", index, description));
    div.appendChild(addExpand("expand_less", index, description));

    var classAdding = "";
    if (!!!item.subtitle) classAdding += " item_title_no_desc";
    div.appendChild(addDivElement(item.title, "div", "item_title item_title_closed" + classAdding));      // Add div Title

    if (!!item.subtitle) div.appendChild(addDivElement(item.subtitle, "div", "item_desc "));              // Add div description
    if (!!item.content) div.appendChild(addDivElement(item.content, "div", "item_content unactive "));    // Add Div Content
  } else {                                                                                                // if not elements options panels
    div.appendChild(addDivElement(item, "div", " itemMainTitle"));                                        // Add div Title
  }
  return div;
}

function addExpand(expand, index, description){                             // Add element and function expand
  var tagI = document.createElement("i");                                   // Create element tag
  tagI.className += "material-icons expand";                                // Add class
  tagI.className += description? " expand_desc" : " expand_no_desc";        // Add class if item.content exsist
  tagI.className += (expand === "expand_more")? " active" : " unactive";    // Add class if type expand more/less
  tagI = addOnclickContent(tagI, index, (expand === "expand_more"));        // Call function add onclick function
  tagI.appendChild(document.createTextNode(expand));                        // Append type expand icon
  return tagI;
}

function addDivElement(title, tag, classElem){
  var newTag = document.createElement(tag);           // Create element tag
  newTag.className += classElem;                      // Add class
  newTag.innerHTML = title;                           // Add text
  return newTag;
}

function addOnclickContent(tagI, index, expandMore){   // Add function onClick in expand action
  tagI.onclick = function openedContent(){             // defined function calling
    openCloseRow(expandMore, index);
  };
  return tagI;
}


function openCloseRow(openClose, index){                        // Open/close rows
  var div = document.getElementById("row" + index);             // Create element tag
  var content = div.getElementsByClassName("item_content");     // Get element content by ClassName
  var i = div.getElementsByTagName("i");                        // Get elements expander by tag "i"
  if (openClose) {                                              // Setting case opened
    div.className += " openRow";                                // Add class openedRow row (active)
    if (!!content[0]) content[0].className = content[0].className.replace("unactive","active");     // Show content if element content exsist
    i[0].className = i[0].className.replace("active","unactive");   // hidden expand more
    i[1].className = i[1].className.replace("unactive","active");   // show expand less
    closedOthers(index);
  } else {                                                      // Setting case Closed
    div.classList.remove("openRow");                            // Remove class openedRow to closed row
    if (!!content[0]) content[0].className = content[0].className.replace("active","unactive");     // hidden content if element content exsist
    i[0].className = i[0].className.replace("unactive","active");   // show expand more
    i[1].className = i[1].className.replace("active","unactive");   // hidden expand less
  }
}

function closedOthers(index){                                               // Close the others rows if open
  var div = document.getElementsByClassName("box_row");                     // Get All elements div rows
  for (var j = 0; j < nRow; j++) {
    if (index !== j) {                                                      // if row not opened
      var actualDiv = div[j+1];                                             // Set variable div actual for setting
      var content = actualDiv.getElementsByClassName("item_content");       // Get content by class name in actual div
      var i = actualDiv.getElementsByTagName("i");                          // Get elements expand in actual div
      actualDiv.classList.remove("openRow");                                // Remove class to closed row
      if (!!content[0]) content[0].className = content[0].className.replace(" active"," unactive");   // hidden content if element content exsist
      i[0].className = i[0].className.replace(" unactive"," active");       // show expand more
      i[1].className = i[1].className.replace(" active"," unactive");       // hidden expand less
    }
  }
}
