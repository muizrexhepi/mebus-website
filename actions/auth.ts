'use server'
import * as sdk from 'node-appwrite'
import { environment } from '@/environment';
import { LoginSchema } from '@/schemas';
import axios from 'axios';
import { z } from 'zod';

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject(environment.APPWRITE_PROJECT_ID)
    .setKey(environment.APPWRITE_API_KEY)
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