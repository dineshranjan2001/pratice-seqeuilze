import { findByUserEmail } from "../services/User.service.js";
import {
  allFieldsRequiredError,
  fieldRequiredError,
  fieldValueMismatchError,
  serverError,
  userFound,
} from "../utils/ErrorHandler.js";
import { successHandler } from "../utils/ResponseHandler.js";

export class UserController {
  static async createUser(request, response) {
    //1. get user from request
    const { firstname, lastname, email, phonenumber, avatar } = request.body;

    // 2. validate the get user
    if (firstname.match(/^[a-zA-Z\s]+$/)) {
      await fieldValueMismatchError(response, firstname);
    } else if (!firstname) {
      await fieldRequiredError(response, firstname);
    } else if (lastname.match(/^[a-zA-Z]+$/)) {
      await fieldValueMismatchError(response, lastname);
    } else if (!lastname) {
      await fieldRequiredError(response, lastname);
    } else if (email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/)) {
      await fieldValueMismatchError(response, email);
    } else if (!email) {
      await fieldRequiredError(response, email);
    } else if (phonenumber.match(/^[\\d]{10}$/)) {
      await fieldValueMismatchError(response, phonenumber);
    } else if (!phonenumber) {
      await fieldRequiredError(response, phonenumber);
    } else if (!(firstname && lastname && email && phonenumber)) {
      await allFieldsRequiredError(response);
    }
    try {
      // 3. check the user is exit or not
      const exitingUser = await findByUserEmail(email);
      if (exitingUser) {
        await userFound(response);
      }
      // 4. create the user
      const saveUser = await this.createUser(request.body);
      if (!saveUser) {
        await userNotSave(response);
      }
      // 5. return the response
      await successHandler(response, saveUser);
    } catch (error) {
      await serverError(response, error);
    }
  }
}


export const {createUser}=UserController;