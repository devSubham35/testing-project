import axiosInstance from "..";
import { endpoints } from "../enpoints.api";

// Function for GET request
export const fetchData = async () => {
  try {
    const response = await axiosInstance.get(endpoints?.auth?.register);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

// Function for POST request
export const postData = async (data: {}) => {
  try {
    const response = await axiosInstance.post(endpoints?.auth?.register, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error; // Re-throw the error for handling in the calling function
  }
};
