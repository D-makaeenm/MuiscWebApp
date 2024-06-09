import * as React from "react";
import * as ReactDOM from "react-dom/client";
import reportWebVitals from './reportWebVitals';
import "./index.css";
import MainPage from './components/mainpage'
import Signupform from './components/navbar/singupform/signup'
import LoginForm from './components/navbar/loginform/login'
import Upload from './components/upload/upload'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        path: "upload",
        element: <Upload />,
      },
      // Bạn có thể thêm các route con khác tại đây nếu cần
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
