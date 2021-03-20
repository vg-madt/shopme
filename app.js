'use-strict'

var http = require('http');
var url = require("url");
var fs = require('fs');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const { parse } = require('querystring');

var DIR='json/';

const server = http.createServer((req, res) => {
    let parsedURL = url.parse(req.url, true);
    let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
    var id = path.split("=");
    var categoryId = id[1];
    var pathId = path.split("?");
    var pId = pathId[1];
    var pathNid = path.split("*");
    var productName = pathNid[1];
    var pathPRid = path.split("~");
    var prId = pathPRid[1];
    var pathIId=path.split("-");
    var imagePid = pathIId[1];
    var pathUId=path.split("&");
    var userId = pathUId[1];
    var UID = path.split("!")[1];
    var data;
    if(path ==""){
        //console.log("calling my index.html");
        path = "index.html";
        
    }
    
    res.setHeader("X-Content-Type-Options","nosniff");
    if(req.method === 'POST'){
        console.log("request url ",path);
        var body = '';
        req.on('data',chunk => {
            body += chunk.toString();

    });
    
    req.on('end', () => {
        //console.log("request body", body);
        if(req.headers["content-type"]=="application/json"){
        data = JSON.parse(body);
        }else{
            data=body;
        }
        var filename;
        var key;

        switch(path){

            case "register.action":
                console.log("request url ",path);
                filename = 'customer.json';
                key = data.email;
                data.id = data.email;
                readWrite(filename,data,key);
                res.end(JSON.stringify(data));
                break;
            case "addNewCategory.action":
            case "saveCategory.action":
                filename = 'category.json';
                key = data.id ? data.id : data.name;
                readWrite(filename,data,key);
                res.end();
                break;
            case "removeCategory.action":
                filename = 'category.json';
                key = data.id ? data.id : data.name;
                readWrite(filename,data,key, true);
                res.end();
                break;
            case "removeProduct.action":
                filename = 'product.json';
                key = data.id ? data.id : data.name;
                readWrite(filename,data,key, true);
                res.end();
                break;
            case "addProduct.action":
            case "saveProduct.action":
                filename = 'product.json';
                key = data.id ? data.id : data.name;
                readWrite(filename,data,key);
                res.end(JSON.stringify(data));
                break;
            case "editProduct.action?"+pId:
                filename = "product.json";
                key = pId;
                var product = readJsonFile(filename,data,key);
                res.end(JSON.stringify(product));
            case "login.action":
                filename = 'customer.json';
                key = data.email;
                var user = readJsonFile(filename,data,key);
                res.end(JSON.stringify(user));
                return;
            case "addImage.action?"+pId:
                var folder = 'product-image';
                var product = pId;
                //console.log("product id for image: ",pId);
                filename = 'image.jpg';
                //console.log("image data: ",data);
                writeImage(folder,product,filename,data);
                res.end();
                break;
            case "addCart.action&" + userId:
                filename = "cart.json";
                key = userId;
                data.id = key;
                console.log("Add cart: ", data, "; User: ", userId, "; File: ", filename);
                readWrite(filename,data,key);
                res.end(JSON.stringify(data));
                break;
            case "removeCart.action":
                filename = 'cart.json';
                key = data.id ? data.id : data.name;
                readWrite(filename,data,key, true);
                res.end();
                break;
            case "saveOrder.action":
                filename = "order.json";
                key=data.id;
                console.log("EDIT order: ", data, filename);
                readWrite(filename,data,key);
                res.end();
                break;
            case "addOrder.action&"+userId:
                filename = "order.json";
                console.log("Add order: ", data, filename);
                readWrite(filename,data,key);
                // res.end(JSON.stringify(data));
                filename = "user-order.json";
                var uo = {};
                uo[userId] = {"orders": []};
                uo[userId]["orders"].push(data.id);
                uo.id = userId;
                key = userId;
                console.log("User order: ", uo, filename);
                readWrite(filename,uo,key);
                res.end(JSON.stringify(data));
                break;
        }   
    });
    return;
}
   
    console.log("path", path);

    var file = __dirname+'/public/' +path;

    let type;
    switch(path){
        case "getCategory.action":
            file = 'json/category.json';
            res.setHeader("Content-type","application/json");
            break;
        case "getProduct.action="+categoryId:
            // console.log("request body: ",req.body);
            file = 'json/product.json';
            type = "application/json";
            res.setHeader("Content-type","application/json");
            break;
        case "getProduct.action*"+productName:
            // console.log("request body: ",req.body);
            file = 'json/product.json';
            console.log("my file for product -> ",file);
            type = "application/json";
            res.setHeader("Content-type","application/json");
            break;
        case "getProduct.action~"+prId:
            // console.log("request body: ",req.body);
            file = 'json/product.json';
            console.log("my file for product -> ",file);
            type = "application/json";
            res.setHeader("Content-type","application/json");
            break;
        case "getOrder.action":
            file = 'json/order.json';
            console.log("getting orders");
            res.setHeader("Content-type","application/json");
            break;
        case "getOrders!"+UID:
            file = 'json/order.json';
            console.log("getting orders");
            res.setHeader("Content-type","application/json");
            break;
        case "getCustomer.action":
            file='json/customer.json';
            console.log("getting customers");
            res.setHeader("Content-type","application/json");
            break;

        case "getImage.action-"+imagePid:
            file = 'product-image/'+imagePid+'_image.jpg';
            console.log("getting orders");
            res.setHeader("Content-type","text/plain");
            break;
        case "getCart.action&"+userId:
            file = 'json/cart.json';
            console.log("getting carts");
            res.setHeader("Content-type","application/json");
            break;
        case "getStats.action":
            file = 'json/order.json';
            console.log("getting stats from orders");
            res.setHeader("Content-type","application/json");
            break;
    }

    fs.readFile(file, function(err, content){
        console.log("File -> ", file);
        if(err){
            console.log("my file is not here");
            console.log("file not found ",file);
            res.writeHead(404);
            res.end();
        } else if(categoryId && categoryId !== 'undefined'){
            console.log("file is for product", categoryId);
            //console.log(JSON.parse(content));
            var products = JSON.parse(content);
            var objs=[];
            Object.values(products).forEach(obj => {
                if(obj.cId == categoryId){
                    objs.push(obj);
                }    
            });
            //console.log("product object: ",objs);
            //var o = JSON.parse(objs);
            //var products = readJsonFile(file,res.body,res.body);
            res.end(JSON.stringify(objs));
        }else if(productName){
            console.log("searhing for products");
            var products = JSON.parse(content);
            var product;
            var resultProducts=[];
            Object.values(products).forEach(obj =>{
                var name = obj.name;
                var names = name.split(" ");
                //console.log("object name -> ",names);
                for(i in names){
                    console.log("printing i -> ",names[i]);
                    if(names[i].toUpperCase() === productName.toUpperCase()){
                        product = obj;
                        console.log("selected product -> ",JSON.stringify(product));
                        resultProducts.push(product);
                    }
                }
            });
            console.log("Searched products: ",JSON.stringify(resultProducts));
            res.end(JSON.stringify(resultProducts));
        }else if(prId){
            console.log("Get product by id: ", prId);
            var products = JSON.parse(content);
            var product;
            Object.values(products).forEach(obj =>{
                if (obj.id == prId) {
                    product = obj;
                    return;
                }
            });
            console.log("Get product: ",JSON.stringify(product));
            res.end(JSON.stringify(product));
        }else if(pId){
            var products = JSON.parse(content);
            var product;
            Object.values(products).forEach(obj => {
                if(obj.id == pId){
                    product = obj;
                }
            });
            res.end(JSON.stringify(obj));
        // }else if(imagePid){
        //     res.end(file);
        }else if(UID){
            var orders = JSON.parse(content);
            var order;
            var result=[];
            Object.values(orders).forEach(obj => {
                if(obj.customerEmail === UID){
                    order = obj;
                    result.push(order);
                }
            });
            res.end(JSON.stringify(result));
        
        } else if (userId) {
            console.log("adding to cart");
            var carts = JSON.parse(content);
            var cart;
            if (carts.hasOwnProperty(userId)) {
                cart = carts[userId];
            } else {
                cart = {products:[]};
            }
            res.end(JSON.stringify(cart));
        }else if (path == "getStats.action") {
            var colors=["Red","Blue","Pink","Green","Yellow"];
            console.log("Getting stats from orders");
            var orders = JSON.parse(content);
            var now = new Date();
            var wd = new Date(now.getDate() - 7);
            var md = new Date(now.getDate() - 30);
            var yd = new Date(now.getDate() - 365);
            var range = {'Last Week':[now, wd], 'Last Month': [now, md], 'Last Year': [now, yd]};
            var data = {
                labels: [],
                datasets: []
            };
            var categories = readCatFile("category.json");
            console.log("categories for chart -> ",categories);
            var cData = {};
            for (k in range) {
                data.labels.push(k);
            }
            for (k in categories) {
                console.log("k in categories loop");
                var dd = {
                    data: [0, 0, 0],
                    label: categories[k].name,
                    backgroundColor: colors[k-2]
                };
                cData[k] = dd;
                console.log("DD: ", dd);
                data.datasets.push(dd);
            }
            for (k in orders) {
                var od = new Date(orders[k].date);
                var products = orders[k].details;
                for (p in products) {
                    var cId = products[p].cId;
                    var dd = cData[cId];
                    console.log("DD by Product: ", dd);
                    let i = 0;
                    for (r in range) {
                        if (od.getTime() <= range[r][0].getTime() && od.getTime() >= range[r][1].getTime()) {
                            dd.data[i] = dd.data[i] + 1;
                        }
                        i++;
                    }
                }
            }
            console.log("Stats from order: ", data);
            res.end(JSON.stringify(data));
        }
        else{
            //var orders = JSON.parse(content);
            console.log("Type -> ", type);
            if (type && type == "application/json") {
                //console.log("Content tree -> ", JSON.parse(content));
                var objs=[];
                Object.values(JSON.parse(content)).forEach(obj => {
                        objs.push(obj);
                });
                //console.log("Content string -> ", JSON.stringify(objs));
                content = JSON.stringify(objs);
            }
            res.end(content);
        }
        });

    });

    server.listen(5000,"localhost", () => {
        console.log("Listening on port 5000");
    });

