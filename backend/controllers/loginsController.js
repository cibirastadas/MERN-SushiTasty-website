const Users = require("../models/usersModel");
const AppError = require("../utils/appError");

const findUser = async ( req, res, next) =>{
    try{
        const users = await Users.findOne({name : req.body.name, password : req.body.password});
        if(users===null){
            throw new AppError('Naudotojas nebuvo rastas, bandykite dar kartą', 404)
         }else{
            res.json(`Sekmingai prisijungėte: ${req.body.name}`)
         }
    }catch(err){
        next(err)/* tiesiogiai kreipiasi i error handler */
    }
}
exports.findUser = findUser