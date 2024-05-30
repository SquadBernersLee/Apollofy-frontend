import axios from "axios";

const baseUrl = "http://localhost:4000/api/user/account/";

export const getUserById = async (userId: number) => {
  try {
    const response = await axios.get(`${baseUrl}${userId}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    throw new Error("Failed to fetch user by ID");
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (err) {
    console.error("Error fetching users:", err);
    throw new Error("Failed to fetch users");
  }
};

export const CreateUser = async () => {
  try {
    const response = await axios.post(baseUrl);
    return response.data;
  } catch (err) {
    console.error("Error creating users:", err);
    throw new Error("Failed to create users");
  }
};

export const UpdateUser = async () => {
  try {
    const response = await axios.patch(`${baseUrl}/3`);
    return response.data;
  } catch (err) {
    console.error("Error updating users:", err);
    throw new Error("Failed to update users");
  }
};

export const DeleteUser = async () => {
  try {
    const response = await axios.delete(`${baseUrl}/3`);
    return response.data;
  } catch (err) {
    console.error("Error deleting users:", err);
    throw new Error("Failed delete users");
  }
};
