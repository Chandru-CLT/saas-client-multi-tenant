import API from "./Api";
import { companyCreateTaskEndpoint } from "./Endpoints";

export const companyCreateTaskApi = (data) =>{
    return API.post(`${companyCreateTaskEndpoint}`,data)
}

export const getTaskListApi = (subDomain) => {
    return API.get(`/task/${subDomain}/get-tasklist`)
}

export const getIndiStaffTaskApi = (subDomain, userId) => {
    return API.get(`/task/${subDomain}/get-tasklist/${userId}`)
}