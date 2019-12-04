const express = require("express");
const UserController = require("../controllers/product");
const router = express.Router();

router.post("/addProduct", UserController.addProd);
router.get("/getProducts", UserController.getProds);
router.post("/deleteProd", UserController.delProds);
router.post("/editProd", UserController.editProds);
router.post("/getSorted", UserController.sortProds);
router.post("/getSlideSort", UserController.slideSortProds);


module.exports = router;
