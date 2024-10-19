declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_BASE_URL: string;
    NEXT_PUBLIC_APPWRITE_ENDPOINT: string;
    NEXT_PUBLIC_APPWRITE_PROJECT_ID: string;
    APPWRITE_COLLECTION_ID: string;
    APPWRITE_DATABASE_ID: string;
    APPWRITE_API_KEY: string;
    RESEND_API_KEY: string;
    RESEND_AUDIENCE_ID: string;
  }
}
