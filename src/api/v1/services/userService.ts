import { User } from "../models/userModel";
import * as userRepository from "../repositories/userRepository";

export const fetchAllUsers = async (): Promise<User[]> => {
  return await userRepository.findAllUsers();
};

export const addUser = async (userData: Omit<User, "id">): Promise<string> => {
  return await userRepository.createUser(userData);
};

export const modifyUser = async (id: string, userData: Partial<User>): Promise<void> => {
  await userRepository.updateUser(id, userData);
};

export const removeUser = async (id: string): Promise<void> => {
  await userRepository.deleteUser(id);
};