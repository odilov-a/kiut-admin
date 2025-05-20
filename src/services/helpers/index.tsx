import { AppstoreOutlined } from "@ant-design/icons";

interface MenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
  route?: string;
}

const menuItems: MenuItem[] = [
  {
    key: "welcome",
    label: "Home",
    icon: <AppstoreOutlined />,
    route: "/",
  },
  {
    key: "informations",
    label: "Informations",
    icon: <AppstoreOutlined />,
    route: "/informations",
  },
  {
    key: "participants",
    label: "Participants",
    icon: <AppstoreOutlined />,
    route: "/participants",
  },
  {
    key: "publications",
    label: "Publications",
    icon: <AppstoreOutlined />,
    route: "/publications",
  },
  {
    key: "secondments",
    label: "Secondments",
    icon: <AppstoreOutlined />,
    route: "/secondments",
  },
];

function gen4() {
  return Math.random()
    .toString(16)
    .slice(-4);
}

export { menuItems, gen4 };
