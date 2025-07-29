/* eslint-disable no-console */
import { envVars } from "../config/env";
import { IAuthProivder, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcryptjs from "bcryptjs"

export const seedSuperAdmin = async () => {
    try {
        const isSuperAdmin = await User.findOne({email: envVars.SUPER_ADMIN_EMAIL})
        
        if(isSuperAdmin){
            console.log("Super Admin already exist")
            return;
        }
        console.log("Trying to create  super admin...");
        

        const hashPassword = await bcryptjs.hash(envVars.SUPER_ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUND));

        const authProvider : IAuthProivder = {
            provider: "credentials",
            providerId: envVars.SUPER_ADMIN_EMAIL
        };

        const payload : IUser = {
            name: "Super Admin",
            role: Role.SUPER_ADMIN,
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hashPassword,
            isVerified: true,
            auths: [authProvider]
        }

        const superAdmin = await User.create(payload);
        console.log("Super Admin created successfully! \n");
        console.log(superAdmin);
        
    } catch (error) {
        console.log(error);   
    }
}