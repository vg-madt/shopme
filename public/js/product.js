//const { request } = require("http");

var categories;
var chosenCategoryId;
var container;
var image;


  function read(){

    var request = new XMLHttpRequest();
      var url = 'getCategory.action';
      request.open("GET", url, false);
  
      request.setRequestHeader('Content-type', 'application/json');
      //console.log("category list ",);
      request.send();
      categories = JSON.parse(request.responseText);
      //console.log("my categories ",categories);
  }

  function displaySelect(){
    read();
    var currentProductId = localStorage.getItem("currentProductId");
    if(currentProductId){
      request = new XMLHttpRequest();
        url = 'editProduct.action?'+currentProductId;
        request.open("POST", url, false);

        request.setRequestHeader('Content-type', 'text/plain');
        //console.log("category details ",category);
        request.send();
        var product = JSON.parse(request.responseText);
        if(product){
          console.log("Product for edit: ",product);
          document.getElementById("name").value = product.name;
          document.getElementById("price").value=product.price;
          var s = document.getElementById('selector');
          var result = s.options[s.selectedIndex];
          console.log("option in selector: ",result);
          
        }
    }
    
    var selectHTML='';
var count = 0;
var selector = document.getElementById('selector');
let selectedId = key;
let selected;
for (var key in categories)
 {
   var category = categories[key];
   //var option = document.createElement('option');
   if (count == 0) {
     chosenCategoryId = key;
     selected = 'selected="selected"';
   } else {
     selected = '';
   }
   count++;
     selectHTML +='<option '+ selected +' value="'+key+'">'+categories[key].name+'</option>';
     selector.innerHTML = selectHTML;
     //console.log("my category: ",category);
     //console.log('<option selected = "'+ count === 0 ?+' selected"':+''+'" value="'+key+'">'+categories[key].name+'</option>');
     //console.log('<option '+ (count == 0 ? ' selected = "selected"':' ')+' value="'+key+'">'+categories[key].name+'</option>');
     count++;
     
 }

  //console.log("selectHTML: ",selectHTML);
 
  selector.addEventListener('change', (event) => {
  chosenCategoryId = event.target.value;
  //console.log("chosen ID: ",chosenCategoryId);

  
 });
}
  
