import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import serviceAccount from "../bed-capstone-project-9bf63-firebase-adminsdk-fbsvc-954756ce24.json"; // Place your service account file here

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const db: Firestore = getFirestore();

export { db };