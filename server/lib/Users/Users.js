const UsersSchema = require("../../models/Users");
const UserData = require("../../models/UserData");
const bankNames = ["Matsuda Bank", "Nabatakkannanbank", "Hiran National Bank", "Lao Huan Yu", "Lianhua Bank", "Zaif Bank", "Nakahay", "Bank of Eureka", "New Bank of China", "Kikuyou Bank", "Bank Warriors", "Konkani Bank Limited", "The People's Bank of China", "Rakuten-Daiy", "Bank of the 21st century", "Nova Scotia Business Bank", "Ajuntament Bank", "Bank Negotiators", "Takara Bank", "WelcomBank", "Dai-Ichi Kinsyu", "Sankt-Pauli-Bank", "Hakushu Bank", "Hanko Bank", "Fun Bank", "Suntan bank", "Jinliao Bank", "The Bank of North Korea", "Citico Bank", "Bank M1", "Jeonheun Bank", "Perceptive Bank", "Bank Symposium", "Bank Light", "Bank Researchers", "Resourceful Bank", "Club Bank", "Bank Aid", "Rewarded Bank", "Clean Bank", "Remedied Bank", "Bank Computations", "Bank Vest", "Bank Mentors", "Bank Revamp", "Bank Tea", "Investigative Bank", "Bank Scholars", "Bank Rings", "Bank Mediators", "Bank Collectors", "Fresh Bank", "Compensatory Bank", "Aggragated Bank", "Bank Lance", "Bank Perceptions", "Bank Excellence", "Bank Made", "Bank Assesments", "Actionable Bank", "Enter Bank", "Objective Bank", "Bank Initiators", "Bank Last", "Dutiful Bank", "Bank Restitution", "Need Bank", "Exemplary Bank", "Bestowed Bank", "Bank Nest", "Rewardinng Bank", "Bank Prodigy", "Bank Fans", "Planned Bank", "Bank Consolidators", "Bank Grace", "Bank Assesors", "Girl Boss Bank", "Bank Tales", "Mathematics Bank", "Bank Compensations", "Bank Brain", "Consolidating Bank", "Maximized Bank", "Bank Dart", "Bank Alcove", "Bank Station", "Shore Bank", "Motivated Bank", "Bank Destination", "Bank Spice", "Optimized Bank", "Enthusiastic Bank", "Bank Hands", "Bank Collective", "Purposeful Bank", "Bank Rally", "Resolved Bank", "Restored Bank", "Bank Chart", "Cutting Edge Bank", "Bank Initiative", "Bank Scout", "Bank Discoveries", "Peaceof Mind Bank", "Bank Cove", "Bank Mediations", "Insightful Bank", "Arena Bank", "Bank Collaborations", "Bank Collaborative", "Bank Dock", "Bank Dish", "Bank Tags", "Bank After", "Bank Crazy", "Smash Bank", "Bank Waves", "Bank Mash", "Bank Soup", "Arden Bank", "Bank Kick", "Bank Theme", "Bank Ivy", "Bank Gods", "Bank Shoot", "Piper Bank", "Bank Mixer", "Bank Raven"]
const min = 0;
const max = bankNames.length - 1;

module.exports = class Users {

    static async createUser(data) {
        
        const user = new UsersSchema({
            username: data.authData.user.name,
            status: data.role === 'user' ? 'noKYC' : '-',
            userId: data.authData.user.sub,
            role: data.role,
            nickname: data.role === 'bank' ? bankNames[Math.floor(Math.random() * (max - min + 1) + min)] : "No Nick Name",
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