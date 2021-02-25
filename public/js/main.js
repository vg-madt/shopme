//var user="Guest";
var products;

function loadAll(){
    populateCategory();
}
function populateCategory(){
    var request = new XMLHttpRequest();
      var url = 'getCategory.action';
      request.open("GET", url, false);
  
      request.setRequestHeader('Content-type', 'application/json');
      //console.log("category list ",);
      request.send();
      categories = JSON.parse(request.responseText);
      console.log("my categories ",categories);
      var ul=document.getElementById('categoryList');
      for(key in categories){
          console.log("category name: ",categories[key].name);
          var category = categories[key];
        var listItem = document.createElement('li');
        listItem.className='nav-item';
        var anchor = document.createElement('a');
        anchor.onclick = getProducts.bind(category);
        anchor.className='nav-link';
        var span = document.createElement('span');
        span.innerHTML=category.name;
        anchor.appendChild(span);
        listItem.appendChild(anchor);
        ul.appendChild(listItem);

      }
      var currentUser = localStorage.getItem("currentUserEmail");
            console.log("current user: ",currentUser);
            document.getElementById('currentUser').innerHTML = currentUser;
}

function getProducts(){
    var category = this;
    var request = new XMLHttpRequest();
    var url = 'getProduct.action='+category.id;
    request.open("GET", url, false); 

    request.setRequestHeader('Content-type', 'application/json');
    //console.log("category list ",);
    request.send();
    products = JSON.parse(request.responseText);
    var table = document.getElementById('table');
    var row = document.getElementById('row');
    for(key in products){
        var product=products[key];
        var col = document.createElement('div');
        col.className = "col-md-4";
        var productContainer = document.createElement('div');
        productContainer.className = "product ml-4";
        var image = document.createElement('img');
        image.class="img-responsive";
        var src = getImage.bind(product);
        var col2 = document.createElement('div');
        col2.class="productName";
        col2.style.align = "center";
        col2.innerHTML=product.name;
        var priceDiv = document.createElement('div');
        priceDiv.className = "col-md-10 ml-4";
        priceDiv.style.align="center";
        var price = document.createElement('span');
        price.className="price";
        price.innerHTML="$ "+product.price;
        priceDiv.appendChild(price);
        var button = document.createElement('button');
        button.className="btn btn-primary ml-8";
        var icon = document.createElement('i');
        icon.className="fa fa-shopping-cart";
        button.innerHTML="Add";
        button.onclick=addToCart.bind(product);
        button.appendChild(icon);
        priceDiv.appendChild(button);
        productContainer.appendChild(image);
        productContainer.appendChild(col2);
        productContainer.appendChild(priceDiv);
        col.appendChild(productContainer);
        row.appendChild(col);
    }   
    table.appendChild(row); 
}

function getImage(){
    var product = this;
    var request = new XMLHttpRequest();
    var url = 'getImage.action?'+product.id;
    request.open("GET", url, false);

    request.setRequestHeader('Content-type', 'application/json');
    request.send();
    var image = request.responseText();

}
function register(){
    
    console.log("registering user")
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;
    if(!checkPassword(password1,password2)){
        alert("Passwords do not match!");
        var pwd1 = document.getElementById("password1");
        pwd1.style.borderColor = "red";
        pwd1.value="";
        var pwd2 = document.getElementById("password2");
        pwd2.style.borderColor = "red";
        pwd2.value="";
        

    }else if(password1===""|| password2==="") {
        alert("Password fields empty");
        var pwd1 = document.getElementById("password1");
        pwd1.style.borderColor = "red";
        pwd1.value="";
        var pwd2 = document.getElementById("password2");
        pwd2.style.borderColor = "red";
        pwd2.value="";


    }else{   

    var request = new XMLHttpRequest();
    var url = 'register.action';
    request.open("POST", url, false);

    var customer = {};
    customer.name = name;
    customer.email = email;
    customer.password = password1;

    request.setRequestHeader('Content-type', 'application/json');
    console.log("custoner details ",customer);
    request.send(JSON.stringify(customer));
    console.log("before my alert");
    alert("Successfully Registered");
    window.location.href = "login.html";

    }
}

function checkPassword(password1,password2){
    if(password1 === password2){
        return true;
    }
}

function login(){

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if(email===""||password===""){
        alert("Please enter details");
    }
    else{ 
        var request = new XMLHttpRequest();
    var url = 'login.action';
    request.open("POST", url, false);

    var customer = {};
    customer.email = email;
    customer.password = password;

    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(customer));
    var currentUser = request.responseText;
    console.log("current user ",currentUser);
    if(currentUser){
        user = JSON.parse(currentUser);
        console.log("current user name ",user.name);
        localStorage.setItem("currentUserId",user.id);
            localStorage.setItem("currentUserName",user.name);
            localStorage.setItem("currentUserEmail",user.email);
        if(user.name==="admin"){
            console.log("current user in index" ,user.name);
            
            console.log("current user before: ",user.email);
            window.location.href = "admin.html";
        }else{
           // console.log("current user in index" ,user);
            window.location.href = "index.html";
            
        }
    
    //document.getElementById("currentUser").innerHTML=currentUser.name;
    //console.log("current user in index" ,currentUser.name);
    }else{
        alert("Incorrect login details");
    }
    }
}

function getCurrentUser(){
    document.getElementById("currentUser").innerHTML=user;
}

function clearUser(){
    localStorage.setItem("currentUserEmail","Guest");

    window.location.href="index.html";
}