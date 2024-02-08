import { User } from "../models/User.model.js";

export class UserService{
    static async findByUserEmail(email){
        const exitingUser=await User.findOne({
            where:{
                email:email
            }
        });
        return exitingUser;
    }
}

export const {findByUserEmail}=UserService;