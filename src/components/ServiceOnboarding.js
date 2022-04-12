import configData from "../config/config.json";
import axios from "axios";

const validateUser = (user) => {
    return true
}

const postUser = async (inputs, func) => {
/*
    const result = await axios.post(configData.ONBOARDING_API_URI + "/register/user", {
        city: inputs.city,
        country: inputs.country,
        email: inputs.email,
        phone_number: inputs.phone_number,
        firstname: inputs.firstname,
        lastname: inputs.lastname,
        street_number: inputs.street_number,
        zip: inputs.zip
    });
    
    */
    const result = await axios.get(configData.ONBOARDING_API_URI + "/userRegisterEntities")   
    console.log(result);
}

export { validateUser, postUser};
