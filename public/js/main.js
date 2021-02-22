var user="Guest";


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
        if(user.name==="admin"){
            console.log("current user in index" ,user.name);
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