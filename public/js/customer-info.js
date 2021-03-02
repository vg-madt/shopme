var orders;
var container;
var currentOrder;
var customers;
var customer;
var customerOrders;



function read(){

    var request = new XMLHttpRequest();
    var url = 'getCustomer.action';
    request.open("GET", url, false);

    request.setRequestHeader('Content-type', 'application/json');
    //console.log("category list ",);
    request.send();
    customers = JSON.parse(request.responseText);
    displayCustomer(customers);
    //console.log("my orders ",customers);
  }

  function clean(){
    if(container){
      var element = document.getElementById("cont");
      element.remove();
    }else{
      return;
    }
  }


  function displayCustomer(customers){
    //read();
    clean();
    table = document.getElementById("table");
    
    container = document.createElement("div");
    container.id = "cont";
    for (var i in customers) {
    //customer = customers[i];
    //console.log("cutomer info -> ",customer.name);

    row = document.createElement("div");
    row.className = 'row';

    var customer = document.createElement("div");
    customer.className = 'col-sm-4' 
    var customerInput = document.createElement("input");
    customerInput.type = 'text';
    customerInput.className = 'categoryName';
    //customerInput.id = customer.id;
    customerInput.value = customers[i].name;
    customerInput.disabled = true;
    customer.appendChild(customerInput);
    row.appendChild(customer);

    var email = document.createElement("div");
    email.className = 'col-sm-6'
    var emailInput = document.createElement("input");
    emailInput.type = 'text';
    emailInput.className = 'categoryName';
    emailInput.id = i;
    emailInput.value = customers[i].email;
    emailInput.disabled = true;
    email.appendChild(emailInput);
    row.appendChild(email);


  var detail = document.createElement("div");
  detail.className = 'col-sm-2'
  var detailBtn = document.createElement("input");
  detailBtn.type = 'button';
  detailBtn.className = 'btn btn-info';
  detailBtn.value ='View';
  detailBtn.addEventListener('click',viewDetails.bind(customers[i].email));
  //saveBtn.onclick = saveCategory();
  detail.appendChild(detailBtn);
  row.appendChild(detail);


  var hrLine = document.createElement('hr');
  row.appendChild(hrLine);
  

  container.appendChild(row);
  //table.appendChild(container);
  
}
table.appendChild(container);

}

function viewDetails(){
    var customerEmail = this;
    localStorage.setItem("cEmail",customerEmail);
    window.location.href="admin-view-customer-order.html"
    
}

function loadAll(){
  var currentUser=localStorage.getItem("cEmail");
  customerOrders=[];
  var request = new XMLHttpRequest();
  var url = 'getOrder.action';
  request.open("GET", url, false);

  request.setRequestHeader('Content-type', 'application/json');
  //console.log("category list ",);
  request.send();
  orders = JSON.parse(request.responseText);
  console.log("my orders ",orders);

  for(i in orders){
      if(orders[i].customerEmail===currentUser){
          customerOrders.push(orders[i]);
      }
  }

  console.log("current customer orders -> ",customerOrders);
    
  //Print all the orders of this customer
  print();
}

function print(){
  if(customerOrders){
      var table = document.getElementById('table');
      var container = document.createElement('div');
      container.id = "container";
      
      for(i in customerOrders){
          var single = document.createElement('div');
      single.style.border="1px solid darkGrey";
      single.className="mb-3";
          var row1 = document.createElement('div');
          row1.className="row p-3";
          var orderId = document.createElement('span');
          orderId.innerHTML="Order ID:   "+customerOrders[i].id;
          orderId.className="p-3"
          row1.appendChild(orderId);
          var cost = document.createElement('span');
          cost.innerHTML="Total Cost: $"+customerOrders[i].totalcost.toFixed(2);
          cost.className="p-3";
          row1.appendChild(cost);
          var address = document.createElement("span");
          address.innerHTML="Address: "+customerOrders[i].address+","+customerOrders[i].postalCode;
          address.className="p-3";
          row1.appendChild(address);
          var phone = document.createElement("span");
          phone.innerHTML="Phone Number: "+customerOrders[i].phoneNumber;
          phone.className="p-3";
          row1.appendChild(phone);
          var status = document.createElement("span");
          status.innerHTML="Status: "+customerOrders[i].status;
          status.className="p-3";
          row1.appendChild(status);
          single.appendChild(row1);
          var line = document.createElement('hr');
          line.className=("p-2 m-2 ")
          single.appendChild(line);
          var prodContainer = document.createElement('div');
          prodContainer.className="m-4 p-3";
          var products = customerOrders[i].details;
          console.log("Details -> ",products);
          for(key in products){
              var row = document.createElement('div');
              row.className="row";
              var name = document.createElement("span");
              name.innerHTML="Item: "+products[key].name;
              name.className="p-3";
              row.appendChild(name);
              var price = document.createElement("span");
              price.innerHTML="$"+products[key].price;
              price.className="p-3";
              row.appendChild(price);
              prodContainer.appendChild(row);
          }
          var l=document.createElement('hr');
          prodContainer.appendChild(l);
          var sub = document.createElement('span');
          sub.innerHTML="Sub Total: $"+customerOrders[i].subTotal.toFixed(2);
          sub.className="p-1";
          sub.style.fontSize="20px";
          prodContainer.appendChild(sub);
          
          single.appendChild(prodContainer);
          //single.appendChild(row1);
          
          container.appendChild(single);
      }

      table.appendChild(container);
  }
}

function searchCustomer(){
  var value = document.getElementById('search').value;
  console.log("search value -> ",value);
  var newCustomers=[];
  for(i in customers){
    var c = customers[i];
    var names = c.name.split(" ");
    for(j in names){
    if(names[j].toUpperCase() === value.toUpperCase()){
      newCustomers.push(c);
    }
  }
  }
  console.log("new customers list -> ",customers)
  displayCustomer(newCustomers);
}

