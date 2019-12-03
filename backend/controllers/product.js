const Product = require("../modals/product");

exports.addProd = (req, res, next) =>{
  const data = new Product({
      productId: 'PID' + Math.floor((Math.random()* 101)).toString(),
      productName: req.body.productName,
      productPrice: req.body.price
  });
  data.save().then(data =>{
      if(data) {
          Product.find().then(result => {
            res.status(200).json({
                message: "Product Added Successfully",
                products: result
            });
          }).catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
         
      }
  }).catch(err=>{
      res.status(401).json({
        message: err.message
      });
  })
}

exports.getProds = (req,res, next) =>{
    Product.find().then(data =>{
        if(data) {
            res.status(201).json({
                 data
            });
        } else {
            if(!data) {
                res.status(200).json({
                    message: "No Products Found"
                })
            }
        }
    }).catch(err =>{
        res.status(404).json({
            message: err.message
        });
    });
}

exports.delProds = (req, res, next) =>{
    Product.findByIdAndDelete({_id: req.body._id}).then(result =>{
        if(result) {
            Product.find().then(result => {
                res.status(201).json({
                    message: "Deleted Successfully",
                    products: result
                });
              }).catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
        }
      
    }).catch(err =>{
        res.status(500).json({
            message: "Server Error"
        });
    })
}

exports.editProds = (req, res, next) =>{
    const data = {
        productName: req.body.productName,
        productPrice: req.body.price
    };
    Product.findByIdAndUpdate(req.body.id, data).then(result =>{
        if(result) {
            Product.find().then(result => {
                res.status(201).json({
                    message: "Updated Successfully",
                    products: result
                });
              }).catch(err => {
                  res.status(500).json({
                      message: err.message
                  })
              })
        }
        
    }).catch(err =>{
        res.status(500).json({
            message: "Server Error"
        });
    })
}