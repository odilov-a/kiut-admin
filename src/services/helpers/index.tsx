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
    key: "test",
    label: "Tests",
    icon: <AppstoreOutlined />,
    route: "/test",
  },
  {
    key: "themes",
    label: "Themes",
    icon: <AppstoreOutlined />,
    route: "/themes",
  },
];

function gen4() {
  return Math.random()
    .toString(16)
    .slice(-4);
}

export { menuItems, gen4 };
