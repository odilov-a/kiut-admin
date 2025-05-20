import { lazy } from "react";
const Test = lazy(() => import("pages/test"));
const User = lazy(() => import("pages/admin"));
const Themes = lazy(() => import("pages/themes"));
const Default = lazy(() => import("pages/default"));
const NotFound = lazy(() => import("pages/notFound"));
const TestUpdate = lazy(() => import("pages/test/update"));

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
    path: "/test",
    key: "test",
    title: "Tests",
    element: <Test />,
  },
  {
    path: "/test/create",
    key: "test-create",
    title: "Add test",
    element: <TestUpdate />,
  },
  {
    path: "/test/update/:id",
    key: "test-update",
    title: "Edit test",
    element: <TestUpdate />,
  },
  {
    path: "/themes",
    key: "themes",
    title: "Themes",
    element: <Themes />,
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
