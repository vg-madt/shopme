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
    var pathId=path.split("-");
    var imagePid = pathId[1];
    var data;
    if(path ==""){
        console.log("calling my index.html");
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
                console.log("product id for image: ",pId);
                filename = 'image.jpg';
                //console.log("image data: ",data);
                writeImage(folder,product,filename,data);
                res.end();
                break;
        }   
    });
    return;
}
   
    console.log("path", path);

    let file = __dirname+'/public/' +path;

    switch(path){
        case "css/main.css":
            console.log("setting main.css header ",path)
            res.setHeader("Content-type","text/css");
            break;
        case "css/admin.css":
            console.log("setting main.css header ",path)
            res.setHeader("Content-type","text/css");
            break;
        case "constants/colors.css":
            res.setHeader("Content-type","text/css");
            break;
        case "js/main.js":
            res.writeHead(200,{"Content-type":"application/javascript"});
            break;
        case "js/admin.js":
            res.writeHead(200,{"Content-type":"application/javascript"});
            break;
        case "js/product.js":
            res.writeHead(200,{"Content-type":"application/javascript"});
            break;
        case "js/manage-order.js":
            res.writeHead(200,{"Content-type":"application/javascript"});
            break;
        case "index.html":
            res.setHeader("Content-type","text/html");
            break;
        case "login.html":
            res.setHeader("Content-type","text/html");
            break;
        case "register.html":
            res.setHeader("Content-type","text/html");
            break;
        case "admin.html":
            res.setHeader("Content-type","text/html");
            break;
        case "product.html":
            res.setHeader("Content-type","text/html");
            break;
        case "add-product.html":
            res.setHeader("Content-type","text/html");
            break;
        case "manage-order.html":
            res.setHeader("Content-type","text/html");
            break;
        case "customer-info.html":
            res.setHeader("Content-type","text/html");
            break;
        case "view-order.html":
        //+"?"+curOrder:
            //file = 'view-order.html';
            res.setHeader("Content-type","text/html");
            break;
        case "getCategory.action":
            file = 'json/category.json';
            res.setHeader("Content-type","application/json");
            break;
        case "getProduct.action="+categoryId:
            //console.log("request body: ",req.body);
            file = 'json/product.json';
            res.setHeader("Content-type","application/json");
            break;
        case "getOrder.action":
            file = 'json/order.json';
            console.log("getting orders");
            res.setHeader("Content-type","application/json");
            break;
        case "getImage.action-"+imagePid:
            file = 'product-image/'+imagePid+'image.jpg';
            console.log("getting orders");
            res.setHeader("Content-type","text/plain");
            break;
        

    }

    fs.readFile(file, function(err, content){
        if(err){
            console.log("file not found ",file);
            res.writeHead(404);
            res.end();
        }
        else if(categoryId){
            //console.log("file is for product");
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
        }else if(pId){
            var products = JSON.parse(content);
            var product;
            Object.values(products).forEach(obj => {
                if(obj.id == pId){
                    product = obj;
                }
            });
            res.end(JSON.stringify(obj));
        }else if(imagePid){
            res.end(file);
        }
        else{
            //var orders = JSON.parse(content);
            //console.log(JSON.parse(content));
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
//console.log("Existing: ", whole, " Updated: ", data, " Key: ", key);
if (!(key && whole.hasOwnProperty(key))) {
    let ids = [];
    Object.keys(whole).forEach(id => {ids.push(parseInt(id))});
    ids.sort().reduce((obj,k) => {
        obj[k] = whole[k];
        return obj;
    },{});
    
    //console.log("Length: ", Object.keys(whole).length);
    data.id = ids[ids.length - 1] + 1;
    key = data.id;
}
if (remove) {
    //console.log("Removing: ",whole[key]);
    delete whole[key];
} else {
    whole[key] = data;
}
fs.writeFileSync('json/'+filename,JSON.stringify(whole));
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