"use server";
import * as sdk from 'node-appwrite'
import { parseStringify } from "@/lib/utils";
import { ID } from "appwrite";

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('66ad2c76001c700ba8ae')
    .setKey('fceadf8d26aae7813ac32f3e7ee19d36ef954f36132a4212e38cf642707d055d75d84637bb91db820e1ce08c14725b94a9a100ef73b6f34a2a3e019f2051a8e5c7725ee992df97bbd2e194686f61adae1742eb793e2eb8428eedf3f903e78625398e4d7249547921c8f4fa10f0085a33c2a94ebfb1c43bd90df426be68ef53b9')

    const users = new sdk.Users(client);
    const account = new sdk.Account(client)

declare interface CreateUserParams {
    name: string;
    email: string;
    password: string;
  }

export const createUser = async (user: CreateUserParams) => {
  try {
    console.log({user:user})
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    
    return parseStringify(newAccount);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const existingUser = await account.listIdentities()
      console.log({existingUser})
      if(existingUser){

        return {error:'Email already exists!'};
      }
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

export const getUser = async () => {
  try {
    const user = await account.get();

    return user;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

export const deleteUser = async (userId:string) => { 
  try {
    if (userId) {
      const result = await users.delete(userId);
      console.log(result);
    } else {
      console.error("User ID is missing or user is not found.");
    }
  } catch (error) {
    console.error("An error occurred while deleting the user:", error);
  }
}