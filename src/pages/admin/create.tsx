import { Spin, notification } from "antd";
import { Field } from "formik";
import { useHooks } from "hooks";
import { Container } from "modules";
import { Fields, Button } from "components";

const User = ({ showEditModal, selectedCard }: any): JSX.Element => {
  const { get, t } = useHooks();
  return (
    <div>
      <Container.Form
        url="/admins/update-teacher"
        name="admins"
        method="put"
        fields={[
          {
            type: "string",
            required: true,
            name: "firstName",
            value: get(selectedCard, "firstName"),
          },
          {
            type: "string",
            required: true,
            name: "lastName",
            value: get(selectedCard, "lastName"),
          },
          {
            type: "string",
            name: "password",
          },
          {
            type: "string",
            required: true,
            name: "username",
            value: get(selectedCard, "username"),
          },
          {
            name: "phoneNumber",
            value: get(selectedCard, "phoneNumber"),
          },
          {
            type: "any",
            name: "photoUrl",
            value: get(selectedCard, "photoUrl"),
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["admins"] });
          resetForm();
          showEditModal(false);
        }}
        onError={(error) => {
          notification.error({
            message: error.response?.data?.message || t("Something went wrong"),
            duration: 5,
          });
        }}
      >
        {({ isLoading }) => {
          return (
            <Spin spinning={isLoading} tip={t("Verifying")}>
              <div>
                <div className="flex">
                  <Field
                    type="text"
                    name="firstName"
                    label={t("First name")}
                    component={Fields.Input}
                    rootClassName="mr-[10px]"
                    placeholder={t("First name")}
                  />
                  <Field
                    type="text"
                    name="lastName"
                    label={t("Last name")}
                    component={Fields.Input}
                    placeholder={t("Last name")}
                  />
                </div>
                <div className="flex">
                  <Field
                    type="text"
                    name="username"
                    label={t("Username")}
                    component={Fields.Input}
                    placeholder={t("Username")}
                    rootClassName="mr-[10px]"
                  />
                  <Field
                    type="password"
                    name="password"
                    label={t("Password")}
                    component={Fields.Input}
                    placeholder={t("Password")}
                  />
                </div>
                <div className="flex">
                  <div>
                    <p className="text-[#9EA3B5] px-[12px] py-[6px] bg-[#E6ECFE] dark:bg-[#454d70] rounded-[6px] inline-block mb-[12px] mr-[10px]">
                      {t("Photo")}
                    </p>
                    <Field
                      name="photoUrl"
                      label={t("Photo")}
                      placeholder={t("Photo")}
                      rootClassName="mb-[10px] mr-[20%]"
                      component={Fields.FileUpload3}
                      accept="image/png, image/jpeg, image/jpg"
                    />
                  </div>
                  <Field
                    type="number"
                    name="phoneNumber"
                    label={t("Phone number")}
                    component={Fields.Input}
                    placeholder={t("Phone number")}
                    className="ml-[10px]"
                  />
                </div>
                <Button
                  size="large"
                  htmlType="submit"
                  title={t("Save")}
                  className="w-full mt-[10px]"
                />
              </div>
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default User;
