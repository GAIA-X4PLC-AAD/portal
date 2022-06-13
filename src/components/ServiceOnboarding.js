import configData from "../config/config.json";
import axios from "axios";

const validateUser = (user) => {
    return true
}

const postUser = async (inputs, func) => {
    const result = await axios.get(configData.ONBOARDING_API_URI + "/userRegisterEntities")   
    console.log(result);
}

export { validateUser, postUser};
