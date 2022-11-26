import SignUp from "./components/forms/signUp/SignUp"
import SignIn from './components/forms/signIn/SignIn'
import { ROUTES } from "./consts"
import Home from "./components/home/Home";

interface RouteItemI {
    path: string,
    Element: React.FunctionComponent,
}

const { PUBLIC, AUTH } = ROUTES;

export const authRoutes: RouteItemI[] = [
    {
        path: AUTH.HOME,
        Element: Home,
    },
]

export const publicRoutes: RouteItemI[] = [
    {
        path: PUBLIC.SIGN_UP,
        Element: SignUp
    },
    {
        path: PUBLIC.SIGN_IN,
        Element: SignIn
    }
]