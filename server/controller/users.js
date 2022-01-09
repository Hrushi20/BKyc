const UsersSchema = require("../models/Users");
const { errHandler } = require("../utils/errHandler");

const storeUser = async(req,res,next) => {

    try{

        const userData = await UsersSchema.findOne({ authId:req.body.user.sub }).exec();
        console.log("user :: ", req.body);
        console.log("userData :: ", userData);

        if(userData == null){
            const user = new UsersSchema({
                username: req.body.user.name,
                status:"noKyc",
                authId: req.body.user.sub,
            });

            await user.save();

            res.status(201).json(user);

            return ;
             
        }
        res.status(201).json(userData);

    }catch(err){
        errHandler(err,next);
    }
}

const getUser = async(req,res,next) => {

    try{

        const userData = await UsersSchema.findOne({ authId:"61d41be6cde5bf5cc4e7c44d" }).exec();

        res.status(200).json(userData);

    }catch(err){
        errHandler(err,next);
    }
}



module.exports = { storeUser,getUser };