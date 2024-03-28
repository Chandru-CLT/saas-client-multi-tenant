import API from "./Api"
import { companyCreateProjectEndpoint } from './Endpoints'

export const companyCreateProjectApi = (data) => {
   return API.post(`${companyCreateProjectEndpoint}`, data)
}

export const projectListApi = (subDomain) => {
   return API.get(`/project/${subDomain}/projectLists`)
}