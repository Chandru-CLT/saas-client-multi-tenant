export const saveLoginToken = (data) => {
    localStorage.setItem("organisationId", data.organisationId)
    localStorage.setItem("organisationName", data.organisationName)
    localStorage.setItem("subDomine", data.subDomine)
    localStorage.setItem("userName", data.userName)
}

export const saveStaffSigninData = (data) => {
    localStorage.setItem("userId", data.userId)
    localStorage.setItem("userName", data.userName)
    localStorage.setItem("organisationName", data.organisationName)

}

export const getUserId = () => {
    return localStorage.getItem("userId");
}

export const getOrganisationName = () => {
    return localStorage.getItem("subDomine");
}

export const clearLocalStorage = () => {
    localStorage.removeItem("organisationId");
    localStorage.removeItem("organisationName");
    localStorage.removeItem("subDomine");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
}