const Sushies = require("../models/sushiesModel")

const getAllProducts = async ( req, res, next) =>{
    try{
        const sushies = await Sushies.find();
        res.json(sushies)
    }catch(err){
        res.json({msg: err})
    }
}
exports.getAllProducts = getAllProducts;