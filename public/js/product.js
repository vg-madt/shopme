var categories;

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
  
function display(CID){
read();
var selectHTML='';

for (var key in categories)
 {
     selectHTML +='<option value="'+key+'">'+categories[key].name+'</option>';
 }
 document.getElementById('selector').innerHTML = selectHTML;
    table = document.getElementById("table");
      
  
      
  
    for (var i = 0; i < products.length; i++) {
  
      var product = products[i];
  
      row = document.createElement("div");
      row.className = 'row';
      var image = document.createElement("div");
      image.className = 'col-sm-1'
      var imageInput = document.createElement("img");
      imageInput.disabled = true;
      imageInput.src='/img/dress1.jpg';
      image.appendChild(imageInput);
      row.appendChild(image);

      var name = document.createElement("div");
      name.className = 'col-sm-4'
      var nameInput = document.createElement("input");
      nameInput.type = 'text';
      nameInput.className = 'categoryName';
      nameInput.id = i;
      nameInput.value = product.name;
      nameInput.disabled = true;
      name.appendChild(nameInput);
      row.appendChild(name);

      var price = document.createElement("div");
      price.className = 'col-sm-1'
      var priceInput = document.createElement("input");
      priceInput.type = 'text';
      priceInput.className = 'categoryName';
      priceInput.id = i;
      priceInput.value = product.price;
      priceInput.disabled = true;
      price.appendChild(priceInput);
      row.appendChild(price);
  
      var edit = document.createElement("div");
      edit.className = 'col-sm-2'
      var editBtn = document.createElement("input");
      editBtn.type = 'button';
      editBtn.className = 'btn btn-dark';
      editBtn.value = 'Edit';
      editBtn.onclick = editCategory();
      edit.appendChild(editBtn);
      row.appendChild(edit);

      var save = document.createElement("div");
    save.className = 'col-sm-2'
    var saveBtn = document.createElement("input");
    saveBtn.type = 'button';
    saveBtn.className = 'btn btn-success';
    saveBtn.value ='Save';
    //saveBtn.onclick = saveCategory();
    save.appendChild(saveBtn);
    row.appendChild(save);
  
      var del = document.createElement("div");
      del.className = 'col-sm-2'
      var delBtn = document.createElement("input");
      delBtn.type = 'button';
      delBtn.value = 'Delete';
      delBtn.className = 'btn btn-danger';
      //delBtn.onclick = delCategory();
      del.appendChild(delBtn);
      row.appendChild(del);
  
      var hrLine = document.createElement('hr');
      hrLine.style.height='20px';
      row.appendChild(hrLine);
      
  
      table.appendChild(row);
  
  }
  
  }
  
  function addNewCategory(){
  
    
  }
    
    function editCategory(){
      console.log("edit clicked");
      //document.getElementById("categoryName").disabled=false;
    }