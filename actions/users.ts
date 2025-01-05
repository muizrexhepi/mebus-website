"use server";
import * as sdk from 'node-appwrite'
import { parseStringify } from "@/lib/utils";
import axios from 'axios'


const client = new sdk.Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
  .setKey(process.env.NEXT_APPWRITE_KEY)
  .setSession('')

const users = new sdk.Users(client);
const account = new sdk.Account(client)

declare interface CreateUserParams {
  name: string;
  email: string;
  password: string | null;
}

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/create/db`, {
      name: user.name,
      email: user.email,
      password: user.password

    })

    console.log({ newUser })

    return parseStringify(newUser?.data?.data);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const existingUser = await account.listIdentities()
      if (existingUser) {

        return { error: 'Email already exists!' };
      }
    }
    console.error("An error occurred while creating a new user:", error);
  }
};


export const getUserBalance = async (userId: string) => {
  try {
    const accountBalance = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}?select=balance_in_cents`
    );
    return accountBalance.data.data.balance_in_cents;
  } catch (error) {
    console.error(error)
  }
}

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(
      userId
    );
    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

export const deleteUser = async (userId: string) => {
  try {
    if (userId) {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/delete/${userId}`);
    } else {
      console.error("User ID is missing or user is not found.");
    }
  } catch (error) {
    console.error("An error occurred while deleting the user:", error);
  }
}