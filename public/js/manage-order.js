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
    orderId.className = 'col-sm-2'
    var nameInput = document.createElement("input");
    nameInput.type = 'text';
    nameInput.className = 'categoryName';
    nameInput.id = i;
    nameInput.value = order.id;
    nameInput.disabled = true;
    orderId.appendChild(nameInput);
    row.appendChild(orderId);

    var customer = document.createElement("div");
    customer.className = 'col-sm-4'
    var customerInput = document.createElement("input");
    customerInput.type = 'text';
    customerInput.className = 'categoryName';
    customerInput.id = i;
    customerInput.value = order.customerName;
    customerInput.disabled = true;
    customer.appendChild(customerInput);
    row.appendChild(customer);


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

  var detail = document.createElement("div");
  detail.className = 'col-sm-2'
  var detailBtn = document.createElement("input");
  detailBtn.type = 'button';
  detailBtn.className = 'btn btn-info';
  detailBtn.value ='View details';
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
    window.location.href="view-order.html";
}

function orderInUse(){
    var curOrder = localStorage.getItem("currentOrder");
    console.log("my current order in edit: ",curOrder);
}

function editOrder(){
    var selector = document.getElementById('selector');
    selector.hidden = false;
    var customerName = document.getElementById('customerName');
    customerName.disabled = false;
    var address = document.getElementById('address');
    address.disabled = false;
    var status = document.getElementById('status');
    status.disabled = false;
}

function saveOrder(){
    var selector = document.getElementById('selector');
    var selectedOrder = selector.value;

}