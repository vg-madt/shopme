var currentUser;
var orders;
var customerOrders = [];


function loadAll(){
    currentUser=localStorage.getItem("currentUserEmail");

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