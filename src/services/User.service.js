import { Address } from "../models/Address.model.js";
import { User } from "../models/User.model.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { serverError } from "../utils/ErrorHandler.js";

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

  static async uploadAvatars(userId, avatarPath) {
    console.log("avatar path", avatarPath);
    const { avatar: exitedAvatar } = await User.findByPk(userId, {
      attributes: ["avatar"],
    });

    console.log("sssss", exitedAvatar);

    try {
      const __fileName = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__fileName);
      console.log(__dirname);
      const existedAvatarLocalPath = path.join(
        __dirname,
        "..",
        "..",
        "public/images",
        exitedAvatar
      );
      console.log(existedAvatarLocalPath);
      if (exitedAvatar && fs.existsSync(existedAvatarLocalPath)) {
        console.log("avatarLocalPath", existedAvatarLocalPath);
        fs.unlinkSync(existedAvatarLocalPath);
      }
      return path.basename(avatarPath);
    } catch (error) {
      fs.unlinkSync(avatarPath);
      console.log(error);
      return null;
    }
  }

  static async updateAvatar(userId, avatarPath) {
    const exitUser = await User.findByPk(userId);
    if (exitUser) {
      const updateUser = await User.update(
        { avatar: avatarPath },
        {
          where: {
            id: userId,
          },
        }
      );
      return updateUser;
    }
    return null;
  }

  static async fetchedUserProfileDetails(userId) {
    const userDetails = await User.findByPk(userId);
    if (!userDetails) {
      return null;
    }
    try {
      const __fileName = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__fileName);
      const avatarLocalPath = path.join(
        __dirname,
        "..",
        "..",
        "public/images",
        userDetails.avatar
      );
      if (!fs.existsSync(avatarLocalPath)) return null;
      const avatarData = fs.readFileSync(avatarLocalPath, "utf-8");
      const base64Avatar = Buffer.from(avatarData).toString("base64");
      userDetails.avatar = base64Avatar;
      return userDetails;
    } catch (error) {
      console.log("errror in service ", error);
      return null;
    }
  }

  static async deleteAvatarByUserId(userId) {
    try {
      const { avatar: existedAvatar } = await User.findByPk(userId, {
        attributes: ["avatar"],
      });
      console.log("delete", existedAvatar);
      if (existedAvatar) {
        const [rowUpdated, updatedUser] = await User.update(
          { avatar: "" },
          { where: { id: userId } }
        );
        
        if (rowUpdated === 1) {
          const __fileName = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__fileName);
        const existedAvatarLocalURL = path.join(
          __dirname,
          "..",
          "..",
          "public/images",
          existedAvatar
        );
          fs.unlinkSync(existedAvatarLocalURL);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export const {
  findByUserEmail,
  saveUser,
  findByUserId,
  uploadAvatars,
  updateAvatar,
  fetchedUserProfileDetails,
  deleteAvatarByUserId,
} = UserService;
