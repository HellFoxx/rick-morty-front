import SignUp from './components/forms/signUp/SignUp';
import SignIn from './components/forms/signIn/SignIn';
import { ROUTES } from './consts';
import Home from './components/home/Home';
import Characters from './components/characters/Characters';
import CharacterPage from './components/characters/characterPage/CharacterPage';

interface RouteItemI {
  path: string;
  Element: React.FunctionComponent;
}

const { PUBLIC, AUTH } = ROUTES;

export const authRoutes: RouteItemI[] = [
  {
    path: AUTH.HOME,
    Element: Home
  },
  {
    path: AUTH.CHARACTERS,
    Element: Characters
  },
  {
    path: AUTH.CHARACTER,
    Element: CharacterPage
  }
];

export const publicRoutes: RouteItemI[] = [
  {
    path: PUBLIC.SIGN_UP,
    Element: SignUp
  },
  {
    path: PUBLIC.SIGN_IN,
    Element: SignIn
  }
];
