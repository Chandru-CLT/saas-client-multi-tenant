import { createBrowserRouter } from "react-router-dom";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import ViewTicket from "./Pages/ViewTicket";
import CompanyHomePage from "./Pages/CompanyHomePage";

export const appRouters = createBrowserRouter([
    {
        path:"/",
        element: <Signup />
    },
    {
        path:"/signin",
        element: <Signin />
    },
    {
        path: "/:company-name",
        element: <CompanyHomePage />
    },
    {
        path:"/viewticket",
        element: <ViewTicket />
    },
    {
        path: "*",
        element: <Signin />
    },
])