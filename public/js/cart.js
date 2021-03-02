var row;
var table;
var userId;
var cart;
var container;

    function displayCart(){
        userId = localStorage.getItem("currentUserEmail");
            console.log("current user: ",userId);
        clean();
        console.log("User id: ",userId);
        var request = new XMLHttpRequest();
      var url = 'getCart.action&'+userId;
      request.open("GET", url, false); 

    request.setRequestHeader('Content-type', 'application/json');
    request.send();
    cart = JSON.parse(request.responseText);
    console.log("Cart: ", cart);
    var products = cart.products;
    if(products){
        table = document.getElementById("table");
        container = document.createElement("div");
        container.id = "cont";
        var totalCost = 0;
        for (var i in products) {
            var product = products[i];
            request = new XMLHttpRequest();
            url = 'getProduct.action~'+product;
            request.open("GET", url, false); 
            
            request.setRequestHeader('Content-type', 'application/json');
            //console.log("category list ",);
            request.send();
            var pr = JSON.parse(request.responseText);
            // var table = document.getElementById('table');
            
            row = document.createElement("div");
              row.className = 'row';
              
              var image = document.createElement("div");
              image.className = 'col-md-2 mt-2'
              var imageInput = document.createElement("img");
              imageInput.src="getImage.action-"+pr.id;;
              image.appendChild(imageInput);
              row.appendChild(image);
    
              var name = document.createElement("div");
      name.className = 'col-md-4 px-4 pt-4'
      var nameInput = document.createElement("label");
      nameInput.type = 'text';
      nameInput.className = 'categoryName';
      nameInput.id = i;
      nameInput.innerHTML = pr.name;
      name.appendChild(nameInput);
      row.appendChild(name);

      var price = document.createElement("div");
      price.className = 'col-md-2 px-4 pt-4';
      var priceInput = document.createElement("label");
      priceInput.type = 'text';
      priceInput.className = 'categoryName';
      priceInput.id = i;
      priceInput.innerHTML = "$"+pr.price;
      price.appendChild(priceInput);
      row.appendChild(price);

      var button = document.createElement('div');
      button.className='col-md-1';
      var btn = document.createElement('button');
      btn.className="close";
      btn.innerHTML="x";
     button.onclick=removeItem.bind(pr);
      button.appendChild(btn);
      row.appendChild(button);

      totalCost += parseFloat(pr.price);
    console.log("Row: ", row);
      container.appendChild(row);
    } 
    table.appendChild(container); 
    console.log("Table: ", table);
    if(cart.products.length==0){
      console.log("cart is empty");
      var msg = document.getElementById("cartMessage");
      msg.innerHTML ="Your cart is empty!";
      msg.style.fontSize="25px";
      document.getElementById('cost').style.display="none";
    }else{
    var t = cart.totalCost;
    var sub = t/1.13;
    var hst = sub*0.13 
    document.getElementById('subTotal').innerHTML= sub.toFixed(2);
    document.getElementById('hst').innerHTML = hst.toFixed(2);
    document.getElementById("totalCost").innerHTML = cart.totalCost.toFixed(2);
}
    }
}

function removeItem(){
  var pr=this;
  console.log("cart items -> ",cart);
  console.log("product id -> ",pr.id);
  for(i in cart.products){
    if(cart.products[i]===pr.id){
      cart.products.splice(i,1);
      cart.subTotal -= parseFloat(pr.price);
      cart.hst -= parseFloat(pr.price)*0.13;
      cart.totalCost = (cart.subTotal+cart.hst);
      var post = new XMLHttpRequest();
      var currentUser=localStorage.getItem("currentUserEmail");
    url = 'addCart.action&'+currentUser;
    post.open("POST", url, false);
    post.setRequestHeader('Content-type', 'application/json');
    post.send(JSON.stringify(cart));
    }
  }
  console.log("cart items after del-> ",cart);
  displayCart();

}

function placeOrder() {
    var order = {}
    order.customerName = document.getElementById("name").value;
    order.postalCode = document.getElementById("postalCode").value;
    order.phoneNumber = document.getElementById("phoneNumber").value;
    order.address = document.getElementById("address").value;
    order.status = "ordered";
    order.date= new Date();
    order.details = [];
    userId = localStorage.getItem("currentUserEmail");
    console.log("current user: ",userId);
    var request = new XMLHttpRequest();
    var url = 'getCart.action&'+userId;
    request.open("GET", url, false); 
    request.setRequestHeader('Content-type', 'application/json');
    request.send();
    var cart = JSON.parse(request.responseText);
    order.totalcost=cart.totalCost;
    order.subTotal=cart.subTotal;
    order.hst=cart.hst;
    order.customerEmail = cart.id;
    var products = cart.products;
    if(products){
        for (var i in products) {
            var product = products[i];
            request = new XMLHttpRequest();
            url = 'getProduct.action~'+product;
            request.open("GET", url, false); 
            request.setRequestHeader('Content-type', 'application/json');
            request.send();
            var pr = JSON.parse(request.responseText);
            order.details.push(pr);
        }
    }
    request = new XMLHttpRequest();
    url = 'addOrder.action&' + userId;
    request.open("POST", url, false); 
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(order));
    //delete cart after placing order
    request = new XMLHttpRequest();
    url = 'removeCart.action';
    request.open("POST", url, false); 
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(cart));
    
    window.alert("Order Placed");
    window.location.href="index.html";
}

function clean(){
    if(container){
      var element = document.getElementById("cont");
      element.parentElement.removeChild(element);
    }else{
      return;
    }
  }

