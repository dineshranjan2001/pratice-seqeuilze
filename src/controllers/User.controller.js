import { UserService, findByUserEmail, findByUserId } from "../services/User.service.js";

import {
  InValidError,
  UserNotFound,
  allFieldsRequiredError,
  fieldRequiredError,
  fieldValueMismatchError,
  serverError,
  userFound,
} from "../utils/ErrorHandler.js";
import { successHandler, successRetrivedHandler } from "../utils/ResponseHandler.js";

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
        await successHandler(response, saveUser);
      } catch (error) {
        await serverError(response, error);
      }
    }
  }

  static async findById(request,response){
    // get id from the request
    const {userId}=request.params;
    console.log(userId);
    // validate the id
    if(!userId){
       await InValidError(response,"id");
       return;
    }
    // find the user
    const getUserDetails=await findByUserId(userId);
    // validate the user
    if(!getUserDetails){
      await UserNotFound(response);
      return;
    }
    // return the response
    await successRetrivedHandler(response,getUserDetails);
  }
}


export const { createUser,findById} = UserController;
