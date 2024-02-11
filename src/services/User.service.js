import { Address } from "../models/Address.model.js";
import { User } from "../models/User.model.js";

export class UserService {
  static async findByUserEmail(email) {
    const exitingUser = await User.findOne({
      where: {
        email: email,
      },
    });
    return exitingUser;
  }

  static async saveUser(userDetails) {
    const {
      firstname,
      lastname,
      email,
      phonenumber,
      avatar,
      city,
      state,
      pinnumber,
      locality,
    } = userDetails;
    const createdNewUser = await User.create(
      {
        firstname,
        lastname,
        email,
        phonenumber,
        Addresses: [
          {
            city,
            state,
            pinnumber,
            locality,
          },
        ],
      },
      {
        include: [Address],
      }
    );
    return createdNewUser;
  }

  static async findByUserId(userId) {
    const userDetails = await User.findByPk(userId, { include: Address });
    return userDetails;
  }
}

export const { findByUserEmail, saveUser,findByUserId} = UserService;
