class Category {
    constructor(CID,categoryName) {
        this.CID = CID;
      this.categoryName = categoryName;
    }
  }


class Product{
  constructor(PID,CID,productName,price,img) {
    this.PID = PID;
  this.productName = productName;
  this.price = price;
  this.img = img;
  this.CID = CID;
}
}

class Order{
  constructor(OID,CID,orderDate,status,totalItems,totalCost){
    this.OID=OID;
    this.CID=CID;
    this.orderDate = orderDate;
    this.status = status;
    this.totalItems=totalItems;
    this.totalCost=totalCost;
  }
}

class Customer{
  //CUID;
  constructor(customerName,email,password){
    this.CUID = CUID;
    this.customerName = customerName;
    this.email = email;
    this.password = password;
  }
}

class Address{
  constructor(AID,CUID,line1,line2,city,province,country,pincode){
    this.AID = AID;
    this.CUID = CUID;
    this.line1 = line1;
    this.line2 = line2;
    this.city = city;
    this.province = province;
    this.country = country;
    this.pincode = pincode;
  }
}