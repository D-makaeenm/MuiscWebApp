import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Navigate } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import "./index.css";
import MainPage from './components/mainpage';
import Signupform from './components/navbar/singupform/signup';
import LoginForm from './components/navbar/loginform/login';
import Upload from './components/upload/upload';
import Homepage from "./components/homePage/homepage";
import Library from "./components/library/library";
import Lastest from "./components/lastest/lastest";
import App from './App'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home/homepage" />,
  },
  {
    path: "/home",
    element: <MainPage />,
    children: [
      {
        path: "upload",
        element: <Upload />,
      },
      {
        path: "homepage",
        element: <Homepage />,
      },
      {
        path: "library",
        element: <Library/>,
      },
      {
        path: "playlist",
        element: <h1>playlist</h1>,
      },
      {
        path: "song_newest",
        element: <Lastest />,
      },
      {
        path: "topic",
        element: <h1>topic</h1>,
      },
    ],
  },
  {
    path: "signin",
    element: <LoginForm />,
  },
  {
    path: "signup",
    element: <Signupform />,
  },
  {
    path: "yasuo/yamero",
    element: <h1>Yasuo</h1>,
  },
  {
    path: "test",
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

reportWebVitals();
