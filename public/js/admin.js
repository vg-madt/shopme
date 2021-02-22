
var container;
var categories;
function clean(){
  if(container){
    var element = document.getElementById("cont");
    element.remove();
  }
}

function read(){

  var request = new XMLHttpRequest();
    var url = 'getCategory.action';
    request.open("GET", url, false);

    request.setRequestHeader('Content-type', 'application/json');
    //console.log("category list ",);
    request.send();
    categories = JSON.parse(request.responseText);
    console.log("my categories ",categories);
}

function displayAllCategory(){
  clean();
  read();
  var table = document.getElementById("table");    
  container = document.createElement("div");
  container.id = 'cont';
  for (i in categories) {
    
    var category = categories[i];
    var row = document.createElement("div");
    row.className = 'row';
    var name = document.createElement("div");
    name.className = 'col-sm-6'
    var nameInput = document.createElement("input");
    nameInput.type = 'text';
    nameInput.className = 'categoryName';
    nameInput.id = category.name;
    //currentElement = nameInput.id;
    nameInput.value = category.name;
    nameInput.disabled = true;
    name.appendChild(nameInput);
    row.appendChild(name);

    var edit = document.createElement("div");
    edit.className = 'col-sm-2'
    var editBtn = document.createElement("input");
    editBtn.type = 'button';
    editBtn.id = 'edit'+category.name;
    editBtn.className = 'btn btn-dark';
    editBtn.value = 'Edit';
    let editFunction = editCategory.bind(category);
    editBtn.addEventListener('click', editFunction);

    console.log("Button ID ",editBtn.id);
    
    edit.appendChild(editBtn);
    row.appendChild(edit);

    var save = document.createElement("div");
    save.className = 'col-sm-2'
    var saveBtn = document.createElement("input");
    saveBtn.type = 'button';
    saveBtn.className = 'btn btn-success';
    saveBtn.value ='Save';
    console.log("Category:  ", category);
    saveBtn.addEventListener('click',saveCategory.bind(category));
    //saveBtn.onclick = saveCategory();
    save.appendChild(saveBtn);
    row.appendChild(save);

    var del = document.createElement("div");
    del.className = 'col-sm-2'
    var delBtn = document.createElement("input");
    delBtn.type = 'button';
    delBtn.value = 'Delete';
    delBtn.addEventListener('click',removeCategory.bind(category));
    delBtn.className = 'btn btn-danger';
    //delBtn.onclick = delCategory();
    del.appendChild(delBtn);
    row.appendChild(del);

    var hrLine = document.createElement('hr');
    hrLine.style.height='20px';
    row.appendChild(hrLine);
    

    container.appendChild(row);

}
table.appendChild(container);

}

function addNewCategory(){

  var c = prompt("Please enter the new category");

if (c != null) {

  var request = new XMLHttpRequest();
    var url = 'addNewCategory.action';
    request.open("POST", url, false);

    var category = {};
    category.name = c;

    request.setRequestHeader('Content-type', 'application/json');
    console.log("category details ",category);
    request.send(JSON.stringify(category));
    displayAllCategory();

}
  
}
  
  function editCategory(){
    console.log("my id for the edit ",this.name);
    //console.log("edit clicked");
    document.getElementById(this.name).disabled=false;
  }
  function saveCategory(){
    var c = document.getElementById(this.name).value;
    var cat = this;
    cat.name = c;

  var request = new XMLHttpRequest();

    var url = 'saveCategory.action';
    request.open("POST", url, false);

    request.setRequestHeader('Content-type', 'application/json');
    console.log("category details ",cat);
    request.send(JSON.stringify(cat));
    displayAllCategory();
  }
  function removeCategory(){
    var c = document.getElementById(this.name).value;
    var cat = this;

  var request = new XMLHttpRequest();

    var url = 'removeCategory.action';
    request.open("POST", url, false);

    request.setRequestHeader('Content-type', 'application/json');
    console.log("category details ",cat);
    request.send(JSON.stringify(cat));
    displayAllCategory();
  }