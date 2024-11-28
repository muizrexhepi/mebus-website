
import { Client, Account, Databases } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT); 

const account = new Account(client);
const databases = new Databases(client);

export { account, databases, client}