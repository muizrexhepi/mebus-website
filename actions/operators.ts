// "use server";
// import {  API_KEY, CLINIC_COLLECTION_ID, DATABASE_ID, ENDPOINT, PROJECT_ID } from "@/appwrite.config";
// import { parseStringify } from "@/lib/utils";
// import * as sdk from 'node-appwrite'
// import { z } from "zod";

// const client = new sdk.Client()

// client
// .setEndpoint(ENDPOINT!)
// .setProject(PROJECT_ID!)
// .setKey(API_KEY!)

// const databases = new sdk.Databases(client)
// const users = new sdk.Users(client)

// export const RegisterClinic = async (
//   clinic:  z.infer<typeof ClinicRegisterSchema>,
// ) => {
//   try {
//     const newClinic = await users.create(
//       sdk.ID.unique(),
//       clinic.email!,
//       clinic.contactNumber!,
//       clinic.password!,
//       clinic.name!,
//     );

//     console.log({zi: clinic});
//     const specialties = clinic.specialties.map(specialty => specialty).join(", ");
//     console.log({specialties});

//     const clinicPreferences = {
//       clinicImage: clinic.image || "",
//       location: clinic.location || "",
//       specializations: specialties || "",
//       website: clinic.website || "",
//       description: clinic.description || "",
//       workingHours: clinic.workingHours || "",
//       // services: [],
//       // insuranceAccepted: [],
//       // reviews: [],
//       // averageRating: 0,
//       // licenseNumber: clinic.licenseNumber,
//     };
//     const label = await users.updateLabels(
//       newClinic.$id,
//       [ 'clinic' ]
//   );


//  await users.updatePrefs(
//     newClinic.$id, 
//     clinicPreferences 
// );

//     return parseStringify(newClinic);
//   } catch (error:any) {
//     console.error("An error occurred while creating a new appointment:", error);
//     if(error.response.code==409){
//       return parseStringify({response:{message:'A user with the same id, email, or phone already exists.'}})
//     }
//   }
// };


// export const getClinicDocuments = async (documentId: string) => {
//   try {
//     console.log({documentId})
//     const document = await databases.getDocument(
//       DATABASE_ID!,
//       CLINIC_COLLECTION_ID!,
//       documentId
//     );
//     console.log({ document });
//     return parseStringify(document);
//   } catch (error) {
//     console.error("An error occurred while creating a new appointment:", error);
//   }
// };

// export const getAllClinics = async () => {
//   try {
//     const clinics = await users.list([],'label:clinic')
    
//     console.log({clinics})
//     return parseStringify(clinics);
//   } catch (error) {
//     console.error("An error occurred while creating a new appointment:", error);
//   }
// }

// export const getSingleClinic = async (id:string) => {
//   try {
//     const clinic = await users.get(id)
//     return parseStringify(clinic)
//   } catch (error) {
//     console.error("An error occurred while creating a new appointment:", error);
    
//   }
// } 
