import { ChangeEvent } from "react";
import { FieldProps } from "formik";
import TextArea from "antd/es/input/TextArea";

// import cx from "classnames";
// import useStore from "store";

interface IProps extends FieldProps<any, any> {
  placeholder?: string;
  name: string;
  size?: "large" | "small";
  label: string;
  className?: string;
  rootClassName?: string;
  isLoginPage?: boolean;
  required?: boolean;
  rows?: number;
  type?: "file" | "password" | "text";
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MyInput = (props: IProps) => {
  const {
    field: { value, name },
    placeholder = "Textarea",
    label,
    form: { setFieldValue, setFieldTouched, touched, errors },
    size = "large",
    required = false,
    className = "",
    rootClassName = "",
    rows = 5,
    onChange = () => { },
  } = props;

  const touchedV = touched[name];
  const hasError = errors[name];
  const touchedError = hasError && touchedV;
  const onBlur = (e: any) => {
    setFieldTouched(name, !!e.target.value);
  };

  return (
    <div className={rootClassName + " input relative"}>
      {label ? <p className="text-[#9EA3B5] px-[12px] py-[6px] bg-[#fbe6fe] rounded-[6px] inline-block mb-[12px]">{label}</p> : null}
      <TextArea
        size={size}
        placeholder={placeholder}
        name={name}
        required={required}
        rows={rows}
        status={touchedError ? "error" : ""}
        value={value}
        onChange={(e: any) => {
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
    </div>
  );
};

export default MyInput;
