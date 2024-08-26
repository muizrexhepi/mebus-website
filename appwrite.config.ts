// import * as sdk from 'node-appwrite'

export const { 
    PROJECT_ID, API_KEY,
    DATABASE_ID,CLINIC_COLLECTION_ID,DOCTOR_COLLECTION_ID,
    NEXT_PUBLIC_ENDPOINT:ENDPOINT
} = process.env;

// const client = new sdk.Client()

// client
// .setEndpoint(ENDPOINT!)
// .setProject(PROJECT_ID!)
// .setKey(API_KEY!)
// .setSession('')

// export const databases = new sdk.Databases(client)
// export const storage = new sdk.Storage(client)
// export const messaging = new sdk.Messaging(client)
// export const users = new sdk.Users(client)
// export const account = new sdk.Account(client)
import { Client, Account, Databases } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('66ccea4d0006b240505c'); 

const account = new Account(client);
const databases = new Databases(client);

export { account,databases, client}