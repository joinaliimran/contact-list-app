import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";
import Contacts from "./pages/Contacts/Contacts";
import NotFound from "./pages/NotFound/NotFound";
import { Navigate } from "react-router-dom";

const routes = (isLoggedIn) => [
  {
    path: "/",
    element: isLoggedIn ? <Contacts /> : <Navigate to="/signin" />,
    children: [{ path: "/contacts", element: <Navigate to="/" /> }],
  },
  {
    path: "/signin",
    element: !isLoggedIn ? <Signin /> : <Navigate to="/contacts" />,
  },
  {
    path: "/signup",
    element: !isLoggedIn ? <Signup /> : <Navigate to="/contacts" />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
