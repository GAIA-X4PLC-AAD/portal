import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const VR_ROLE = 'gaiax-vr'; // default role
export const PPR_ROLE = 'gaiax-ppr';
export const PCR_ROLE = 'gaiax-pcr';
export const FR_ROLE = 'gaiax-fr';


export function userData() {
  const token = retrieveToken();
  if (token) {
    let dToken = jwtDecode(token, { header: true });

    return {
      user: {
        "first_name": dToken.given_name,
        "family_name": dToken.family_name,
        "email": dToken.email,
        "user_role": retrieveRole(dToken),
        "organization_url": dToken.prWeb,
        "organization_name": dToken.prName,
        "organization_realm": dToken.prRealm
      }
    }
  } else {
    return {
      user: {
        "first_name": null,
        "family_name": null,
        "email": null,
        "user_role": VR_ROLE,
        "organization_url": null,
        "organization_name": null,
        "organization_realm": null
      }
    }
  }
}

function retrieveRole(dToken) {
  let roles = dToken.realm_access.roles;
  
  if (roles.includes("gaiax-fr")) {
    return FR_ROLE;
  } else if (roles.includes("gaiax-ppr")) {
    return PPR_ROLE;
  } else if (roles.includes("gaiax-pcr")) {
    return PCR_ROLE;
  } else {
    return VR_ROLE;
  }
}

export function retrieveToken() {
  return JSON.parse(localStorage.getItem('userJWT'));
}

export function authHeader() {
  const token = retrieveToken();
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }
}

export function removeJWT() {
  localStorage.removeItem("userJWT");
}

export function storeJWT(data) {
  if (data && data.access_token) {
    localStorage.setItem("userJWT", JSON.stringify(data.access_token));
  }
}

export function storeOnboardingJWT(data) {
  if (data && data.access_token) {
    localStorage.setItem("onboardingJWT", data.access_token);
  }
}

export function retrieveOnboardingJWT() {
  return localStorage.getItem('onboardingJWT');
}

export function retrieveAndRemoveOnboardingJWT() {
  const v = retrieveOnboardingJWT();
  removeOnboardingJWT();
  return v;
}

export function removeOnboardingJWT() {
  return localStorage.removeItem('onboardingJWT');
}