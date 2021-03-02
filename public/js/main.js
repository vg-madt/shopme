//var user="Guest";
var products;
var row;
var totalCost;
        var subTotal;
        var hst;
var currentUser;

function loadAll(){
    populateCategory();
    getProducts();
    currentUser = localStorage.getItem("currentUserEmail");
            console.log("current user: ",currentUser);
            
    if(currentUser){
        if(currentUser === "admin"){
            document.getElementById('admin').style.visibility="visible";
        }
        console.log("current user is logged in");
        document.getElementById('currentUser').innerHTML = currentUser;
        var request = new XMLHttpRequest();
    var url = 'getCart.action&'+currentUser;
    request.open("GET", url, false); 
    request.setRequestHeader('Content-type', 'application/json');
    request.send();
    var cart = JSON.parse(request.responseText);
    console.log("cart value ->" ,cart);
    if(cart.products.length != 0){
    document.getElementById('cartValue').innerHTML=cart.totalCost.toFixed(2);
    }    
}else if(!currentUser){
        console.log("current user is not logged in");
        document.getElementById('currentUser').innerHTML = "Guest";
        var first = document.getElementById('first');
        first.innerHTML = "Login";
        first.href = "login.html";
        var second = document.getElementById('second');
        second.innerHTML="Register";
        second.href="register.html";
        var third = document.getElementById('third');
        third.innerHTML="View Cart";
        third.href = "view-cart.html";
    }
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
      
}

function getProducts(){
    clean();
    var category = this;
    var request = new XMLHttpRequest();
    var url = 'getProduct.action='+category.id;
    request.open("GET", url, false); 

    request.setRequestHeader('Content-type', 'application/json');
    //console.log("category list ",);
    request.send();
    products = JSON.parse(request.responseText);
    var table = document.getElementById('table');
    row = document.createElement('div');
    row.className = 'row';
    row.id = 'row';
    for(key in products){
        var product=products[key];
        console.log("Key: ", key, "; Product: ", product);
        var col = document.createElement('div');
        col.className = "col-md-4";
        var productContainer = document.createElement('div');
        productContainer.className = "product";
        productContainer.style.marginLeft="40px";
        var image = document.createElement('img');
        image.class="img-responsive mb-4";
        image.style.alignItems="center";
        image.src = "getImage.action-"+product.id;
        image.style.marginLeft="140px";
        image.style.objectFit="cover";
        image.style.height="160px";
        var src = getImage.bind(product);
        var col2 = document.createElement('div');
        col2.class="productName";
        col2.style.textAlign = "center";
        col2.innerHTML=product.name;
        var priceDiv = document.createElement('div');
        priceDiv.className = "col-md-10 ml-4";
        priceDiv.style.textAlign="center";
        var price = document.createElement('span');
        price.className="price p-3 mt-2";
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
    //console.log("custoner details ",customer);
    request.send(JSON.stringify(customer));
    //console.log("before my alert");
    alert("Successfully Registered");
    window.location.href = "login.html";

    }
}

function addToCart() {
    var product = this;
    var get = new XMLHttpRequest();
    var currentUser = localStorage.getItem("currentUserEmail");
    console.log("Current user adding to the cart: ",currentUser);
    var url = 'getCart.action&'+currentUser;
    console.log("Cart url: ", url);
    get.open("GET", url, false);
    get.send();
    var cart = JSON.parse(get.responseText);
    if (cart === undefined) {
        cart = {};
        cart.products = [];
    }else if(cart.products.length===0){
        totalCost=0;
        subTotal=0;
        hst=0;

    }else if(cart.products.length>0){
        totalCost=cart.totalCost;
        subTotal=cart.subTotal;
        hst=cart.hst;
    }
    console.log("Cart:  ", cart);
    var post = new XMLHttpRequest();
    url = 'addCart.action&'+currentUser;
    post.open("POST", url, false);
    post.setRequestHeader('Content-type', 'application/json');
    console.log("product details ",product);
    cart.products.push(product.id);
    subTotal += parseFloat(product.price);
    console.log("subtotal: ",subTotal);
    cart.subTotal = subTotal;
    hst += parseFloat(product.price)*0.13;
    cart.hst = hst;
    totalCost=(subTotal+hst);
    console.log("hst -> ",hst);
    //console.log("subtotal -> ",subTotal);
    console.log("total cost -> ",totalCost);
    //var cost = totalCost+(totalCost*0.13);
    cart.totalCost = totalCost;
    document.getElementById('cartValue').innerHTML=totalCost.toFixed(2);
    post.send(JSON.stringify(cart));
    //setTimeout(function(){ alert("Added to Cart"); }, 3000);
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

function clearUser(){
    localStorage.removeItem("currentUserEmail");
    document.getElementById('currentUser').innerHTML='Guest';
    window.location.href="index.html";
}

function clean(){
    if(row){
      var element = document.getElementById("row");
      element.remove();
    }
  }

  function searchProduct(){
      var value = document.getElementById('search').value;
      var request = new XMLHttpRequest();
    var url = 'getProduct.action*'+value;
    request.open("GET", url, false);

    request.setRequestHeader('Content-type', 'application/json');
    request.send();
    clean();
    var products = JSON.parse(request.responseText);
    var table = document.getElementById('table');
    row = document.createElement('div');
    row.className = 'row';
    row.id = 'row';
    for(key in products){
        var product=products[key];
        console.log("Key: ", key, "; Product: ", product);
        var col = document.createElement('div');
        col.className = "col-md-4";
        var productContainer = document.createElement('div');
        productContainer.className = "product";
        productContainer.style.marginLeft="40px";
        var image = document.createElement('img');
        image.class="img-responsive mb-4";
        image.style.alignItems="center";
        image.src = "getImage.action-"+product.id;
        image.style.marginLeft="140px";
        image.style.objectFit="cover";
        image.style.height="160px";
        var src = getImage.bind(product);
        var col2 = document.createElement('div');
        col2.class="productName";
        col2.style.textAlign = "center";
        col2.innerHTML=product.name;
        var priceDiv = document.createElement('div');
        priceDiv.className = "col-md-10 ml-4";
        priceDiv.style.textAlign="center";
        var price = document.createElement('span');
        price.className="price p-3 mt-2";
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