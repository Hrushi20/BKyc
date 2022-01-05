const UsersSchema = require("../models/Users");

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
        if(err)
            return next(err);

        err  = new Error("Internal sever error");
        next(err);
    }
}

const getUser = async(req,res,next) => {

    try{

        const userData = await UsersSchema.findOne({ _id:"61d41be6cde5bf5cc4e7c44d" }).exec();

        res.status(200).json(userData);

    }catch(err){
        if(err)
            return next(err);

        err  = new Error("Internal sever error");
        next(err);
    }
}



module.exports = { storeUser,getUser };