function writeImage(folder,product,filename,data){
    fs.writeFile(folder+"/"+product+"_"+filename, data, 'binary', function(err){
        if (err) throw err
        console.log('File saved.');
    });
}
//function to read and write the contents to json
function readWrite(filename,data,key,remove){
    var whole;
    if (fs.existsSync('json/'+filename)) { 
        let rawdata = fs.readFileSync('json/'+filename);
        whole = JSON.parse(rawdata);
} else {
whole = {};
}
console.log("Existing: ", whole, " Updated: ", data, " Key: ", key);
if (data.id === undefined && !(key && whole.hasOwnProperty(key))) {
    let ids = [];
    //console.log("id -> ",id);
    Object.keys(whole).forEach(id => {
        console.log("id -> ",id);
        ids.push(parseInt(id))});
    ids.sort((obj,k) =>
        obj - k);
    console.log("Data: ", data);
    console.log("Length: ", Object.keys(whole).length);
    if (Object.keys(whole).length == 0) {
        data.id = 1;
    } else {
        console.log("Ids: ", ids);
        var length = ids.length-1;
        data.id = ids[length] + 1;
    }
    console.log("data id -> ",data.id);
    key = data.id;
}
if (remove) {
    console.log("Removing: ",whole[key]);
    delete whole[key];
} else{
    console.log("Whole: ", whole, "; Data: ", data);
    whole[key] = data;
}
fs.writeFileSync('json/'+filename,JSON.stringify(whole));
}
function readCatFile(filename){
    console.log("reading the category json file");
    var whole;
    if(fs.existsSync('json/'+filename)){
        let rawdata = fs.readFileSync('json/'+filename);
        whole = JSON.parse(rawdata);
    }
    return whole;
}
//does only read no writing.
function readJsonFile(filename,data,key){
    console.log("reading the json file");
    var whole;
    if(fs.existsSync('json/'+filename)){
        let rawdata = fs.readFileSync('json/'+filename);
        whole = JSON.parse(rawdata);
        if(whole[key]){
            let existing = whole[key];
            //console.log("current user ",existing);
            if (existing.password === data.password) {
                //console.log("current user ",existing);
                return existing;
                
            } else {
                return error;
            }
        }
    }
}