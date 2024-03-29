import { createBrowserRouter } from "react-router-dom";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import CompanyHomePage from "./Pages/CompanyHomePage/CompanyHomePage";
import CompanySignIn from "./Pages/CompanySignIn";
import AddStaff from "./Pages/CompanyHomePage/AddStaff/AddStaff";
import StaffHomePage from "./Pages/StaffHomePage/StaffHomePage";
import AddTaskPage from "./Pages/CompanyHomePage/AddTaskPage/AddTaskPage";
import CompanyProjects from "./Pages/CompanyHomePage/CompanyProjects/CompanyProjects";
import FormValidation from "./Pages/Testing/FormValidation";

export const appRouters = createBrowserRouter([
    {
        path: "/",
        element: <Signup />
    },
    {
        path: "/:organisationName/signin",
        element: <Signin />
    },
    {
        path: "/:organisationName/admin/signin",
        element: <CompanySignIn />
    },
    {
        path: "/:organisationName/admin/home",
        element: <CompanyHomePage />
    },
    {
        path: "/:organisationName/admin/add-staff",
        element: <AddStaff />
    },
    {
        path: "/:organisationName/admin/add-task",
        element: <AddTaskPage />
    },
    {
        path: "/:organisationName/admin/projects",
        element: <CompanyProjects />
    },
    {
        path: "/:organisationName/home",
        element: <StaffHomePage />
    },
    {
        path: "/testing",
        element: <FormValidation />
    },
    {
        path: "*",
        element: <Signup />
    },
])