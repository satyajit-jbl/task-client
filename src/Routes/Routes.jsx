import {
  createBrowserRouter,

} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>,
      },
      {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children:[
            {
                path: 'createDonation',
                
            },
            


            //admin routes
            {
                path: 'users',
                
            },
            
        ]
    }
    ]
  },
]);