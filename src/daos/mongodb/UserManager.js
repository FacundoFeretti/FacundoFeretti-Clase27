import userModel from "./models/user.model.js"

export const loginUser = async (email) => {
    let userForRole = await userModel.findOne({email: email}) 
    return userForRole
}