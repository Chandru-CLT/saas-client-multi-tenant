import API from "./Api"
import { companyCreateStaffEndpoint } from "./Endpoints"

export const companyCreateStaffApi = (data) => {
    return API.post(`${companyCreateStaffEndpoint}`, data)
}
