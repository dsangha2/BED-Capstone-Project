import { db } from "../../../../config/firebaseConfig";
import { User } from "../models/userModel";

const USERS_COLLECTION = "users";

export const findAllUsers = async (): Promise<User[]> => {
  const snapshot = await db.collection(USERS_COLLECTION).get();
  const users: User[] = [];
  snapshot.forEach(doc => {
    users.push({ id: doc.id, ...(doc.data() as User) });
  });
  return users;
};

export const createUser = async (userData: Omit<User, "id">): Promise<string> => {
  const docRef = await db.collection(USERS_COLLECTION).add(userData);
  return docRef.id;
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<void> => {
  await db.collection(USERS_COLLECTION).doc(id).update(userData);
};

export const deleteUser = async (id: string): Promise<void> => {
  await db.collection(USERS_COLLECTION).doc(id).delete();
};