import { ChangeEvent } from "react";
import { FieldProps } from "formik";
import ReactQuill from "react-quill";
import cx from "classnames";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
// @ts-ignore
import ImageUploader from "quill-image-uploader";
import axios from "axios";
import { message } from "antd";
import { get } from "lodash";

Quill.register("modules/imageUploader", ImageUploader);
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

const quillModules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  },
  imageUploader: {
    upload: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_ROOT_FILE_UPLOAD}/files/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          message.success("Image uploaded successfully");
          return get(response.data.data, "fileUrl");
        } else {
          message.error("Error loading image");
          throw new Error(response.statusText);
        }
      } catch (error) {
        console.error("Image upload error:", error);
        message.error("Rasm yuklanmadi");
        throw error;
      }
    },
  },
};

const quillFormats = [
  "header", "bold", "italic", "underline", "strike",
  "list", "bullet", "link", "image"
];

const MyInput = (props: IProps) => {
  const {
    field: { value, name },
    placeholder = "Type...",
    label,
    form: { setFieldValue, setFieldTouched, touched, errors },
    className = "",
    rootClassName = "",
    onChange = () => { },
  } = props;

  const onBlur = (e: any) => {
    setFieldTouched(name, !!e.index);
  };

  const classNames = cx("h-[150px] ");

  return (
    <div className={rootClassName + " input relative"}>
      {label ? <p className="py-[6px] inline-block mb-[8px]">{label}</p> : null}
      <ReactQuill
        value={value}
        className={classNames + className}
        onChange={(e: any) => {
          setFieldValue(name, e);
          onChange(e);
        }}
        placeholder={placeholder}
        key={name}
        onBlur={onBlur}
        modules={quillModules}
        formats={quillFormats}
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
