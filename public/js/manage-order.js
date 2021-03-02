var orders;
var container;
var currentOrder;

function read(){

    var request = new XMLHttpRequest();
    var url = 'getOrder.action';
    request.open("GET", url, false);

    request.setRequestHeader('Content-type', 'application/json');
    //console.log("category list ",);
    request.send();
    orders = JSON.parse(request.responseText);
    console.log("my orders ",orders);
  }

  function clean(){
    if(container){
      var element = document.getElementById("cont");
      element.remove();
    }else{
      return;
    }
  }


  function displayOrders(){
      read();
    clean();
    table = document.getElementById("table");
    
    container = document.createElement("div");
    container.id = "cont";
    for (var i in orders) {

    var order = orders[i];

    row = document.createElement("div");
    row.className = 'row';

    var orderId = document.createElement("div");
    orderId.className = 'col-sm-1'
    var nameInput = document.createElement("input");
    nameInput.type = 'text';
    nameInput.className = 'categoryName';
    nameInput.id = i;
    nameInput.value = order.id;
    nameInput.disabled = true;
    orderId.appendChild(nameInput);
    row.appendChild(orderId);

    var customer = document.createElement("div");
    customer.className = 'col-sm-3' 
    var customerInput = document.createElement("input");
    customerInput.type = 'text';
    customerInput.className = 'categoryName';
    customerInput.id = order.id;
    customerInput.value = order.customerName;
    customerInput.disabled = true;
    customer.appendChild(customerInput);
    row.appendChild(customer);

    var email = document.createElement("div");
    email.className = 'col-sm-3'
    var emailInput = document.createElement("input");
    emailInput.type = 'text';
    emailInput.className = 'categoryName';
    emailInput.id = i;
    emailInput.value = order.customerEmail;
    emailInput.disabled = true;
    email.appendChild(emailInput);
    row.appendChild(email);


    var status = document.createElement("div");
    status.className = 'col-sm-2'
    var statusInput = document.createElement("input");
    statusInput.type = 'text';
    statusInput.className = 'categoryName';
    statusInput.id = i;
    statusInput.value = order.status;
    statusInput.disabled = true;
    status.appendChild(statusInput);
    row.appendChild(status);

    var date = document.createElement("div");
    date.className = 'col-sm-2'
    var dateInput = document.createElement("input");
    dateInput.type = 'text';
    dateInput.className = 'categoryName';
    dateInput.id = i;
    var dateString = order.date.split("T")[0];
    dateInput.value = dateString;
    dateInput.disabled = true;
    date.appendChild(dateInput);
    row.appendChild(date);

  var detail = document.createElement("div");
  detail.className = 'col-sm-1'
  var detailBtn = document.createElement("input");
  detailBtn.type = 'button';
  detailBtn.className = 'btn btn-info';
  detailBtn.value ='View';
  detailBtn.addEventListener('click',viewDetails.bind(order));
  //saveBtn.onclick = saveCategory();
  detail.appendChild(detailBtn);
  row.appendChild(detail);


  var hrLine = document.createElement('hr');
  hrLine.style.height='20px';
  row.appendChild(hrLine);
  

  container.appendChild(row);
  //table.appendChild(container);
  
}
table.appendChild(container);

}

function viewDetails(){
    localStorage.setItem("currentOrder",this.id);
    console.log("cuurent order before pass: ",this.id);
    window.location.href="admin-view-order.html";
}

function orderInUse(){
  var date = document.getElementById('orderDate');
      var name = document.getElementById('customerName');
      var email = document.getElementById('customerEmail');
      var status = document.getElementById('status');
      var selector = document.getElementById('selctor');
      var address = document.getElementById('address');
      var postalCode = document.getElementById('postalCode');
      var phoneNumber = document.getElementById('phoneNumber');
      var items = document.getElementById('totalItems');
      var cost = document.getElementById('totalCost');
    var curOrderId = localStorage.getItem("currentOrder");
    currentOrder;
    console.log("my current order in edit: ",curOrderId);
    if(curOrderId){
      document.getElementById("orderId").value=curOrderId;
      var request = new XMLHttpRequest();
    var url = 'getOrder.action';
    request.open("GET", url, false);

    request.setRequestHeader('Content-type', 'application/json');
    //console.log("category list ",);
    request.send();
    orders = JSON.parse(request.responseText);
    for(key in orders){
      if(orders[key].id == curOrderId){
        currentOrder=orders[key];
        console.log("current order ->  ",currentOrder);
      var dateString = currentOrder.date.split("T")[0];
      var timeString = currentOrder.date.split(".")[0];
      date.value=currentOrder.date;
      name.value = currentOrder.customerName;
      email.value=currentOrder.customerEmail;
      status.value = currentOrder.status;
      address.value=currentOrder.address;
      postalCode.value=currentOrder.postalCode;
      phoneNumber.value=currentOrder.phoneNumber;
      items.value=currentOrder.details.length;
      cost.value = currentOrder.totalcost;

        }
      }
      
    }
}

function editOrder(){
    var selector = document.getElementById('selector');
    selector.hidden = false;
    var customerName = document.getElementById('customerName');
    customerName.disabled = false;
    var address = document.getElementById('address');
    address.disabled = false;
      var postalCode = document.getElementById('postalCode');
      postalCode.disabled=false;
      var phoneNumber = document.getElementById('phoneNumber');
      phoneNumber.disabled=false;
    



}
function selectorValue(){
  var strUser = selector.options[selector.selectedIndex].text;
  var status = document.getElementById('status');
  status.value=strUser;
    
}

function saveOrder(){
  var UID = document.getElementById('customerEmail').value;
  var customerName = document.getElementById('customerName');
  
    customerName.disabled = true;
    var address = document.getElementById('address');
    address.disabled = true;
    var status = document.getElementById('status');
      var postalCode = document.getElementById('postalCode');
      postalCode.disabled=true;
      var phoneNumber = document.getElementById('phoneNumber');
      phoneNumber.disabled=true;
     var OID = currentOrder.id;
      currentOrder.customerName = customerName.value;
     currentOrder.address = address.value; 
     currentOrder.status = status.value;
     currentOrder.postalCode = postalCode.value;
     currentOrder.phoneNumber=phoneNumber.value;
     console.log("currentorder -> ",currentOrder);
  var request = new XMLHttpRequest();
  var url = 'saveOrder.action';
  request.open("POST", url, false); 
  request.setRequestHeader('Content-type', 'application/json');
  request.send(JSON.stringify(currentOrder));
  window.alert("Order Saved");
  window.location.href="manage-order.html";
}