function display(){
read();
var selectHTML='';
var count = 0;
var selector = document.getElementById('selector');
let selectedId;
let selected;
for (var key in categories)
 {
   var category = categories[key];
   //var option = document.createElement('option');
   if (count == 0) {
     selectedId = key;
     selected = 'selected="selected"';
   } else {
     selected = '';
   }
   displayProducts(selectedId);
   count++;
     selectHTML +='<option '+ selected +' value="'+key+'">'+categories[key].name+'</option>';
     selector.innerHTML = selectHTML;
     console.log("my category: ",category);
     console.log('<option selected = "'+ count === 0 ?+' selected"':+''+'" value="'+key+'">'+categories[key].name+'</option>');
     console.log('<option '+ (count == 0 ? ' selected = "selected"':' ')+' value="'+key+'">'+categories[key].name+'</option>');
     count++;
     
 }

  console.log("selectHTML: ",selectHTML);
 
  selector.addEventListener('change', (event) => {
  chosenCategoryId = event.target.value;
  console.log("chosen ID: ",chosenCategoryId);
  displayProducts(chosenCategoryId);
  
 });
  
  }


    function displayProducts(chosenCategoryId){
      clean();
      console.log("Category id: ",chosenCategoryId);
      var request = new XMLHttpRequest();
    var url = 'getProduct.action='+chosenCategoryId;
    request.open("GET", url, false); 

    request.setRequestHeader('Content-type', 'application/json');
    //console.log("category list ",);
    request.send();
    var products = JSON.parse(request.responseText);
     // console.log("request obtained: ",categories);
      if(products){
      table = document.getElementById("table");
      
      container = document.createElement("div");
      container.id = "cont";
      for (var i in products) {
  
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
      name.className = 'col-sm-5'
      var nameInput = document.createElement("input");
      nameInput.type = 'text';
      nameInput.className = 'categoryName';
      nameInput.id = i;
      nameInput.value = product.name;
      nameInput.disabled = true;
      name.appendChild(nameInput);
      row.appendChild(name);

      var price = document.createElement("div");
      price.className = 'col-sm-2'
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
    editBtn.id = 'edit'+product.name;
    editBtn.className = 'btn btn-dark';
    editBtn.value = 'Edit';
    let editFunction = editProduct.bind(product);
    editBtn.addEventListener('click', editFunction);

    console.log("Button ID ",editBtn.id);
    
    edit.appendChild(editBtn);
    row.appendChild(edit);

    var del = document.createElement("div");
    del.className = 'col-sm-2'
    var delBtn = document.createElement("input");
    delBtn.type = 'button';
    delBtn.value = 'Delete';
    delBtn.addEventListener('click',removeProduct.bind(product));
    delBtn.className = 'btn btn-danger';
    del.appendChild(delBtn);
    row.appendChild(del);

    var hrLine = document.createElement('hr');
    hrLine.style.height='20px';
    row.appendChild(hrLine);
    

    container.appendChild(row);
    //table.appendChild(container);
    
  }
  table.appendChild(container);
  
    }
  }

    function addNewProduct(){
      window.location.href ="add-product.html";
    
    }
      
      function editProduct(){
        console.log("edit clicked");
        localStorage.setItem("currentProductId",this.id);
        window.location.href="add-product.html";
        //document.getElementById("categoryName").disabled=false;
      }
      function saveProduct(){
        var currentProductId = localStorage.getItem("currentProductId");
        var name = document.getElementById('name').value;
        var price = document.getElementById('price').value;
        var cId = chosenCategoryId;
        var image = getFile();
        var request;
        //console.log("image data before sending: ",image);
        if(currentProductId){
        request = new XMLHttpRequest();
        var url = 'saveProduct.action';
        request.open("POST", url, false);

        var product = {};
        //category.name = c;
        product.name = name;
        product.price = price;
        product.cId = chosenCategoryId;
        product.id = currentProductId;

        request.setRequestHeader('Content-type', 'application/json');
        console.log("product details ",product);
        request.send(JSON.stringify(product));
        }else{
        request = new XMLHttpRequest();
        var url = 'addProduct.action';
        request.open("POST", url, false);

        var product = {};
        //category.name = c;
        product.name = name;
        product.price = price;
        product.cId = chosenCategoryId;

        request.setRequestHeader('Content-type', 'application/json');
        console.log("product details ",product);
        request.send(JSON.stringify(product));
      }


        var p = JSON.parse(request.responseText);
        var pId = p.id;
        console.log("Product id in response: ",pId);

        request = new XMLHttpRequest();
        url = 'addImage.action?'+pId;
        request.open("POST", url, false);

        request.setRequestHeader('Content-type', 'text/plain');
        //console.log("category details ",category);
        request.send(image);
        localStorage.removeItem("currentProductId");
        
      }


      function removeProduct(){
        //var c = document.getElementById(this.name).value;
    var prod = this;

  var request = new XMLHttpRequest();

    var url = 'removeProduct.action';
    request.open("POST", url, false);

    request.setRequestHeader('Content-type', 'application/json');
    //console.log("category details ",cat);
    request.send(JSON.stringify(prod));
    display();
      }

      function clean(){
        if(container){
          var element = document.getElementById("cont");
          element.remove();
        }else{
          return;
        }
      }

      function getFile(){
        var input = document.getElementById('fileToUpload').files[0];
      const reader = new FileReader();
      reader.addEventListener("load", function () {
      //preview.src = reader.result;
      console.log("image src: ",reader.result);
      image =  reader.result;
      
      }, false);
      if (input) {
        reader.readAsBinaryString(input);
        console.log("my image: ",image);   
        return image;
      }
      
      }