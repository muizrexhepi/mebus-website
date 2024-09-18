"use server";
import * as sdk from 'node-appwrite'
import { parseStringify } from "@/lib/utils";
import axios from 'axios'
import { environment } from '@/environment';

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('66ad2c76001c700ba8ae')
    .setKey('df9835b268e3a1f9f64f604b906b92097ac4c982ed68a2b92b2144541abb1c1f84b357c79adf6ee328a9bdcb92711b5ac96a87d3079f712a139034fd35dce5661419bb86c7590ce2d20925e090f88ce0acb8160eb24e22458771c0edba3c87b14a3ed383f9081a494a2972ae9ca79005c34a8de6aab321140383fee7611ca036')
    .setSession('')

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
    const newUser = await axios.post(`${environment.apiurl}/user/create/db`,{
      name:user.name,
      email:user.email,
      password:user.password

    })
    console.log({useriRi:newUser.data.data})

      
    return parseStringify(newUser?.data?.data);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const existingUser = await account.listIdentities()
      if(existingUser){

        return {error:'Email already exists!'};
      }
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

export const getUserBalance = async (userId: string ) => {
  try {
    const accountBalance = await axios.get(
      `${environment.apiurl}/user/${userId}?select=balance_in_cents`
    );
    return accountBalance.data.data.balance_in_cents;
  } catch (error) {
    console.log(error)
  }
}

export const getUser = async (userId:string) => {
  try {
    const user = await users.get(
      userId 
  );
    console.log({useri:user})
    return parseStringify(user);
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