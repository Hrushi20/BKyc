const UsersSchema = require("../../models/Users");
module.exports = class Users {

    static async createUser(data) {

        const user = new UsersSchema({
            username: data.authData.user.name,
            status: data.role === 'user' ? 'noKYC' : '-',
            userId: data.authData.user.sub,
            role: data.role
        });

        await user.save();
    }

    static async getUser(data) {
        return await UsersSchema.findOne({ userId: data.authData.user.sub }).exec();
    }
}