import API from "./Api"
import { companyCreateStaffEndpoint, staffSignInEndpoint } from "./Endpoints"

export const companyCreateStaffApi = (data) => {
    return API.post(`${companyCreateStaffEndpoint}`, data)
}

export const getStaffListApi = (subDomain) => {
    return API.get(`/staff/${subDomain}/staff-list`)
}

export const staffSignInApi = (data) => {
    return API.post(`${staffSignInEndpoint}`, data)
}