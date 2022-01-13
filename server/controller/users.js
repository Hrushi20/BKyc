const Users = require("../lib/Users/Users");
const MessageSchema = require("../models/Messages");
const { errHandler } = require("../utils/errHandler");

const storeUser = async(req,res,next) => {
    // Todo, need to add status from frontend...
    // Status of banker and authorizer will be "banker" and "authorizer" respectively.

    try{
        const data = req.body;
        let userData = await Users.getUser(data);
        if(!userData){
            userData = await Users.createUser(data);
            res.status(201).json(userData);
            return ;
        }
        res.status(201).json(userData);

    }catch(err){
        errHandler(err,next);
    }
}



const getMessage = async(req, res, next) => {
    try{
        console.log("reqBody here : ", req.body);
        const message = await MessageSchema.findOne({email: req.body.email }).exec();

        if(message == null) {
            const msg = new MessageSchema({
                email: req.body.email,
                message: req.body.message,
            })

            await msg.save();
            res.status(201).json(msg);
            return ;
        }

        res.status(201).json(message);

    }catch(err){
        errHandler(err, next)
    }
}



module.exports = { storeUser, getMessage };