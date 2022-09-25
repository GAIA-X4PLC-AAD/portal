import axios from "axios";

const validateUser = (user) => {
    return true
}

const postUser = async (inputs, func) => {
    const result = await axios.get(process.env.REACT_APP_EDGE_API_URI + "/userRegisterEntities")   
    console.log(result);
}

export { validateUser, postUser};
