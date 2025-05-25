import { useState } from "react";
import { notification, Tabs } from "antd";
import { Button, Fields } from "components";
import { Field } from "formik";
import { useGet, useHooks } from "hooks";
import Container from "modules/container";
import { utils } from "services";

const { TabPane } = Tabs;

const Update = () => {
  const { get, t, navigate, location, params } = useHooks();
  const [selectedLang, setSelectedLang] = useState("O'z");
  const isUpdate =
    utils.extractBaseUrl(location.pathname) === "/secondments/update";
  const informationId = params.id;

  const { data: informationData } = useGet({
    name: `secondments`,
    url: `/secondments/${informationId}`,
    onSuccess: () => { },
    onError: () => { },
  });

  const data = get(informationData, "data");

  return (
    <div>
      <Container.Form
        url={isUpdate ? `/secondments/${get(data, "_id")}` : "/secondments"}
        name="secondments"
        method={isUpdate ? "put" : "post"}
        fields={[
          {
            type: "string",
            required: true,
            name: "titleUz",
            value: get(data, "titleUz"),
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
            name: "titleRu",
            value: get(data, "titleRu"),
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
            name: "titleEn",
            value: get(data, "titleEn"),
          },
          {
            type: "string",
            required: true,
            name: "descriptionEn",
            value: get(data, "descriptionEn"),
          }
        ]}
        onSuccess={() => {
          navigate("/secondments");
        }}
        onError={(error) => {
          notification.error({
            message: get(error, "errorMessage", t("Something went wrong!")),
            duration: 2,
          });
        }}
      >
        {({ submitForm }) => {
          return (
            <div>
              <div className="content-panel page-heading">
                <p className="page-heading__title">
                  {isUpdate ? t("Update secondment") : t("Create new secondment")}
                </p>
                <div className="page-heading__right gap-2">
                  <Button
                    title={t("Cancel")}
                    className="mr-[20px]"
                    onClick={() => navigate("/secondments")}
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
                      <Field
                        type="text"
                        name="titleUz"
                        label={t("Title (uz)")}
                        component={Fields.Input}
                        placeholder={t("Title (uz)")}
                      />
                      <p className="text-[#9EA3B5] px-[12px] py-[6px] bg-[#E6ECFE] dark:bg-[#454d70] rounded-[6px] inline-block mb-[12px] mr-[10px]">
                        {t("Description (uz)")}
                      </p>
                      <Field
                        name="descriptionUz"
                        className="h-[40vh]"
                        component={Fields.CkeditorImage}
                        placeholder={t("Description (uz)")}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab="Русский" key="Ру">
                    <div>
                      <Field
                        type="text"
                        name="titleRu"
                        label={t("Title (ru)")}
                        component={Fields.Input}
                        placeholder={t("Title (ru)")}
                      />
                      <p className="text-[#9EA3B5] px-[12px] py-[6px] bg-[#E6ECFE] dark:bg-[#454d70] rounded-[6px] inline-block mb-[12px] mr-[10px]">
                        {t("Description (ru)")}
                      </p>
                      <Field
                        name="descriptionRu"
                        className="h-[40vh]"
                        component={Fields.CkeditorImage}
                        placeholder={t("Description (ru)")}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab="English" key="En">
                    <div>
                      <Field
                        type="text"
                        name="titleEn"
                        label={t("Title (en)")}
                        component={Fields.Input}
                        placeholder={t("Title (en)")}
                      />
                      <p className="text-[#9EA3B5] px-[12px] py-[6px] bg-[#E6ECFE] dark:bg-[#454d70] rounded-[6px] inline-block mb-[12px] mr-[10px]">
                        {t("Description (en)")}
                      </p>
                      <Field
                        name="descriptionEn"
                        className="h-[40vh]"
                        component={Fields.CkeditorImage}
                        placeholder={t("Description (en)")}
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