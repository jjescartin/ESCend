import api from "axios";
import {RegisterFormDetails} from "../Interface/Auth"

export const registerUser = async (payload: RegisterFormDetails) => {
  try {
    const res = await api.post("/api/register", payload);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};
