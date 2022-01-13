module.exports = class Users {

    static async createUser(data) {

        const user = new UsersSchema({
            username: data.user.name,
            status: data.status,
            userId: data.user.sub,
            role: data.role
        });

        await user.save();
    }

    static async getUser(data) {
        return await UsersSchema.findOne({ userId: data.user.sub }).exec();
    }
}