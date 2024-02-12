import {
  UserService,
  deleteAvatarByUserId,
  fetchedUserProfileDetails,
  findByUserEmail,
  findByUserId,
  updateAvatar,
  uploadAvatars,
} from "../services/User.service.js";

import {
  DataNotDeleteError,
  FileUploadError,
  InValidError,
  UserNotFound,
  allFieldsRequiredError,
  fieldRequiredError,
  fieldValueMismatchError,
  serverError,
  userFound,
} from "../utils/ErrorHandler.js";
import {
  successDeleteHandler,
  successFileUpdateHandler,
  successFileUploadHandler,
  successRetrivedHandler,
  successSaveHandler,
} from "../utils/ResponseHandler.js";

import Validators from "../utils/Validators.js";

export class UserController {
  static async createUser(request, response) {
    // 2. validate the get user
    const [status, fieldName, errorType] = Validators(request.body);
    if (status && errorType === "required") {
      await allFieldsRequiredError(response);
      return;
    } else if (status && errorType === "missmatched") {
      await fieldValueMismatchError(response, fieldName);
      return;
    } else if (status && errorType === "invalid") {
      await fieldRequiredError(response, fieldName);
      return;
    } else {
      try {
        // 3. check the user is exit or not
        const exitingUser = await findByUserEmail(email);
        if (exitingUser) {
          await userFound(response);
          return;
        }
        // 4. create the user
        const saveUser = await UserService.saveUser(request.body);
        if (!saveUser) {
          await userNotSave(response);
          return;
        }
        // 5. return the response
        await successSaveHandler(response, saveUser);
      } catch (error) {
        await serverError(response, error);
      }
    }
  }

  static async findById(request, response) {
    // get id from the request
    const { userId } = request.params;
    console.log(userId);
    // validate the id
    if (!userId) {
      await InValidError(response, "id");
      return;
    }
    // find the user
    const getUserDetails = await findByUserId(userId);
    // validate the user
    if (!getUserDetails) {
      await UserNotFound(response);
      return;
    }
    // return the response
    await successRetrivedHandler(response, getUserDetails);
  }

  static async uploadAvatar(request, response) {
    // get avatar from request
    const avatarLocalPath = request.file?.path;
    const { userId } = request.params;
    if (!userId) {
      await InValidError(response, "id");
      return;
    }
    // validate the avatar
    if (!avatarLocalPath) {
      await fieldRequiredError(response, "avatar");
      return;
    }
    // upload the avatar
    const uploadedAvatarURL = await uploadAvatars(userId, avatarLocalPath);
    console.log(uploadedAvatarURL);
    // validate the uploaded avatar and save the path into database
    if (!uploadedAvatarURL) {
      await FileUploadError(response);
      return;
    }
    const user = await updateAvatar(userId, uploadedAvatarURL);
    if (!user) {
      await FileUploadError(response);
      return;
    }
    // return the response
    request.method === "POST"
      ? await successFileUploadHandler(response, user)
      : await successFileUpdateHandler(response, user);
  }

  static async deleteAvatar(request,response){
    // get the userid from the request
    const {userId}=request.params;
    // validate the userid
    if(!userId){
      await InValidError(response);
      return;
    }
    // delete the avatar of the user
    const deleteAvatarStatus=await deleteAvatarByUserId(userId);
    // validate the request
    if(!deleteAvatarStatus){
      await DataNotDeleteError(response);
      return;
    }
    // return the response
    await successDeleteHandler(response,{});
  }

  static async fetchedProfileDetails(request, response) {
    // get the userId from the request;
    const { userId } = request.params;
    // validate the userId;
    if (!userId) {
      await InValidError(response, "id");
      return;
    }
    // fetched the data;
    const userProfileDetails = await fetchedUserProfileDetails(userId);
    // validate the fected data;
    if (!userProfileDetails) {
      await UserNotFound(response);
      return;
    }
    // return the response
    await successRetrivedHandler(response, userProfileDetails);
  }
}
export const { createUser, findById, uploadAvatar,deleteAvatar, fetchedProfileDetails } =
  UserController;
