import Home from "./pages/home-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./pages/layout/App-layout";
import Developer from "./pages/developer-page";
import Login from "./pages/login-page";
import Register from "./pages/register-page";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/developer",
        element: <Developer />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
