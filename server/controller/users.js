const UsersSchema = require("../models/Users");
const { errHandler } = require("../utils/errHandler");

const storeUser = async(req,res,next) => {

    try{

        const user = new UsersSchema({
            username:"Hrushikesh",
            phoneNumber:"987654321",
            status:"noKyc"
        });

        await user.save();
        
        res.status(201).send("<h1>Storing user</h1>");

    }catch(err){
        errHandler(err,next);
    }
}

const getUser = async(req,res,next) => {

    try{

        const userData = await UsersSchema.findOne({ _id:"61d41be6cde5bf5cc4e7c44d" }).exec();

        res.status(200).json(userData);

    }catch(err){
        errHandler(err,next);
    }
}



module.exports = { storeUser,getUser };