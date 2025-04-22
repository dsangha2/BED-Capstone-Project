import * as admin from "firebase-admin";
import serviceAccount from "../bed-capstone-project-9bf63-firebase-adminsdk-fbsvc-954756ce24.json";
import { Auth } from "node_modules/firebase-admin/lib/auth/auth";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const auth: Auth = admin.auth();
const db = admin.firestore();

export { auth, db };