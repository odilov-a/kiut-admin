import { useState } from "react";
import { notification, Tabs, Select } from "antd";
import { Button, Fields } from "components";
import { Field, FieldProps } from "formik";
import { useGet, useHooks } from "hooks";
import Container from "modules/container";
import { utils } from "services";

const { TabPane } = Tabs;

const Update = () => {
  const { get, t, navigate, location, params } = useHooks();
  const [selectedLang, setSelectedLang] = useState("O'z");
  const isUpdate =
    utils.extractBaseUrl(location.pathname) === "/participants/update";
  const informationId = params.id;

  const { data: informationData } = useGet({
    name: `participants`,
    url: `/participants/${informationId}`,
    onSuccess: () => { },
    onError: () => { },
  });

  const data = get(informationData, "data");

  const { Option } = Select;

  const changePattern = (value: any, setFieldValue: any) => {
    setFieldValue("type", value);
  };

  return (
    <div>
      <Container.Form
        url={isUpdate ? `/participants/${get(data, "_id")}` : "/participants"}
        name="participants"
        method={isUpdate ? "put" : "post"}
        fields={[
          {
            type: "string",
            required: true,
            name: "fullNameUz",
            value: get(data, "fullNameUz"),
          },
          {
            type: "string",
            required: true,
            name: "descriptionUz",
            value: get(data, "descriptionUz"),
          },
          {
            type: "string",
            required: true,
            name: "fullNameRu",
            value: get(data, "fullNameRu"),
          },
          {
            type: "string",
            required: true,
            name: "descriptionRu",
            value: get(data, "descriptionRu"),
          },
          {
            type: "string",
            required: true,
            name: "fullNameEn",
            value: get(data, "fullNameEn"),
          },
          {
            type: "string",
            required: true,
            name: "descriptionEn",
            value: get(data, "descriptionEn"),
          },
          {
            type: "string",
            required: true,
            name: "positionUz",
            value: get(data, "positionUz"),
          },
          {
            type: "string",
            required: true,
            name: "positionRu",
            value: get(data, "positionRu"),
          },
          {
            type: "string",
            required: true,
            name: "positionEn",
            value: get(data, "positionEn"),
          },
          {
            type: "any",
            required: true,
            name: "role",
            value: get(data, "role"),
          },
          {
            type: "any",
            required: true,
            name: "photoUrl",
            value: get(data, "photoUrl"),
          }
        ]}
        onSuccess={() => {
          navigate("/participants");
        }}
        onError={(error) => {
          notification.error({
            message: get(error, "errorMessage", t("Something went wrong!")),
            duration: 2,
          });
        }}
      >
        {({ submitForm, setFieldValue }) => {
          return (
            <div>
              <div className="content-panel page-heading">
                <p className="page-heading__title">
                  {isUpdate ? t("Update participant") : t("Create new participant")}
                </p>
                <div className="page-heading__right gap-2">
                  <Button
                    title={t("Cancel")}
                    className="mr-[20px]"
                    onClick={() => navigate("/participants")}
                  />
                  <Button
                    title={isUpdate ? t("Save") : t("Confirm")}
                    onClick={submitForm}
                  />
                </div>
              </div>
              <div className="content-panel">
                <Tabs
                  activeKey={selectedLang}
                  onChange={(key) => setSelectedLang(key)}
                  type="card"
                >
                  <TabPane tab="O'zbek" key="O'z">
                    <div>
                      <div className="flex gap-2 flex-grid">
                        <Field
                          type="text"
                          name="fullNameUz"
                          label={t("Full name (uz)")}
                          component={Fields.Input}
                          placeholder={t("Full name (uz)")}
                        />
                        <Field
                          type="text"
                          name="positionUz"
                          label={t("Position (uz)")}
                          component={Fields.Input}
                          placeholder={t("Position (uz)")}
                        />
                        <div className="mb-[10px]">
                          <p className="text-[#9EA3B5] px-[12px] py-[6px] bg-[#E6ECFE] dark:bg-[#454d70] rounded-[6px] inline-block mb-[12px] mr-[10px]">
                            {t("Role")}
                          </p>
                          <Field name="role">
                            {({ field, form }: FieldProps) => (
                              <Select
                                className="w-full"
                                defaultValue={get(data, "role")}
                                size={"large"}
                                placeholder={t("Select role")}
                                onChange={(value: any) => {
                                  setFieldValue("role", value);
                                }}
                              >
                                <Option value="Project Managers">{t("Project Managers")}</Option>
                                <Option value="Main performers">{t("Main performers")}</Option>
                                <Option value="Students">{t("Students")}</Option>
                                <Option value="Others">{t("Others")}</Option>
                              </Select>
                            )}
                          </Field>
                        </div>
                      </div>
                      <p className="text-[#9EA3B5] px-[12px] py-[6px] bg-[#E6ECFE] dark:bg-[#454d70] rounded-[6px] inline-block mb-[12px] mr-[10px]">
                        {t("Description (uz)")}
                      </p>
                      <Field
                        name="descriptionUz"
                        className="h-[40vh]"
                        component={Fields.Ckeditor}
                        placeholder={t("Description (uz)")}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab="Русский" key="Ру">
                    <div>
                      <div className="flex gap-2 flex-grid">
                        <Field
                          type="text"
                          name="fullNameRu"
                          label={t("Full name (ru)")}
                          component={Fields.Input}
                          placeholder={t("Full name (ru)")}
                        />
                        <Field
                          type="text"
                          name="positionRu"
                          label={t("Position (ru)")}
                          component={Fields.Input}
                          placeholder={t("Position (ru)")}
                        />
                      </div>
                      <p className="text-[#9EA3B5] px-[12px] py-[6px] bg-[#E6ECFE] dark:bg-[#454d70] rounded-[6px] inline-block mb-[12px] mr-[10px]">
                        {t("Description (ru)")}
                      </p>
                      <Field
                        name="descriptionRu"
                        className="h-[40vh]"
                        component={Fields.Ckeditor}
                        placeholder={t("Description (ru)")}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab="English" key="En">
                    <div>
                      <div className="flex gap-2 flex-grid">
                        <Field
                          type="text"
                          name="fullNameEn"
                          label={t("Full name (en)")}
                          component={Fields.Input}
                          placeholder={t("Full name (en)")}
                        />
                        <Field
                          type="text"
                          name="positionEn"
                          label={t("Position (en)")}
                          component={Fields.Input}
                          placeholder={t("Position (en)")}
                        />
                      </div>
                      <p className="text-[#9EA3B5] px-[12px] py-[6px] bg-[#E6ECFE] dark:bg-[#454d70] rounded-[6px] inline-block mb-[12px] mr-[10px]">
                        {t("Description (en)")}
                      </p>
                      <Field
                        name="descriptionEn"
                        className="h-[40vh]"
                        component={Fields.Ckeditor}
                        placeholder={t("Description (en)")}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab={t("Photo")} key="photo">
                    <div className="mb-[10px]">
                      <p className="text-[#9EA3B5] px-[12px] py-[6px] bg-[#E6ECFE] rounded-[6px] inline-block mb-[12px] mr-[10px]">
                        {t("Photo")}
                      </p>
                      <Field
                        name="photoUrl"
                        component={Fields.FileUpload3}
                      />
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Update;