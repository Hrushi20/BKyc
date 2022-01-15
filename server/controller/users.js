const Users = require("../lib/Users/Users");
const MessageSchema = require("../models/Messages");
const BankData = require("../models/BankData");
const UsersSchema = require("../models/Users");
const userData = require("../models/UserData");
const { errHandler } = require("../utils/errHandler");

const storeUser = async(req,res,next) => {
    // Todo, need to add status from frontend...
    // Status of banker and authorizer will be "banker" and "authorizer" respectively.

    try{
        const data = req.body;
        let userData = await Users.getUser(data);
        if(!userData){
            await Users.createUser(data);
            let userData = await Users.getUser(data);
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

const getUserInfo = async(req,res,next) => {
    try{
        const data = req.body;
        console.log(data);
        let userData = await UsersSchema.findOne({ userId: data.user.sub }).exec();
        console.log("user : ", userData);
        if(!userData){
            return ;
        }
        res.status(201).json(userData);

    }catch(err){
        errHandler(err,next);
    }
}

const getRequests = async(req, res, next) => {
    try{
        const userId = req.params.userId;
        const granted = [];
        const pending = [];
        let reqDetails = await userData.findOne({ userId: userId }).exec();

        for(let bank of reqDetails.granted_kyc_access_to){
            const bankDetail = await BankData.findOne({ bankId:bank.bankId }).select("bankId -_id").exec();
            granted.push(bankDetail);
        }
        for(let bank of reqDetails.pending_kyc_access){
            console.log("pending banks1 ", bank);
            const bankDetail = await BankData.findOne({ bankId:bank.bankId }).select("bankId -_id").exec();
            console.log("pending banks ", bankDetail);
            pending.push(bankDetail);
        }
        const requests =  { 'grantedRequests': granted, 'pendingRequests': pending }

        res.status(201).json({requests});

    }catch(err){
        errHandler(err,next);
    }
}


module.exports = { storeUser, getMessage, getUserInfo, getRequests };