import { lazy } from "react";
const User = lazy(() => import("pages/admin"));
const Default = lazy(() => import("pages/default"));
const NotFound = lazy(() => import("pages/notFound"));
const Information = lazy(() => import("pages/information"));
const InformationUpdate = lazy(() => import("pages/information/update"));

export interface IRoute {
  path: string;
  key?: string | "*";
  element: JSX.Element;
  inner?: IRoute[];
  index?: boolean;
  title: string;
}

const privateRoutes: IRoute[] = [
  {
    path: "/",
    key: "welcome",
    title: "",
    element: <Default />,
  },
  {
    path: "/profile",
    key: "profile",
    title: "Profile",
    element: <User />,
  },
  {
    path: "/informations",
    key: "informations",
    title: "Informations",
    element: <Information />,
  },
  {
    path: "/informations/create",
    key: "informations-create",
    title: "Informations",
    element: <InformationUpdate />,
  },
  {
    path: "/informations/update/:id",
    key: "informations-update",
    title: "Informations",
    element: <InformationUpdate />,
  },
  {
    path: "*",
    key: "*",
    title: "",
    element: <NotFound />,
  },
];

const publicRoutes: IRoute[] = [
  // {
  //   path: "/login",
  //   access: [],
  //   title: "Login",
  //   element: <Login />,
  // },
];

export { privateRoutes, publicRoutes };
