import API from "./Api"
import { companyCreateProjectEndpoint } from './Endpoints'

export const companyCreateProjectApi = (data) => {
   return API.post(`${companyCreateProjectEndpoint}`, data)
} 