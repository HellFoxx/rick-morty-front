import axios from "axios";
import { UserSignUpInfoI } from "../types";

export const isUserExists = async (field: string, value: string) => {
    const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/check`, 
        { params: { [field]: value } }
    );
    return result.data as boolean;
}

export const signUpUser = async (body: UserSignUpInfoI) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/user/signup`, body);
}

