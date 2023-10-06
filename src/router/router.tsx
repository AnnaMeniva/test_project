import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { CreatePage } from "../components/Pages/CreatePage/CreatePage";
import ErrorPage from "../components/Pages/ErrorPage/ErrorPage";
import FilesPage, {
  filesAction,
  filesLoader,
} from "../components/Pages/FilesPage/FilesPage";
import LoginPage from "../components/Pages/LoginPage/LoginPage";
import { MainPage } from "../components/Pages/MainPage/MainPage";
import RegisterPage from "../components/Pages/RegisterPage/RegisterPage";
import ViewSitePage, {
  pageAction,
  pageLoader,
} from "../components/Pages/VIewSitePage/ViewSitePage";
import UsersPage, { userLoader } from "../components/Pages/UsersPage/UsersPage";
import ProfilePage, {
  profileLoader,
} from "../components/Pages/ProfilePage/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/pages",
        action: pageAction,
        loader: pageLoader,
        element: <ViewSitePage />,
        // children:[
        //   {
        //     path: "/pages?title={params}",
        //     element:<ViewSitePage/>,
        //     loader: async ({params, request}) => {
        //       const sortData = await fetch(`/pages?title=${params}`)
        //       return sortData
        //     }
        //   }
        // ]
      },

      {
        path: "/create_page",
        element: <CreatePage />,
      },
      {
        path: "/blog_articles",
      },
      {
        path: "/files",
        loader: filesLoader,
        action: filesAction,
        element: <FilesPage limit={5}  />,
      },
      {
        path: "/user/all",
        loader: userLoader,
        element: <UsersPage />,
      },
      {
        path: "/subscriptions",
      },
      {
        path: "/archived_pages",
      },
      {
        path: "/themes",
      },
      {
        path: "/plugins",
      },
      {
        path: "/upgrade_plans",
      },
      {
        path: "/auth/profile",
        element: <ProfilePage />,
        loader: profileLoader,
      },
    ],
  },
  { path: "/user", element: <LoginPage /> },
  { path: "/auth/login", element: <RegisterPage /> },
  { path: "/home", element: <MainPage /> },
]);
