const Feedbacks = require("../models/feedbacksModel")
const Users = require("../models/usersModel")

const getAllFeedbacks= async (req, res, next)=>{
    try{
        const feedbacks = await Feedbacks.find()
        res.json(feedbacks)
    }catch(err){
        res.json({message : err})
    }
}

const getAllUserFeedbacks = async (req, res, next)=>{
    try{
        const userFeedbacksId = await Users.findOne({name : req.params.user},{message: true, _id:0})
        const feedbacks = await Feedbacks.find().where(`_id`).in(userFeedbacksId.message).exec();
        res.json(feedbacks)
    }catch(err){
        res.json({message : err})
    }
}

const deleteFeedbackById = async (req, res, next)=>{
    try{
        await Feedbacks.deleteOne({_id : req.params.id})
        await Users.updateOne({ message : req.params.id},{$pull:{message : req.params.id}})
        res.json("Atsiliepimas buvo pašalintas")
    }catch(err){
        res.json({msg : err})
    }
}

const createNewFeedback = async (req, res, next)=>{
    const feedback = Feedbacks({
        userName : req.body.name,
        rating: req.body.rating,
        about : req.body.about,
        userText : req.body.userText
    })
    try{
        await feedback.save();
        await Users.updateOne({name : req.body.name},{$addToSet:{message : [feedback._id.toString()]}})
        const userFeedbacksId = await Users.findOne({name : req.body.name},{message: true, _id: 0})
        await Feedbacks.find().where(`_id`).in(userFeedbacksId.message).exec();  
        res.json("Atsiliepimas buvo sekmingai parašytas")
    }catch(err){
        res.json({message : err})
    }
}

const updatFeedbackById = async (req, res, next)=>{
  
    try{
        if(req.body.adminText){
           await Feedbacks.updateOne({_id : req.params.id},
                {$set: 
                    {adminText: req.body.adminText,
                    adminDate: req.body.date,
                    response : true}
                })
            res.json("Naudotojas gavo jūsų atsakymą")
        }else{
            await Feedbacks.updateOne({_id : req.params.id},
                {$set: 
            {email: req.body.email, 
            about : req.body.about,
            userText : req.body.userText } })
            res.json("Atsiliepimas buvo atnaujintas")
        }
    }catch(err){
        res.json({msg : err})
    }
}

exports.getAllFeedbacks = getAllFeedbacks;
exports.getAllUserFeedbacks = getAllUserFeedbacks;
exports.deleteFeedbackById = deleteFeedbackById;
exports.createNewFeedback = createNewFeedback;
exports.updatFeedbackById = updatFeedbackById;