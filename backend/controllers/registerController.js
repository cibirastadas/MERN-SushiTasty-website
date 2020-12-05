const Users = require("../models/usersModel")

const createNewUser = async (req, res, next)=>{
    const user = Users({
        name: req.body.name,
        email : req.body.email,
        password: req.body.password
    })
    try{
        await user.save();
        res.json("Registracija buvo sekminga, prašome prisijungti")
    }catch(err){
        next(err)
    }
}

exports.createNewUser = createNewUser;