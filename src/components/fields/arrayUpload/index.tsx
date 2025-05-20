import { useState, useEffect } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal, Upload, message, Button } from "antd";
import type { UploadFile, UploadProps } from "antd";
import type { FieldProps } from "formik";
import axios from "axios";
import { useHooks } from "hooks";
import { storage } from "services";

type FileType = File;

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface FileUploadProps extends FieldProps<any, any> {
  label?: string;
  multiple?: boolean;
}

const ArrayUpload = ({ field, form, label, multiple = false }: FileUploadProps) => {
  const { get } = useHooks();
  const token = localStorage.getItem("token");
  const isDark = storage.get("theme") !== "light";
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Agar update holatida mavjud initial URL lar bo'lsa, ularni faqat bir marta o'rnating.
  useEffect(() => {
    if (field.value && Array.isArray(field.value) && field.value.length > 0) {
      // Faqat fileList hali bo'sh bo'lsa, initial qiymatlarni o'rnating.
      if (fileList.length === 0) {
        const initialFiles = field.value.map((url: string, index: number) => ({
          uid: `-initial-${index}`,
          name: url.substring(url.lastIndexOf("/") + 1),
          status: "done" as "done",
          url: url,
          response: { data: { fileUrl: url } },
        }));
        setFileList(initialFiles);
      }
    }
  }, [field.value]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url?.substring(file.url.lastIndexOf("/") + 1) || ""
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const uploadedUrls = newFileList
      .filter(file => file.status === "done" && file.response?.data?.fileUrl)
      .map(file => file.response.data.fileUrl);
    form.setFieldValue(field.name, uploadedUrls);
  };

  const handleRemove = (fileUid: string) => {
    const newList = fileList.filter(file => file.uid !== fileUid);
    setFileList(newList);
    const uploadedUrls = newList
      .filter(file => file.status === "done" && file.response?.data?.fileUrl)
      .map(file => file.response.data.fileUrl);
    form.setFieldValue(field.name, uploadedUrls);
  };

  const beforeUpload = (file: File): boolean => {
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "text/plain",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ];
    const isValidType = allowedTypes.includes(file.type);
    if (!isValidType) {
      message.error(
        "Only PNG, JPEG, JPG, TXT, DOC, PDF, PPT, and XLS files are allowed."
      );
    }
    return isValidType;
  };

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        `${process.env.REACT_APP_ROOT_FILE_UPLOAD}/files/upload`,
        formData,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      if (response.status === 200) {
        message.success("File uploaded successfully");
        onSuccess(response.data, file);
      } else {
        message.error("File upload failed");
        onError(response.statusText);
      }
    } catch (error) {
      console.error("File upload error:", error);
      message.error("File upload failed");
      onError(error || "File upload failed");
    }
  };

  const uploadButton = (
    <div style={{ textAlign: "center" }}>
      <PlusOutlined style={isDark ? { color: "#9EA3B5", fontSize: "24px" } : { fontSize: "24px" }} />
      <div style={{ marginTop: 8, color: isDark ? "#9EA3B5" : "#000" }}>Upload</div>
    </div>
  );

  return (
    <>
      {label && <label>{label}</label>}
      <Upload
        listType="picture-card"
        multiple={multiple}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={customRequest}
        beforeUpload={beforeUpload}
      >
        {(multiple || fileList.length < 1) && uploadButton}
      </Upload>
      {fileList.length > 0 && (
        <div style={{ marginTop: 8 }}>
          {fileList.map(file => (
            <div
              key={file.uid}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 4,
                padding: 4,
                border: "1px solid #f0f0f0",
                borderRadius: 4,
              }}
            >
              <span style={{ flex: 1 }}>{file.name}</span>
              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleRemove(file.uid)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ArrayUpload;