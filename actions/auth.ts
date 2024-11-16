'use server'
import * as sdk from 'node-appwrite'
import { environment } from '@/environment';
import { LoginSchema } from '@/schemas';
import axios from 'axios';
import { z } from 'zod';

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('66ad2c76001c700ba8ae')
    .setKey('df9835b268e3a1f9f64f604b906b92097ac4c982ed68a2b92b2144541abb1c1f84b357c79adf6ee328a9bdcb92711b5ac96a87d3079f712a139034fd35dce5661419bb86c7590ce2d20925e090f88ce0acb8160eb24e22458771c0edba3c87b14a3ed383f9081a494a2972ae9ca79005c34a8de6aab321140383fee7611ca036')
    .setSession('')


type AuthResponse = {
    success: boolean;
    error?: string;
    credentials?: {
        email: string;
        password: string;
    };
  };


  export async function loginUser(formData: z.infer<typeof LoginSchema>): Promise<AuthResponse> {
    try {
        const dbRes = await axios.post(`${environment.apiurl}/user/login`, {
            email: formData.email,
            password: formData.password
        });

        return {
            success: true,
            credentials: {
                email: formData.email,
                password: formData.password
            }
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.response?.data?.message || "An unexpected error occurred",
        };
    }
}