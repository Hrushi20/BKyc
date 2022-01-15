const UsersSchema = require("../../models/Users");
const UserData = require("../../models/UserData");
module.exports = class Users {

    static async createUser(data) {

        const user = new UsersSchema({
            username: data.authData.user.name,
            status: data.role === 'user' ? 'noKYC' : '-',
            userId: data.authData.user.sub,
            role: data.role
        });

        if(data.role == 'user') {
            const userData = new UserData({
                userId: data.authData.user.sub,
                granted_kyc_access_to: [],
                pending_kyc_access: []
            })

            await userData.save();
        }
        await user.save();
    }

    static async getUser(data) {
        return await UsersSchema.findOne({ userId: data.authData.user.sub }).exec();
    }
}