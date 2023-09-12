import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { CreatePage } from "../components/Pages/CreatePage/CreatePage";
import ErrorPage from "../components/Pages/ErrorPage/ErrorPage";
import FilesPage from "../components/Pages/FilesPage/FilesPage";
import LoginPage from "../components/Pages/LoginPage/LoginPage";
import { MainPage } from "../components/Pages/MainPage/MainPage";
import RegisterPage from "../components/Pages/RegisterPage/RegisterPage";
import ViewSitePage, { pageAction, pageLoader } from "../components/Pages/VIewSitePage/ViewSitePage";


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
        element: <FilesPage />,
      },
      {
        path: "/users",
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
    ],
  },
  { path: "/user", element: <LoginPage /> },
  { path: "/auth/login", element: <RegisterPage /> },
  { path: "/home", element: <MainPage /> },
]);
