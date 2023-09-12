import jwt from 'jsonwebtoken';
import { loginUser } from "../daos/mongodb/UserManager.js";

export const loginUserService = async (email) => {
    let userForRole = await loginUser(email);
    let token = jwt.sign({email: email, role: userForRole.role}, 'secret', {expiresIn: '24h'});
    return token
}