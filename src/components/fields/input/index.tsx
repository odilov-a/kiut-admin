import { ChangeEvent } from "react";
import { Input } from "antd";
import { FieldProps } from "formik";

import { User } from "assets/images/icons";

interface IProps extends FieldProps<any, any> {
  placeholder?: string;
  defaultValue?: string;
  name: string;
  size?: "large" | "small";
  label: string;
  myValue: any;
  className?: string;
  rootClassName?: string;
  isLoginPage?: boolean;
  required?: boolean;
  disabled?: boolean;
  type?: "file" | "password" | "text";
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MyInput = (props: IProps) => {
  const {
    field: { value, name },
    placeholder = "Basic Input",
    label,
    form: { setFieldValue, setFieldTouched, touched, errors },
    size = "large",
    className = "",
    rootClassName = "",
    isLoginPage = false,
    required = false,
    type = "text",
    disabled = false,
    onChange = () => {},
  } = props;

  const touchedV = touched[name];
  const hasError = errors[name];
  const touchedError = hasError && touchedV;
  const onBlur = (e: any) => {
    setFieldTouched(name, !!e.target.value);
  };

  return (
    <div className={rootClassName + " input relative"}>
      {label ? (
        <p className="text-[#b59eb3] px-[12px] py-[6px] bg-[#E6ECFE] dark:bg-[#454d70] rounded-[6px] inline-block mb-[12px]">
          {label}
        </p>
      ) : null}
      <Input
        type={type}
        size={size}
        placeholder={placeholder}
        name={name}
        required={required}
        disabled={disabled}
        status={touchedError ? "error" : ""}
        value={value}
        onChange={(e) => {
          setFieldValue(name, e.target.value);
          onChange(e);
        }}
        onBlur={onBlur}
        className={className}
      />
      <p className="mt-[5px] text-[#ff4d4f]">
        {errors[name] && touched[name] ? (
          <span>{errors[name]?.toString() ?? "Error"}</span>
        ) : null}
      </p>
      {isLoginPage && (
        <div className="absolute right-[16px] top-[15px]">
          <User />
        </div>
      )}
    </div>
  );
};

export default MyInput;
