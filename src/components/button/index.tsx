import { Button } from "antd";

interface IProps {
  title: string;
  size?: "large" | "small";
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  htmlType?: "button" | "submit" | "reset";
  icon?: any;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const MyButton = (props: IProps) => {
  const {
    title = "Button",
    size = "large",
    className = "",
    isLoading = false,
    disabled = false,
    htmlType = "button",
    onClick = () => {},
    icon = null,
  } = props;
  return (
    <div>
      <Button
        disabled={disabled}
        onClick={onClick}
        icon={icon}
        size={size}
        htmlType={htmlType}
        loading={isLoading}
        className="w-full bg-[#0096db] border-[#0096db] hover:bg-[#e486c2] hover:border-[#e486c2]"
        style={{
          backgroundColor: disabled ? "#0096db" : "#0096db",
          borderColor: disabled ? "#0096db" : "#0096db",
          color: "#fbe6fe",
        }}
      >
        {title}
      </Button>
    </div>
  );
};

export default MyButton;
