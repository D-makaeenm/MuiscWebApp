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
import Playlist from "./components/playlist/playlist";
import AddPlaylist from "./components/playlist/addplaylist/addplaylist";
import PlaylistDetail from "./components/playlist/playlist_route/playlist_route";
import AddSongtoPlaylist from "./components/playlist/add_song_to_playlist/addsong";
import Chude from "./components/topic/chude";
import Addtopic from "./components/topic/add_topic/add_topic";
import ChudeDetail from "./components/topic/chudeDetail/chudeDetail";
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
        element: <Playlist />,
      },
      {
        path: "playlist/addplaylist",
        element: <AddPlaylist  />,
      },
      {
        path: "song_newest",
        element: <Lastest />,
      },
      {
        path: "topic",
        element: <Chude />,
      },
      {
        path: "playlist/:playlistId",
        element: <PlaylistDetail />,
      },
      {
        path: "playlist/add_music",
        element: <AddSongtoPlaylist />,
      },
      {
        path: "chude/:chudeId",
        element: <ChudeDetail />,
      },
      {
        path: "/home/topic/add_chude",
        element: <Addtopic />,
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
    path: "test",
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

reportWebVitals();
