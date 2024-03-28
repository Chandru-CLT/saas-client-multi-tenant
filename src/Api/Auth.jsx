import API from "./Api"
import { companySignupEndpoint, companySigninEndpoint } from "./Endpoints"

export const companySignupApi = (data) => {
    return API.post(`${companySignupEndpoint}`, data)
}

export const companySigninApi = (data) => {
    return API.post(`${companySigninEndpoint}`, data)
}