import { Spin, notification } from "antd";
import { Field } from "formik";
import { useHooks } from "hooks";
import { Container } from "modules";
import { Fields, Button } from "components";

const Themes = ({ showCreateModal, createModal }: any): JSX.Element => {
  const { t, get } = useHooks();
  const data = createModal.data || {};

  return (
    <div>
      <Container.Form
        url={data._id ? `/themes/${get(data, "_id")}` : "/themes"}
        method={data._id ? "put" : "post"}
        name="themes"
        fields={[
          {
            type: "string",
            required: true,
            name: "title",
            value: get(data, "title"),
          },
          {
            type: "any",
            required: true,
            name: "group",
            value: get(data, "group"),
          },
          {
            type: "string",
            required: true,
            name: "description",
            value: get(data, "description"),
          },
          {
            type: "array",
            required: true,
            name: "photoUrl",
            value: get(data, "photoUrl", []),
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["themes"] });
          resetForm();
          showCreateModal(false);
        }}
        onError={(error) => {
          notification.error({
            message: error.response?.data?.message || t("Something went wrong"),
            duration: 5,
          });
        }}
      >
        {({ isLoading, setFieldValue }) => (
          <Spin spinning={isLoading} tip={t("Verifying")}>
            <div className="mt-5">
              <div className="flex">
                <Field
                  required
                  name="title"
                  label={t("Title")}
                  placeholder={t("Title")}
                  component={Fields.Input}
                  rootClassName="mb-[10px] w-full"
                />
                <Field
                  required
                  name="group"
                  isMulti={true}
                  url="/groups"
                  optionValue="_id"
                  optionLabel="name"
                  label={t("Group")}
                  placeholder={t("Group")}
                  component={Fields.AsyncSelect}
                  rootClassName="mb-[10px] ml-[10px] w-full"
                  onChange={(value: any) => {
                    setFieldValue("group", value);
                  }}
                />
              </div>
              <Field
                required
                rows={4}
                name="description"
                component={Fields.Textarea}
                label={t("Description")}
                placeholder={t("Description")}
              />
              <div className="mb-[10px]">
                <p className="text-[#9EA3B5] px-[12px] py-[6px] bg-[#fbe6fe] rounded-[6px] inline-block mb-[12px] mr-[10px]">
                  {t("Photo")}
                </p>
                <Field
                  name="photoUrl"
                  type="upload"
                  multiple={true}
                  component={Fields.ArrayUpload}
                />
              </div>
              <Button size="large" title={t("Save")} htmlType="submit" />
            </div>
          </Spin>
        )}
      </Container.Form>
    </div>
  );
};

export default Themes;
