import Login from "../auth/login/Login";
import Signup from "../auth/sign-up/Signup";

export const MainRoutes = [
    {
        path: '/login',
        Component: Login
    },
    {
        path: '/signup',
        Component: Signup
    }
]