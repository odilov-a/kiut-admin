import { lazy } from "react";
const User = lazy(() => import("pages/admin"));
const Default = lazy(() => import("pages/default"));
const NotFound = lazy(() => import("pages/notFound"));
const Information = lazy(() => import("pages/information"));
const InformationUpdate = lazy(() => import("pages/information/update"));
const Publication = lazy(() => import("pages/publication"));
const PublicationUpdate = lazy(() => import("pages/publication/update"));
const Secondment = lazy(() => import("pages/secondment"));
const SecondmentUpdate = lazy(() => import("pages/secondment/update"));
const Participant = lazy(() => import("pages/participant"));
const ParticipantUpdate = lazy(() => import("pages/participant/update"));

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
    path: "/publications",
    key: "publications",
    title: "Publications",
    element: <Publication />,
  },
  {
    path: "/publications/create",
    key: "publications-create",
    title: "Publications",
    element: <PublicationUpdate />,
  },
  {
    path: "/publications/update/:id",
    key: "publications-update",
    title: "Publications",
    element: <PublicationUpdate />,
  },
  {
    path: "/secondments",
    key: "secondments",
    title: "Secondments",
    element: <Secondment />,
  },
  {
    path: "/secondments/create",
    key: "secondments-create",
    title: "Secondments",
    element: <SecondmentUpdate />,
  },
  {
    path: "/secondments/update/:id",
    key: "secondments-update",
    title: "Secondments",
    element: <SecondmentUpdate />,
  },
  {
    path: "/participants",
    key: "participants",
    title: "Participants",
    element: <Participant />,
  },
  {
    path: "/participants/create",
    key: "participants-create",
    title: "Participants",
    element: <ParticipantUpdate />,
  },
  {
    path: "/participants/update/:id",
    key: "participants-update",
    title: "Participants",
    element: <ParticipantUpdate />,
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
